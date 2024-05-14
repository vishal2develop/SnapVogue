/* eslint-disable react/react-in-jsx-scope */

import Navigation from './src/navigation';
import {Amplify} from 'aws-amplify';

import amplifyconfig from './src/amplifyconfiguration.json';
import AuthContextProvider from './src/contexts/AuthContext';
import Client from './src/apollo/Client';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MenuProvider} from 'react-native-popup-menu';

Amplify.configure(amplifyconfig);

const App = () => {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <AuthContextProvider>
          <Client>
            <Navigation />
          </Client>
        </AuthContextProvider>
      </MenuProvider>
    </SafeAreaProvider>
  );
};

export default App;
