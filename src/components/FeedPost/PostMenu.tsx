import {View, Text, StyleSheet, Alert} from 'react-native';
import React from 'react';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';
import {useMutation} from '@apollo/client';
import {deletePost} from './queries';
import {
  DeleteCommentMutationVariables,
  DeletePostMutation,
  Post,
} from '../../API';
import {useAuthContext} from '../../contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {FeedNavigationProp} from '../../types/navigation';
import {remove} from 'aws-amplify/storage';
interface IPostMenu {
  post: Post;
}
const PostMenu = ({post}: IPostMenu) => {
  const {userId} = useAuthContext();
  const isMyPost = userId === post.userID;
  const navigation = useNavigation<FeedNavigationProp>();

  const [doDeletePost] = useMutation<
    DeletePostMutation,
    DeleteCommentMutationVariables
  >(deletePost, {variables: {input: {id: post.id}}});

  const startDeletingPost = async () => {
    try {
      if (post.image) {
        console.log('post.image', post.image);

        await remove({key: post.image});
      }
      if (post.video) {
        console.log('post.video', post.video);

        await remove({key: post.video});
      }
      if (post.images) {
        await Promise.all(post.images.map(img => remove({key: img})));
      }
    } catch (err) {
      Alert.alert('Failed to delete media', (err as Error).message);
    }
    try {
      await doDeletePost();
    } catch (e) {
      Alert.alert('Failed to delete post', (e as Error).message);
    }
  };

  const onDeleteOption = () => {
    Alert.alert('Are you sure?', 'Deleting a post is permanent', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Delete', style: 'destructive', onPress: startDeletingPost},
    ]);
  };

  const onEditOption = () => {
    navigation.navigate('UpdatePost', {id: post.id});
  };

  return (
    <Menu renderer={renderers.SlideInMenu} style={styles.threeDots}>
      <MenuTrigger>
        <Entypo name="dots-three-horizontal" size={16} />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={() => Alert.alert(`Reporting`)}>
          <Text style={styles.optionText}>Report</Text>
        </MenuOption>
        {isMyPost && (
          <>
            <MenuOption onSelect={onDeleteOption}>
              <Text style={[styles.optionText, {color: 'red'}]}>Delete</Text>
            </MenuOption>
            <MenuOption onSelect={onEditOption}>
              <Text style={styles.optionText}>Edit</Text>
            </MenuOption>
          </>
        )}
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  threeDots: {
    marginLeft: 'auto',
  },
  optionText: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
  },
});

export default PostMenu;
