import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';

// Hooks
import {useForm, Control, Controller} from 'react-hook-form';
import {Asset, launchImageLibrary} from 'react-native-image-picker';

import user from '../../data/user.json';
import colors from '../../theme/color';
import fonts from '../../theme/fonts';
import {GetUserQuery, GetUserQueryVariables, User} from '../../API';
import {useQuery} from '@apollo/client';
import {getUser} from './queries';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import {useAuthContext} from '../../contexts/AuthContext';
import {DEFAULT_USER_IMAGE} from '../../config';

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

type IEditableUserFields = 'name' | 'username' | 'website' | 'bio' | 'image';

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
}: ICustomInput) => (
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

const EditProfileScreen = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | Asset>(null);

  /** Building a Type safe form
   * control - Form inputs are managed using the Controller component
   */
  const {handleSubmit, control, reset, setValue} = useForm<IEditableUser>();

  const {userId} = useAuthContext();

  const {data, loading, error, refetch} = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {variables: {id: userId}});

  const user = data?.getUser;

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

  if (error) {
    return (
      <ApiErrorMessage
        title="Error fetching posts"
        message={error?.message || 'User not found!!'}
        onRetry={() => refetch()}
      />
    );
  }

  const onSubmit = (data: IEditableUser) => {
    console.log('Submitted', data);
    reset();
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
          maxLength: {value: 100, message: 'Name cannot exceed 100 characters'},
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
          required: 'Website is required',
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
        Submit
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
