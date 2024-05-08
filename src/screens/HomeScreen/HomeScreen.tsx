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
import {listPosts} from './queries';
import {ListPostsQuery, ListPostsQueryVariables, Post} from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage';

const HomeScreen = () => {
  const [activePostIndex, setActivePostIndex] = useState<string | null>(null);

  // new way to query data using useQuery
  const {data, loading, error} = useQuery<
    ListPostsQuery,
    ListPostsQueryVariables
  >(listPosts);

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

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <ApiErrorMessage title="Error fetching posts" message={error.message} />
    );
  }
  // Filtering out users that are deleted & dont have user info
  const posts = (data?.listPosts?.items || []).filter(
    user => user && user?.User,
  );

  return (
    <FlatList
      data={posts}
      renderItem={({item}) =>
        item && (
          <FeedPost
            post={item as Post}
            isVisible={activePostIndex === item.id}
          />
        )
      }
      keyExtractor={item => item?.id || ''}
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

export default HomeScreen;
