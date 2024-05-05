import {FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import UserListItem from '../../components/UserListItem';
import {useQuery} from '@apollo/client';
import {listUsers} from './queries';
import {ListUsersQuery, ListUsersQueryVariables, User} from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage';

const UserSearchScreen = () => {
  const {data, loading, error, refetch} = useQuery<
    ListUsersQuery,
    ListUsersQueryVariables
  >(listUsers, {variables: {}});

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <ApiErrorMessage
        title="Error fetching posts"
        message={error?.message || 'User not found!!'}
        onRetry={() => refetch()}
      />
    );
  }

  const users = data?.listUsers?.items || [];
  return (
    <FlatList
      data={users}
      renderItem={({item}) => {
        return item && <UserListItem user={item as User} />;
      }}
      onRefresh={() => refetch()}
      refreshing={loading}
      keyExtractor={item => item?.id || ''}
    />
  );
};

export default UserSearchScreen;
