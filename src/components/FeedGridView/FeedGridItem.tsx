import {View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../theme/color';
import {Post} from '../../API';

import {getUrl, GetUrlOutput} from '@aws-amplify/storage';
import VideoPlayer from '../VideoPlayer';
interface IFeedGridItem {
  post: Post;
}

const FeedGridItem = ({post}: IFeedGridItem) => {
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

  return (
    <View style={{flex: 1, padding: 1, aspectRatio: 1, maxWidth: '33.33%'}}>
      <Image
        source={{uri: imageUri || imagesUri?.[0]?.href}}
        style={{flex: 1}}
      />
      {/* To display the collections icon on the post, in case the post contains multiple photos */}
      {post.images && (
        <MaterialIcons
          name="collections"
          size={16}
          color={colors.white}
          style={{position: 'absolute', top: 5, right: 5}}
        />
      )}
      {videoUri && <VideoPlayer uri={videoUri} paused />}
    </View>
  );
};

export default FeedGridItem;
