import {
  View,
  FlatList,
  Image,
  useWindowDimensions,
  StyleSheet,
  ViewabilityConfig,
  ViewToken,
  Text,
} from 'react-native';
import React, {useRef, useState} from 'react';
import colors from '../../theme/color';
import DoublePressable from '../DoublePressable';
import {GetUrlInput, GetUrlOutput} from 'aws-amplify/storage';

interface ICarousel {
  images: string[];
  onDoublePress?: () => void;
}

const Carousel = ({images, onDoublePress = () => {}}: ICarousel) => {
  const {width} = useWindowDimensions();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        // if viewableItems[0].index is null, we will set activeImageIndex as 0
        setActiveImageIndex(viewableItems[0].index || 0);
      }
    },
  );
  return (
    <View>
      <FlatList
        data={images}
        renderItem={({item}) =>
          item && (
            <DoublePressable onDoublePress={onDoublePress}>
              <Image
                source={{uri: item.href}}
                style={[styles.image, {width}]}
              />
            </DoublePressable>
          )
        }
        horizontal
        pagingEnabled // to scroll to next image even if we dont scroll fully
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig}
      />
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  activeImageIndex === index ? colors.primary : colors.white,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

// Function to define dynamicStyles based on params

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 3,
    margin: 10,
  },
});

export default Carousel;
