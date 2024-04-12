import {View, Text, Image, FlatList} from 'react-native';
import React from 'react';

import user from '../../data/user.json';
import styles from './styles';
import Button from '../../components/Button';
import ProfileHeader from './ProfileHeader';
import FeedGridView from '../../components/FeedGridView/FeedGridView';
import {useRoute, useNavigation} from '@react-navigation/native';

import {
  MyProfileNavigationProp,
  MyProfileRouteProp,
  UserProfileNavigationProp,
  UserProfileRouteProp,
} from '../../types/navigation';

const ProfileScreen = () => {
  const route = useRoute<UserProfileRouteProp | MyProfileRouteProp>();
  const navigation = useNavigation<
    UserProfileNavigationProp | MyProfileNavigationProp
  >();
  const userId = route.params?.userId;
  // query user with userId
  console.log('userId:', userId);

  // navigation.setOptions({title: user.username});
  return <FeedGridView data={user.posts} ListHeaderComponent={ProfileHeader} />;
};

export default ProfileScreen;
