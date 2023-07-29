/* eslint-disable react/react-in-jsx-scope */
import {FlatList} from 'react-native';
import FeedPost from '../../components/FeedPost/FeedPost';
import posts from '../../data/posts.json';
const HomeScreen = () => {
  return (
    <FlatList
      data={posts}
      renderItem={({item}) => <FeedPost post={item} />}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HomeScreen;
