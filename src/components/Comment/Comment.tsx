/* eslint-disable react/react-in-jsx-scope */
import {View, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/color';

import styles from './styles';
import {IComment} from '../../types/models';

interface ICommentProps {
  comment: IComment;
}

const Comment = ({comment}: ICommentProps) => {
  return (
    <View style={styles.comment}>
      <Text style={styles.commentText}>
        <Text style={styles.bold}>{comment.user.username}</Text>{' '}
        {comment.comment}
      </Text>
      <AntDesign name="hearto" style={styles.icon} color={colors.black} />
    </View>
  );
};

export default Comment;
