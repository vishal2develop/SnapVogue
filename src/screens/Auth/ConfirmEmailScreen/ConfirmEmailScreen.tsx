import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import FormInput from '../components/FormInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {
  ConfirmEmailNavigationProp,
  ConfirmEmailRouteProp,
} from '../../../types/navigation';
import {useRoute} from '@react-navigation/native';
type ConfirmEmailData = {
  username: string;
  code: string;
};

import {
  confirmSignUp,
  resendSignUpCode,
  ResendSignUpCodeInput,
} from 'aws-amplify/auth';

const ConfirmEmailScreen = () => {
  const route = useRoute<ConfirmEmailRouteProp>();
  const {control, handleSubmit, watch} = useForm<ConfirmEmailData>({
    defaultValues: {username: route.params.username},
  });

  const navigation = useNavigation<ConfirmEmailNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);

  const usr = watch('username');

  const onConfirmPressed = async ({username, code}: ConfirmEmailData) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await confirmSignUp({
        username: username,
        confirmationCode: code,
      });
      // @ts-ignore
      navigation.navigate('Sign in');
    } catch (error) {
      Alert.alert('Something went wrong', (error as Error).message);
    } finally {
      setIsLoading(false);
    }
    navigation.navigate('Sign in');
  };

  const onSignInPress = () => {
    navigation.navigate('Sign in');
  };

  const onResendPress = async () => {
    try {
      await resendSignUpCode({username: usr});
      Alert.alert('Check your mail', 'The code has been sent');
    } catch (e) {
      Alert.alert('Something went wrong', (e as Error).message);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <FormInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: 'Username is required',
          }}
        />

        <FormInput
          name="code"
          control={control}
          placeholder="Enter your confirmation code"
          rules={{
            required: 'Confirmation code is required',
          }}
        />

        <CustomButton
          text={isLoading ? 'Loading...' : 'Confirm'}
          onPress={handleSubmit(onConfirmPressed)}
        />

        <CustomButton
          text="Resend code"
          onPress={onResendPress}
          type="SECONDARY"
        />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default ConfirmEmailScreen;
