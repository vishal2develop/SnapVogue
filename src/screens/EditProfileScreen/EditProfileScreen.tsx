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
  UsersByUsernameQuery,
  UsersByUsernameQueryVariables,
  UpdateUserInput,
} from '../../API';
import {useMutation, useQuery, useLazyQuery} from '@apollo/client';
import {getUser, updateUser, deleteUser, usersByUsername} from './queries';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import {useAuthContext} from '../../contexts/AuthContext';
import {DEFAULT_USER_IMAGE} from '../../config';
import {useNavigation} from '@react-navigation/native';
import {signOut, deleteUser as removeUser} from 'aws-amplify/auth';
import CustomInput, {IEditableUser} from './CustomInput';
import {uploadData} from 'aws-amplify/storage';
import {v4 as uuidv4} from 'uuid';

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const EditProfileScreen = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | Asset>(null);
  const navigation = useNavigation();

  const {handleSubmit, control, setValue} = useForm<IEditableUser>();

  const {userId} = useAuthContext();

  const {data, loading, error, refetch} = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {variables: {id: userId}});

  const user = data?.getUser;
  console.log('user?.image:', user?.image);

  const [getUsersByUsername] = useLazyQuery<
    UsersByUsernameQuery,
    UsersByUsernameQueryVariables
  >(usersByUsername);

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
      setValue('image', user.image);
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
    const input: UpdateUserInput = {
      id: userId,
      ...formData,
    };
    if (selectedPhoto?.uri) {
      input.image = await uploadMedia(selectedPhoto.uri);
    }
    await executeUpdateUser({
      variables: {input},
    });
    navigation.canGoBack() && navigation.goBack();
  };

  const uploadMedia = async (uri: string) => {
    try {
      // get the blob of the file from uri
      const response = await fetch(uri);
      const blob = await response.blob();

      const uriParts = uri.split('.');
      const extension = uriParts[uriParts.length - 1];

      // upload the file (blob) to S3
      const s3Response = await uploadData({
        key: `${uuidv4()}.${extension}`,
        data: blob,
      }).result;
      return s3Response.key;
    } catch (e) {
      Alert.alert('Error uploading the file');
    }
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
    if (!user) {
      return;
    }
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
          setSelectedPhoto(assets[0]);
        }
      },
    );
  };

  const validateUsername = async (username: string) => {
    // query the database based on the usersByUsername

    try {
      const response = await getUsersByUsername({variables: {username}});

      if (response.error) {
        Alert.alert('Failed to fetch username');
        return 'Failed to fetch username';
      }
      const users = response.data?.usersByUsername?.items;
      if (users && users.length > 0 && users?.[0]?.id !== userId) {
        return 'Username is already taken';
      }
    } catch (e) {
      Alert.alert('Failed to fetch username');
    }
    // if there are any users with this username, then return the error

    return true;
  };

  return (
    <View style={styles.page}>
      <Image
        source={{
          uri: selectedPhoto?.uri || user?.image?.href || DEFAULT_USER_IMAGE,
        }}
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
          validate: validateUsername,
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
