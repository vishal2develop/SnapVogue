import {View, Image, StyleSheet, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CreateNavigationProp, CreateRouteProp} from '../../types/navigation';
import colors from '../../theme/color';
import Button from '../../components/Button';
import {createPost} from './queries';
import {useMutation} from '@apollo/client';
import {CreatePostMutation, CreatePostMutationVariables} from '../../API';
import {useAuthContext} from '../../contexts/AuthContext';
import Carousel from '../../components/Carousel';
import VideoPlayer from '../../components/VideoPlayer';

const CreatePostScreen = () => {
  const [description, setDescription] = useState('');
  // const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {userId} = useAuthContext();

  const navigation = useNavigation<CreateNavigationProp>();

  const route = useRoute<CreateRouteProp>();
  const {image, images, video} = route.params;

  const [doCreatePost] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(createPost);

  let content;

  if (image) {
    content = (
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
        resizeMode={'contain'}
      />
    );
  } else if (images) {
    content = <Carousel images={images} />;
  } else if (video) {
    content = <VideoPlayer uri={video} />;
  }

  const submit = async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await doCreatePost({
        variables: {
          input: {
            description: description,
            image: image,
            images: images,
            video: video,
            nofComments: 0,
            nofLikes: 0,
            userID: userId,
          },
        },
      });
      setIsSubmitting(false);
      navigation.popToTop();
      navigation.navigate('HomeStack');

      console.log('Response:', response);
    } catch (err) {
      Alert.alert('Error uploading post', (err as Error).message);
      console.log((err as Error).message);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.content}>{content}</View>

      {/* <Image
        source={{uri: image}}
        style={styles.image}
        resizeMode={'contain'}
      /> */}
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description..."
        style={styles.input}
        multiline
        numberOfLines={5}
      />
      {/* <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="Location"
        style={styles.input}
      /> */}

      <Button
        text={isSubmitting ? 'Submitting...' : 'Submit'}
        onPress={submit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  input: {
    marginVertical: 10,
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
  content: {
    width: '100%',
    aspectRatio: 1,
  },
  progressContainer: {
    backgroundColor: colors.lightgrey,
    width: '100%',
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginVertical: 10,
  },
  progress: {
    backgroundColor: colors.primary,
    position: 'absolute',
    height: '100%',
    alignSelf: 'flex-start',
    borderRadius: 25,
  },
});

export default CreatePostScreen;
