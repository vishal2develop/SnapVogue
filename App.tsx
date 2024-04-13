/* eslint-disable react/react-in-jsx-scope */

import Navigation from './src/navigation';
import {Amplify} from 'aws-amplify';

import amplifyconfig from './src/amplifyconfiguration.json';
import AuthContextProvider from './src/contexts/AuthContext';
Amplify.configure(amplifyconfig);

const App = () => {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
};

export default App;
