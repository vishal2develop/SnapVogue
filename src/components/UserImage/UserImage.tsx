import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getUrl} from 'aws-amplify/storage';
import {DEFAULT_USER_IMAGE} from '../../config';

interface IUserImage {
  imageKey?: string | null;
  width?: number;
}

const UserImage = ({imageKey, width = 50}: IUserImage) => {
  //   console.log('imageKey:', imageKey);

  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfileImage() {
      if (imageKey) {
        const userImageKey = (await getUrl({key: imageKey})).url;
        setImageUri(userImageKey.href);
      }
    }
    fetchProfileImage();
  }, [imageKey]);

  //   useEffect(() => {
  //     if (imageKey) {
  //       getUrl({key: imageKey}).then(res => {
  //         console.log('res:', res.url.href);
  //         setImageUri(res.url.href);
  //       });
  //     }
  //   }, [imageKey]);

  return (
    <Image
      source={{
        uri: imageUri || DEFAULT_USER_IMAGE,
      }}
      style={[styles.image, {width}]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    borderRadius: 250,
    marginRight: 10,
  },
});

export default UserImage;
