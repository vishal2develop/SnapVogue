/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, View} from 'react-native';

import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import CommentScreen from './src/screens/CommentScreen/CommentScreen';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen/EditProfileScreen';
import PostUploadScreen from './src/screens/PostUploadScreen';
PostUploadScreen;

const App = () => {
  return (
    <View style={styles.app}>
      <PostUploadScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  app: {flex: 1},
});

export default App;
