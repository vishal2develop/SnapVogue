import {View, Text, Image} from 'react-native';
import React from 'react';

import user from '../../data/user.json';
import styles from './styles';
import Button from '../../components/Button';

const ProfileHeader = () => {
  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        {/* Profile Image */}
        <Image source={{uri: user.image}} style={styles.avatar} />

        {/* Post, Followers, Following number */}

        {/* Posts */}
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>98</Text>
          <Text>Posts</Text>
        </View>

        {/* Followers */}
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>98</Text>
          <Text>Followers</Text>
        </View>

        {/* Following */}
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>98</Text>
          <Text>Following</Text>
        </View>
      </View>

      {/* User Name & BIO */}
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.bio}>{user.bio}</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          text="Edit Profile"
          onPress={() => console.warn('Editing Profile')}
        />
        <Button
          text="Add Friends"
          onPress={() => console.warn('Adding Friends')}
        />
      </View>
    </View>
  );
};
export default ProfileHeader;