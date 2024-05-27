import {View, Text, Image, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import Carousel from '../Carousel';
import VideoPlayer from '../VideoPlayer';
import {Post} from '../../API';
import styles from './styles';
import {GetUrlInput, GetUrlOutput, getUrl} from 'aws-amplify/storage';

interface IContent {
  post: Post;
  isVisible: boolean;
}

const Content = ({post, isVisible}: IContent) => {
  const [imageUri, setImageUri] = useState<string | null | URL>(null);
  const [imagesUri, setImagesUri] = useState<
    string[] | null | GetUrlOutput[] | URL[]
  >(null);
  const [videoUri, setVideoUri] = useState<string | null | GetUrlOutput>(null);

  useEffect(() => {
    downloadMedia();
  }, []);

  const downloadMedia = async () => {
    if (post.image) {
      // download the image
      const uri = (await getUrl({key: post.image})).url;

      setImageUri(uri.href);
    } else if (post.images) {
      const uriObjs = await Promise.all(
        post.images.map(img => getUrl({key: img})),
      );
      const uris = uriObjs.map(uri => uri.url);
      setImagesUri(uris);
    } else if (post.video) {
      const uri = (await getUrl({key: post.video})).url;
      setVideoUri(uri.href);
    }
  };

  if (imageUri) {
    return <Image source={{uri: imageUri}} style={styles.image} />;
  } else if (imagesUri) {
    return <Carousel images={imagesUri} />;
  } else if (videoUri) {
    return <VideoPlayer uri={videoUri} paused={!isVisible} />;
  }

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

export default Content;
