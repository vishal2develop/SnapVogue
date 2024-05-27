/* eslint-disable react/react-in-jsx-scope */
import {Text, View, Image, Pressable} from 'react-native';
import colors from '../../theme/color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import Comment from '../Comment';
import DoublePressable from '../DoublePressable';
import Carousel from '../Carousel';
import VideoPlayer from '../VideoPlayer';
import dayjs from 'dayjs';

// Hooks
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import useLikeService from '../../services/LikeService/LikeService';

import {FeedNavigationProp} from '../../types/navigation';

import {DEFAULT_USER_IMAGE} from '../../config';
import PostMenu from './PostMenu';
import {Post} from '../../API';
import Content from './Content';
// import {
//   createLike,
//   deleteLike,
//   likesForPostByUser,
//   updatePost,
// } from './queries';

// Interfaces
interface IFeedPost {
  post: Post;
  isVisible: boolean;
}

const FeedPost = ({post, isVisible}: IFeedPost) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const {toggleLike, isLiked} = useLikeService(post);

  const navigation = useNavigation<FeedNavigationProp>();

  const toggleDescriptionExpanded = () => {
    setIsDescriptionExpanded(existingValue => !existingValue);
  };

  // const [doCreateLike] = useMutation<
  //   CreateLikeMutation,
  //   CreateLikeMutationVariables
  // >(createLike, {
  //   variables: {
  //     input: {
  //       userID: userId,
  //       postID: post.id,
  //     },
  //   },
  //   refetchQueries: ['LikesForPostByUser'],
  // });

  // const {data: usersLikeData} = useQuery<
  //   LikesForPostByUserQuery,
  //   LikesForPostByUserQueryVariables
  // >(likesForPostByUser, {variables: {postID: post.id, userID: {eq: userId}}});

  // const [doUpdatePost] = useMutation<
  //   UpdatePostMutation,
  //   UpdatePostMutationVariables
  // >(updatePost);

  // const [doDeleteLike] = useMutation<
  //   DeleteLikeMutation,
  //   DeleteLikeMutationVariables
  // >(deleteLike, {refetchQueries: ['ListPosts', 'LikesForPostByUser']});

  // console.log(':usersLikeData:', usersLikeData);

  // const userLike = usersLikeData?.likesForPostByUser?.items?.[0];

  const postLikes = post.Likes?.items || [];

  // const incrementNoOfLikes = (amount: 1 | -1) => {
  //   doUpdatePost({
  //     variables: {input: {id: post.id, nofLikes: post.nofLikes + amount}},
  //   });
  // };

  // const toggleLike = () => {
  //   try {
  //     if (userLike) {
  //       // delete userLike
  //       doDeleteLike({variables: {input: {id: userLike?.id}}});
  //       incrementNoOfLikes(-1);
  //     } else {
  //       // Create User Like
  //       doCreateLike();
  //       incrementNoOfLikes(1);
  //     }
  //   } catch (err) {
  //     console.log('Error:', (err as Error).message);
  //   }
  // };

  const navigateToUserProfile = () => {
    if (post.User) {
      navigation.navigate('UserProfile', {userId: post.User.id});
    }
  };

  const navigateToLikes = () => {
    navigation.navigate('PostLikes', {id: post.id});
  };

  const navigateToComments = () => {
    navigation.navigate('Comments', {postId: post.id});
  };

  return (
    <View style={styles.post}>
      {/* Post Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: post.User?.image || DEFAULT_USER_IMAGE,
          }}
          style={styles.userAvatar}
        />
        <Text onPress={navigateToUserProfile} style={styles.userName}>
          {post.User?.username}
        </Text>

        <PostMenu post={post} />
      </View>
      {/* Post Content */}
      <DoublePressable onDoublePress={toggleLike}>
        <Content post={post} isVisible={isVisible} />
      </DoublePressable>

      {/* Post Footer */}
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <Pressable onPress={toggleLike}>
            <AntDesign
              name={isLiked ? 'heart' : 'hearto'}
              size={24}
              style={styles.icon}
              color={isLiked ? colors.accent : colors.black}
            />
          </Pressable>

          <Ionicons
            name="chatbubble-outline"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="send"
            size={24}
            style={styles.icon}
            color={colors.black}
          />

          <Feather
            name="bookmark"
            size={24}
            style={{marginLeft: 'auto'}}
            color={colors.black}
          />
        </View>

        {/* Likes */}
        {postLikes.length === 0 ? (
          <Text>Be the first to like the post</Text>
        ) : (
          <Text style={styles.text} onPress={navigateToLikes}>
            Liked by{' '}
            <Text style={styles.bold}>{postLikes[0]?.User?.username}</Text>
            {postLikes.length > 1 && (
              <>
                {' '}
                and <Text style={styles.bold}>{post.nofLikes - 1} others</Text>
              </>
            )}
          </Text>
        )}

        {/* <Text style={styles.text} onPress={navigateToLikes}>
          Liked by <Text style={styles.bold}>thelostlaces</Text> and{' '}
          <Text style={styles.bold}>{post.nofLikes} others</Text>
        </Text> */}

        {/* {postLikes.length === 0 ? (
          <Text>Be the first to like the post</Text>
        ) : (
          <Text style={styles.text} onPress={navigateToLikes}>
            Liked by{' '}
            <Text style={styles.bold}>{postLikes[0]?.User?.username}</Text>
            {postLikes.length > 1 && (
              <>
                {' '}
                and <Text style={styles.bold}>{post.nofLikes - 1} others</Text>
              </>
            )}
          </Text>
        )} */}

        {/* Post Description */}
        <Text style={styles.text} numberOfLines={isDescriptionExpanded ? 0 : 3}>
          <Text style={styles.bold}>{post.User?.username}</Text>{' '}
          {post.description}
        </Text>
        <Text onPress={toggleDescriptionExpanded}>
          {isDescriptionExpanded ? 'less' : 'more'}
        </Text>

        {/* Comments */}
        <Text style={{color: colors.grey}} onPress={navigateToComments}>
          View all {post.nofComments} comments
        </Text>
        {(post.Comments?.items || []).map(
          comment => comment && <Comment comment={comment} key={comment.id} />,
        )}

        {/* Posted Date */}
        <Text style={{color: colors.grey, marginTop: 5}}>
          {dayjs(post.createdAt).fromNow()}
        </Text>
      </View>
    </View>
  );
};

export default FeedPost;
