import React, {useState, useRef} from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../theme/color';

interface IVideoPlayer {
  uri: string;
  paused?: boolean;
}

const VideoPlayer = ({uri, paused}: IVideoPlayer) => {
  const [muted, setMuted] = useState(true);
  const [totalDuration, setTotalDuration] = useState(0);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  const handleProgress = (data: any) => {
    setCurrentTime(data.currentTime);
  };

  const handleLoad = (data: any) => {
    setTotalDuration(data.duration);
  };

  // Helper function to format time in seconds to mm:ss format
  const formatTime = (timeInSeconds: any) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
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
    </View>
  );
};

const styles = StyleSheet.create({
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
