/* eslint-disable react/react-in-jsx-scope */

import Navigation from './src/navigation';
import {Amplify} from 'aws-amplify';

import amplifyconfig from './src/amplifyconfiguration.json';
import AuthContextProvider from './src/contexts/AuthContext';
import Client from './src/apollo/Client';
import {SafeAreaProvider} from 'react-native-safe-area-context';

Amplify.configure(amplifyconfig);

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <Client>
          <Navigation />
        </Client>
      </AuthContextProvider>
    </SafeAreaProvider>
  );
};

export default App;
