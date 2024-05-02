import {ActivityIndicator} from 'react-native';
import React from 'react';
import ProfileHeader from './ProfileHeader';
import FeedGridView from '../../components/FeedGridView/FeedGridView';
import {useRoute} from '@react-navigation/native';

import {MyProfileRouteProp, UserProfileRouteProp} from '../../types/navigation';
import {useQuery} from '@apollo/client';
import {getUser} from './queries';
import {GetPostQueryVariables, GetUserQuery} from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import {useAuthContext} from '../../contexts/AuthContext';

const ProfileScreen = () => {
  const route = useRoute<UserProfileRouteProp | MyProfileRouteProp>();
  // const navigation = useNavigation<
  //   UserProfileNavigationProp | MyProfileNavigationProp
  // >();

  const {userId: authUserId} = useAuthContext();
  const userId = route.params?.userId || authUserId;

  console.log('userId:', userId);

  const {data, loading, error, refetch} = useQuery<
    GetUserQuery,
    GetPostQueryVariables
  >(getUser, {variables: {id: userId}});

  const user = data?.getUser;

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || !user) {
    return (
      <ApiErrorMessage
        title="Error fetching posts"
        message={error?.message || 'User not found!!'}
        onRetry={() => refetch()}
      />
    );
  }

  // navigation.setOptions({title: user.username});
  return (
    <FeedGridView
      data={user.Posts?.items || []}
      ListHeaderComponent={() => <ProfileHeader user={user} />}
      refetch={refetch}
      loading={loading}
    />
  );
};

export default ProfileScreen;
