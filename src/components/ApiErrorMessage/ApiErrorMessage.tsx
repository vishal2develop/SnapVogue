import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
// @ts-ignore
import image from '../../assets/images/error.png';
import colors from '../../theme/color';
import Button from '../Button';

interface IApiErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ApiErrorMessage: React.FC<IApiErrorMessageProps> = ({
  title = 'Error',
  message = 'Unknown Error',
  onRetry = () => {
    console.log('retry...');
  },
}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <Button onPress={onRetry} text="Retry" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '70%',
    height: 200,
  },
  title: {
    fontSize: 18,
    margin: 20,
  },
  message: {
    color: colors.grey,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default ApiErrorMessage;
