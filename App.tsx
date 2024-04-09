/* eslint-disable react/react-in-jsx-scope */

// import HomeScreen from './src/screens/HomeScreen/HomeScreen';
// import CommentScreen from './src/screens/CommentScreen/CommentScreen';
// import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
// import EditProfileScreen from './src/screens/EditProfileScreen/EditProfileScreen';
// import PostUploadScreen from './src/screens/PostUploadScreen';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/navigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
