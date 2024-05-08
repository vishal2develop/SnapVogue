import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';

// Hooks
import {useForm, Control, Controller} from 'react-hook-form';
import {Asset, launchImageLibrary} from 'react-native-image-picker';

import colors from '../../theme/color';
import fonts from '../../theme/fonts';
import {
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  DeleteUserMutation,
  DeleteUserMutationVariables,
  User,
} from '../../API';
import {useMutation, useQuery} from '@apollo/client';
import {getUser, updateUser, deleteUser} from './queries';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import {useAuthContext} from '../../contexts/AuthContext';
import {DEFAULT_USER_IMAGE} from '../../config';
import {useNavigation} from '@react-navigation/native';
import {signOut, deleteUser as removeUser} from 'aws-amplify/auth';

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

type IEditableUserFields = 'name' | 'username' | 'website' | 'bio';

// Create a mutable data structure for User.
// As User interface contains other attributes that should remain uneditable.
type IEditableUser = Pick<User, IEditableUserFields>;

interface ICustomInput {
  label: string;
  multiline?: boolean;
  control: Control<IEditableUser, object>;
  name: IEditableUserFields;
  rules?: object;
}
const CustomInput = ({
  control,
  name,
  label,
  multiline = false,
  rules = {},
}: ICustomInput) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {onChange, value, onBlur}, fieldState: {error}}) => {
        return (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <View style={{flex: 1}}>
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value || ''}
                style={[
                  styles.input,
                  {borderColor: error ? colors.error : colors.border},
                ]}
                placeholder="Hello"
                multiline={multiline}
              />
              {error && (
                <Text style={styles.errorText}>
                  {error.message || 'Field is required'}
                </Text>
              )}
            </View>
          </View>
        );
      }}
    />
  );
};

const EditProfileScreen = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | Asset>(null);
  const navigation = useNavigation();

  /** Building a Type safe form
   * control - Form inputs are managed using the Controller component
   */
  const {handleSubmit, control, setValue} = useForm<IEditableUser>();

  const {userId, user: authUser} = useAuthContext();

  const {data, loading, error, refetch} = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {variables: {id: userId}});

  const user = data?.getUser;

  const [
    executeUpdateUser,
    {data: updateData, loading: updateLoading, error: updateError},
  ] = useMutation<UpdateUserMutation, UpdateUserMutationVariables>(updateUser);

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

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    padding: 10,
  },
  avatar: {width: '30%', aspectRatio: 1, borderRadius: 100},
  textButton: {
    color: colors.primary,
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.semi,
    margin: 10,
  },
  deleteButton: {
    marginTop: 50,
    textTransform: 'uppercase',
    color: colors.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  label: {
    width: 75,
  },
  input: {
    borderBottomWidth: 1,
    minHeight: 50,
  },
  errorText: {
    color: colors.error,
  },
});

export default EditProfileScreen;
