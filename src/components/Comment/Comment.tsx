/* eslint-disable react/react-in-jsx-scope */
import {View, Text, Image, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/color';
import {useState} from 'react';

import styles from './styles';
import {Comment as CommentType} from '../../API';
import {DEFAULT_USER_IMAGE} from '../../config';

interface ICommentProps {
  comment: CommentType;
  includeDetails?: boolean;
}

const Comment = ({comment, includeDetails = false}: ICommentProps) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <View style={styles.comment}>
      {/* First Column - User Image */}
      {includeDetails && (
        <Image
          source={{
            uri: comment.User?.image || DEFAULT_USER_IMAGE,
          }}
          style={styles.userAvatar}
        />
      )}

      {/* Second Column - User Comment */}
      <View style={styles.middleColumn}>
        <Text style={styles.commentText}>
          <Text style={styles.bold}>{comment.User?.username}</Text>{' '}
          {comment.comment}
        </Text>

        {/* Comment Footer - Day No. of likes Reply */}
        {includeDetails && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>2 Days</Text>
            <Text style={styles.footerText}>5 Likes</Text>
            <Text style={styles.footerText}>Reply</Text>
          </View>
        )}
      </View>
      {/* Third Column - Heart Icon */}
      <Pressable onPress={() => setIsLiked(v => !v)} hitSlop={5}>
        <AntDesign
          name={isLiked ? 'heart' : 'hearto'}
          style={styles.icon}
          color={isLiked ? colors.accent : colors.black}
        />
      </Pressable>
    </View>
  );
};

export default Comment;
