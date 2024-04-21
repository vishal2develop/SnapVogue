/* eslint-disable react/react-in-jsx-scope */
import {FlatList, ViewabilityConfig, ViewToken} from 'react-native';
import FeedPost from '../../components/FeedPost/FeedPost';
// import posts from '../../data/posts.json';
import {useRef, useState, useEffect} from 'react';
import {generateClient} from 'aws-amplify/api';

import * as APITypes from '../../API';

type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const listPosts = /* GraphQL */ `query ListPosts(
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      description
      image
      images
      video
      nofComments
      nofLikes
      userID
      createdAt
      updatedAt
      __typename
      User {
        id
        name
        username
        image
      }
      Comments {
        items {
          id
          comment
          User {
            id
            name
            username
          }
        }
      }
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListPostsQueryVariables, APITypes.ListPostsQuery>;

const HomeScreen = () => {
  const [activePostIndex, setActivePostIndex] = useState<string | null>(null);
  const [posts, setPosts] = useState([]);
  const client = generateClient();

  const fetchPosts = async () => {
    const response = await client.graphql({query: listPosts});
    console.log('graphql response: ', response.data.listPosts.items);
    setPosts(response.data.listPosts.items);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
  return (
    <FlatList
      data={posts}
      renderItem={({item}) => (
        <FeedPost post={item} isVisible={activePostIndex === item.id} />
      )}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

export default HomeScreen;
