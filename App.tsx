/* eslint-disable react/react-in-jsx-scope */

import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import {Amplify} from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

const App = () => {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
