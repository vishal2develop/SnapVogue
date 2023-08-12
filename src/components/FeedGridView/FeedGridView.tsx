import {FlatList, Image} from 'react-native';
import React from 'react';
import ProfileHeader from '../../screens/ProfileScreen/ProfileHeader';
import {IPost} from '../../types/models';
import FeedGridItem from './FeedGridItem';

interface IFeedGridView {
  data: IPost[];
  ListHeaderComponent:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
}

const FeedGridView = ({data, ListHeaderComponent}: IFeedGridView) => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => <FeedGridItem post={item} key={item.id} />}
      numColumns={3}
      ListHeaderComponent={ListHeaderComponent}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      style={{marginHorizontal: -1}}
    />
  );
};

export default FeedGridView;
