import {View, Text, TextInput} from 'react-native';
import {User} from '../../API';
import {Control, Controller} from 'react-hook-form';
import styles from './styles';
import colors from '../../theme/color';

type IEditableUserFields = 'name' | 'username' | 'website' | 'bio' | 'image';

// Create a mutable data structure for User.
// As User interface contains other attributes that should remain uneditable.
export type IEditableUser = Pick<User, IEditableUserFields>;

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

export default CustomInput;
