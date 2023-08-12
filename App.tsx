/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, View} from 'react-native';

import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import CommentScreen from './src/screens/CommentScreen/CommentScreen';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen/EditProfileScreen';

const App = () => {
  return (
    <View style={styles.app}>
      <EditProfileScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  app: {flex: 1},
});

export default App;
