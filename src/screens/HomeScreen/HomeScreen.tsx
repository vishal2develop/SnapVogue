/* eslint-disable react/react-in-jsx-scope */
import {
  ActivityIndicator,
  FlatList,
  ViewabilityConfig,
  ViewToken,
} from 'react-native';
import FeedPost from '../../components/FeedPost/FeedPost';
// import posts from '../../data/posts.json';
import {useRef, useState} from 'react';

import {useQuery} from '@apollo/client';
import {postsByDate} from './queries';
import {
  ModelSortDirection,
  PostsByDateQuery,
  PostsByDateQueryVariables,
} from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage';

const HomeScreen = () => {
  const [activePostIndex, setActivePostIndex] = useState<string | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // new way to query data using useQuery
  const {data, loading, error, refetch, fetchMore} = useQuery<
    PostsByDateQuery,
    PostsByDateQueryVariables
  >(postsByDate, {
    variables: {
      type: 'POST',
      sortDirection: ModelSortDirection.DESC,
      limit: 10,
    },
  });

  // Old way to query data
  // const [posts, setPosts] = useState([]);
  // const client = generateClient();

  // const fetchPosts = async () => {
  //   const response = await client.graphql({query: listPosts});
  //   console.log('graphql response: ', response.data.listPosts.items);
  //   setPosts(response.data.listPosts.items);
  // };

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  const posts = (data?.postsByDate?.items || []).filter(
    user => user && user?.User,
  );

  const nextToken = data?.postsByDate?.nextToken;

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        // if viewableItems[0].index is null, we will set activeImageIndex as 0
        setActivePostIndex(viewableItems[0].item.id);
      }
    },
  );

  const loadMore = async () => {
    if (!nextToken || isFetchingMore) {
      return;
    }
    setIsFetchingMore(true);
    await fetchMore({variables: {nextToken}});
    setIsFetchingMore(false);
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <ApiErrorMessage title="Error fetching posts" message={error.message} />
    );
  }
  // Filtering out users that are deleted & dont have user info

  return (
    <FlatList
      data={posts}
      renderItem={({item}) =>
        item && <FeedPost post={item} isVisible={activePostIndex === item.id} />
      }
      keyExtractor={item => item?.id || ''}
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig}
      onRefresh={() => refetch()}
      refreshing={loading}
      onEndReached={loadMore}
    />
  );
};

export default HomeScreen;
