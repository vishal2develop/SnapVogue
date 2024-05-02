import {FlatList} from 'react-native';
import React from 'react';
import FeedGridItem from './FeedGridItem';
import {Post} from '../../API';

interface IFeedGridView {
  data: (Post | null)[];
  ListHeaderComponent:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
  refetch: () => void;
  loading: boolean;
}

const FeedGridView = ({
  data,
  ListHeaderComponent,
  loading,
  refetch,
}: IFeedGridView) => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) =>
        item && <FeedGridItem post={item} key={item.id} />
      }
      numColumns={3}
      ListHeaderComponent={ListHeaderComponent}
      keyExtractor={item => item?.id || ''}
      showsVerticalScrollIndicator={false}
      style={{marginHorizontal: -1}}
      onRefresh={refetch}
      refreshing={loading}
    />
  );
};

export default FeedGridView;
