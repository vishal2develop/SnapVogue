import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {
  Camera,
  FlashMode,
  CameraType,
  CameraPictureOptions,
  CameraRecordingOptions,
  VideoQuality,
} from 'expo-camera';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../theme/color';

const flashModes = [
  FlashMode.off,
  FlashMode.on,
  FlashMode.auto,
  FlashMode.torch,
];

const flashModeToIcon = {
  [FlashMode.off]: 'flash-off',
  [FlashMode.on]: 'flash-on',
  [FlashMode.auto]: 'flash-auto',
  [FlashMode.torch]: 'highlight',
};

const PostUploadScreen = () => {
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.torch);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const camera = useRef<Camera>(null);

  useEffect(() => {
    const getPermissions = async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();

      setHasPermissions(
        cameraPermission.status === 'granted' &&
          microphonePermission.status === 'granted',
      );
    };
    getPermissions();
  }, []);

  const flipCamera = () => {
    setCameraType(currentCameraType =>
      currentCameraType === CameraType.back
        ? CameraType.front
        : CameraType.back,
    );
  };

  const toggleFlash = () => {
    const currentIndex = flashModes.indexOf(flash);
    // Checking if currentIndex is the list one in the flashModes array -> point to 1st element in array (0 index),
    // else add 1 to index and point to next element
    const nextIndex =
      currentIndex === flashModes.length - 1 ? 0 : currentIndex + 1;
    setFlash(flashModes[nextIndex]);
  };

  const takePicture = async () => {
    if (!isCameraReady || !camera.current || isRecording) {
      return;
    }
    const options: CameraPictureOptions = {
      quality: 0.5, // 0 - very compressed& low size | 1- compression for max quality
      base64: false, // true = include base64 version of the image
      skipProcessing: true, // on android, the processing step messes the orientation on some deivces
    };
    const result = await camera.current.takePictureAsync(options);
  };

  const startRecording = async () => {
    if (!isCameraReady || !camera.current || isRecording) {
      return;
    }
    const options: CameraRecordingOptions = {
      quality: VideoQuality['4:3'], // 480p, 720p etc
      maxDuration: 60, // Max video duration in seconds
      maxFileSize: 10 * 1024 * 1024, // Max video file size in bytes (10 * 1024 * 1024 = 10MB)
      mute: false, // true = record with no sound
    };
    setIsRecording(true);
    try {
      const result = await camera.current?.recordAsync(options);
      console.log('Recording result:', result);
    } catch (error) {
      console.log('Recording error:', error);
    }
    /**
     * Resetting isRecording here event though we have stopRecording method, as in case of max duration & max file size met,
     * the stopRecording method will not get called.
     */
    setIsRecording(false);
  };

  const stopRecording = () => {
    camera.current?.stopRecording();
    setIsRecording(false);
  };

  if (hasPermissions === null) {
    return <Text>Loading...</Text>;
  }

  if (hasPermissions === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.page}>
      <Camera
        style={styles.camera}
        ratio="4:3"
        type={cameraType}
        flashMode={flash}
        onCameraReady={() => setIsCameraReady(true)}
        ref={camera}
      />
      <View style={[styles.buttonsContainer, {top: 25}]}>
        <MaterialIcons name="close" size={30} color={colors.white} />
        <Pressable onPress={toggleFlash}>
          <MaterialIcons
            name={flashModeToIcon[flash]}
            size={30}
            color={colors.white}
          />
        </Pressable>
        <MaterialIcons name="settings" size={30} color={colors.white} />
      </View>
      <View style={[styles.buttonsContainer, {bottom: 25}]}>
        <MaterialIcons name="photo-library" size={30} color={colors.white} />
        {isCameraReady && (
          <Pressable
            onPress={takePicture}
            onLongPress={startRecording}
            onPressOut={stopRecording}>
            <View
              style={[
                styles.circle,
                {backgroundColor: isRecording ? colors.accent : colors.white},
              ]}
            />
          </Pressable>
        )}
        <Pressable onPress={flipCamera}>
          <MaterialIcons
            name="flip-camera-ios"
            size={30}
            color={colors.white}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {flex: 1, justifyContent: 'center', backgroundColor: colors.black},
  camera: {width: '100%', aspectRatio: 3 / 4},
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',

    // Positioning buttons
    position: 'absolute',
  },
  circle: {
    width: 75,
    aspectRatio: 1,
    borderRadius: 75,
    backgroundColor: colors.white,
  },
});
export default PostUploadScreen;
