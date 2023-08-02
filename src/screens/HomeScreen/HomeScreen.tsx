/* eslint-disable react/react-in-jsx-scope */
import {FlatList, ViewabilityConfig, ViewToken} from 'react-native';
import FeedPost from '../../components/FeedPost/FeedPost';
import posts from '../../data/posts.json';
import {useRef, useState} from 'react';
const HomeScreen = () => {
  const [activePostIndex, setActivePostIndex] = useState<string | null>(null);

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
