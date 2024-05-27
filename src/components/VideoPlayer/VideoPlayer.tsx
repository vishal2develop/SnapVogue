import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  FlatList,
  ViewabilityConfig,
} from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../theme/color';

interface IVideoPlayer {
  uri?: string;
  paused?: boolean;
  uris?: string[];
}

const VideoPlayer = ({uri, uris, paused}: IVideoPlayer) => {
  const [muted, setMuted] = useState(true);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const [totalDuration, setTotalDuration] = useState(0);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  const handleProgress = (data: any) => {
    setCurrentTime(data.currentTime);
  };

  const handleLoad = (data: any) => {
    setTotalDuration(data.duration);
  };
  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };
  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        // if viewableItems[0].index is null, we will set activeImageIndex as 0
        setActiveVideoIndex(viewableItems[0].index || 0);
      }
    },
  );

  // Helper function to format time in seconds to mm:ss format
  const formatTime = (timeInSeconds: any) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  let content;
  if (uris) {
    content = (
      <View>
        <FlatList
          data={uris}
          renderItem={({item}) =>
            item && (
              <View>
                <Video
                  ref={videoRef}
                  source={{uri: item}}
                  style={styles.video}
                  resizeMode="cover"
                  repeat
                  muted={muted}
                  paused={paused}
                  onProgress={handleProgress} // Get video playback progress updates
                  onLoad={handleLoad} // Get total duration of the video
                />
                {/* For mute/unmute button */}
                <Pressable
                  onPress={() => setMuted(previousValue => !previousValue)}
                  style={styles.muteButton}>
                  <Ionicons
                    name={muted ? 'volume-mute' : 'volume-medium'}
                    size={14}
                    color="white"
                  />
                </Pressable>
                {/* For displaying the remaining video time */}
                {/* <Text style={styles.durationText}>
                {formatTime(totalDuration - currentTime)}
              </Text> */}
              </View>
            )
          }
          horizontal
          pagingEnabled // to scroll to next image even if we dont scroll fully
          onViewableItemsChanged={onViewableItemsChanged.current}
          viewabilityConfig={viewabilityConfig}
        />
      </View>
    );
  }

  return (
    <View>
      <Video
        ref={videoRef}
        source={{uri: uri}}
        style={styles.video}
        resizeMode="cover"
        repeat
        muted={muted}
        paused={paused}
        onProgress={handleProgress} // Get video playback progress updates
        onLoad={handleLoad} // Get total duration of the video
      />
      {/* For mute/unmute button */}
      <Pressable
        onPress={() => setMuted(previousValue => !previousValue)}
        style={styles.muteButton}>
        <Ionicons
          name={muted ? 'volume-mute' : 'volume-medium'}
          size={14}
          color="white"
        />
      </Pressable>
      {/* For displaying the remaining video time */}
      <Text style={styles.durationText}>
        {formatTime(totalDuration - currentTime)}
      </Text>

      {/* uris ?
      <View style={styles.dotsContainer}>
        {uris?.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  activeVideoIndex === index ? colors.primary : colors.white,
              },
            ]}
          />
        ))}
      </View>
      :null */}
    </View>
  );
};

const styles = StyleSheet.create({
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

  video: {
    width: '100%',
    aspectRatio: 1,
  },
  muteButton: {
    backgroundColor: colors.black,
    padding: 5,
    borderRadius: 25,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Background color for the video player
  },
  videoContainer: {
    flex: 1,
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  progressContainer: {
    width: '100%',
    height: 5,
    flexDirection: 'row',
    alignItems: 'center', // Center the text vertically within the container
  },
  durationText: {
    position: 'absolute',
    color: 'white',
    backgroundColor: 'black',
    fontSize: 16,
    marginLeft: 5,
    marginTop: 5,
  },
});

export default VideoPlayer;
