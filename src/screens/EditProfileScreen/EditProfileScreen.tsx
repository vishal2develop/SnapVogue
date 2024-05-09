import {View, Text, Image, ActivityIndicator, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';

// Hooks
import {useForm} from 'react-hook-form';
import {Asset, launchImageLibrary} from 'react-native-image-picker';

import styles from './styles';
import {
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  DeleteUserMutation,
  DeleteUserMutationVariables,
} from '../../API';
import {useMutation, useQuery} from '@apollo/client';
import {getUser, updateUser, deleteUser} from './queries';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import {useAuthContext} from '../../contexts/AuthContext';
import {DEFAULT_USER_IMAGE} from '../../config';
import {useNavigation} from '@react-navigation/native';
import {signOut, deleteUser as removeUser} from 'aws-amplify/auth';
import CustomInput, {IEditableUser} from './CustomInput';
const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const EditProfileScreen = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | Asset>(null);
  const navigation = useNavigation();

  /** Building a Type safe form
   * control - Form inputs are managed using the Controller component
   */
  const {handleSubmit, control, setValue} = useForm<IEditableUser>();

  const {userId} = useAuthContext();

  const {data, loading, error, refetch} = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {variables: {id: userId}});

  const user = data?.getUser;

  const [executeUpdateUser, {loading: updateLoading, error: updateError}] =
    useMutation<UpdateUserMutation, UpdateUserMutationVariables>(updateUser);

  const [executeDeleteUser, {loading: deleteLoading, error: deleteError}] =
    useMutation<DeleteUserMutation, DeleteUserMutationVariables>(deleteUser);

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('bio', user.bio);
      setValue('username', user.username);
      setValue('website', user.website);
      // setValue('image', user.image);
    }
  }, [user, setValue]);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || updateError || deleteError) {
    return (
      <ApiErrorMessage
        title="Error fetching or updating the user"
        message={error?.message || updateError?.message || deleteError?.message}
        onRetry={() => refetch()}
      />
    );
  }

  const onSubmit = async (formData: IEditableUser) => {
    console.log('Submitted', formData);
    await executeUpdateUser({
      variables: {
        input: {
          id: userId,
          ...formData,
        },
      },
    });
    navigation.canGoBack() && navigation.goBack();
  };

  const confirmDeleteUser = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, delete',
          style: 'destructive',
          onPress: startDeleting,
        },
      ],
    );
  };

  const startDeleting = async () => {
    try {
      // delete user from DB
      await executeDeleteUser({
        variables: {
          input: {
            id: userId,
          },
        },
      });
      // delete user from cognito & signout
      await removeUser();
      await signOut();
    } catch (err) {
      console.log('Error', (err as Error).message);
    }
  };

  const onChangePhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      ({didCancel, errorCode, assets}) => {
        if (!didCancel && !errorCode && assets && assets.length > 0) {
          console.log('asset:', assets);
          setSelectedPhoto(assets[0]);
        }
      },
    );
  };

  return (
    <View style={styles.page}>
      <Image
        source={{uri: selectedPhoto?.uri || user?.image || DEFAULT_USER_IMAGE}}
        style={styles.avatar}
      />
      <Text onPress={onChangePhoto} style={styles.textButton}>
        Change profile photo
      </Text>

      <CustomInput
        name="name"
        control={control}
        rules={{
          required: 'Name is required',
        }}
        label="Name"
      />
      <CustomInput
        name="username"
        control={control}
        rules={{
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username length should be more than 3',
          },
        }}
        label="Username"
      />
      <CustomInput
        name="website"
        control={control}
        rules={{
          pattern: {value: URL_REGEX, message: 'Invalid URL'},
        }}
        label="Website"
      />
      <CustomInput
        name="bio"
        control={control}
        rules={{
          maxLength: {value: 200, message: 'Bio cannot exceed 200 characters'},
        }}
        label="Bio"
        multiline
      />
      {/* Wrapping our onSubmit function with handleSubmit from react-hook-form
       to validate fields first. Then our onSubmit will be called*/}
      <Text onPress={handleSubmit(onSubmit)} style={styles.textButton}>
        {updateLoading ? 'Submitting' : 'Submit'}
      </Text>
      <Text
        onPress={confirmDeleteUser}
        style={[styles.textButton, styles.deleteButton]}>
        {deleteLoading ? 'Deleting user' : 'Delete User'}
      </Text>
    </View>
  );
};

export default EditProfileScreen;
