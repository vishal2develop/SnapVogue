import {View, Text, Image} from 'react-native';
import React from 'react';

import styles from './styles';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {ProfileNavigationProp} from '../../types/navigation';
import {User} from '../../API';
import {signOut} from 'aws-amplify/auth';
import {DEFAULT_USER_IMAGE} from '../../config';
import {useAuthContext} from '../../contexts/AuthContext';

interface IProfileHeader {
  user: User;
}
const ProfileHeader = ({user}: IProfileHeader) => {
  const {userId} = useAuthContext();
  const navigation = useNavigation<ProfileNavigationProp>();
  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        {/* Profile Image */}
        <Image
          source={{uri: user.image || DEFAULT_USER_IMAGE}}
          style={styles.avatar}
        />

        {/* Post, Followers, Following number */}

        {/* Posts */}
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofPosts}</Text>
          <Text>Posts</Text>
        </View>

        {/* Followers */}
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofFollowers}</Text>
          <Text>Followers</Text>
        </View>

        {/* Following */}
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofFollowings}</Text>
          <Text>Following</Text>
        </View>
      </View>

      {/* User Name & BIO */}
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.bio}>{user.bio}</Text>

      {/* Buttons */}
      {userId === user.id && (
        <View style={styles.buttonContainer}>
          <Button
            text="Edit Profile"
            onPress={() => navigation.navigate('Edit Profile')}
            inline
          />
          <Button text="Sign Out" onPress={() => signOut()} inline />
        </View>
      )}
    </View>
  );
};
export default ProfileHeader;
