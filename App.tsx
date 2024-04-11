/* eslint-disable react/react-in-jsx-scope */

import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import {Amplify} from 'aws-amplify';
import {
  withAuthenticator,
  useAuthenticator,
  Authenticator,
  Theme,
  ThemeProvider,
} from '@aws-amplify/ui-react-native';

import amplifyconfig from './src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

const App = () => {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
};

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Username',
      key: 'preferred_username',
      required: true,
      displayOrder: 1,
      type: 'string',
      placeholder: 'Username/handle',
    },
  ],
};

export default withAuthenticator(App);
