import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import Comment from '../../components/Comment/Comment';
import Input from './Input';
import {useQuery} from '@apollo/client';
import {
  Comment as CommentType,
  CommentsByPostQuery,
  CommentsByPostQueryVariables,
  ModelSortDirection,
} from '../../API';
import {commentsByPost} from './queries';
import {useRoute} from '@react-navigation/native';
import {CommentsRouteProp} from '../../types/navigation';
import ApiErrorMessage from '../../components/ApiErrorMessage';
const CommentScreen = () => {
  const route = useRoute<CommentsRouteProp>();
  const {postId} = route.params;
  const [newComments, setNewComments] = useState<CommentType[]>([]);

  const {data, loading, error} = useQuery<
    CommentsByPostQuery,
    CommentsByPostQueryVariables
  >(commentsByPost, {
    variables: {
      postID: postId,
      sortDirection: ModelSortDirection.DESC,
    },
  });

  const comments = data?.commentsByPost?.items || [];

  const isNewComment = (comment: CommentType) => {
    let comments = newComments.some(c => c.id === comment.id);
    console.log('commentS:', comments);
    return comments;
  };

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <ApiErrorMessage
        title="Error fetching comments"
        message={error.message}
      />
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={[...comments]}
        renderItem={({item}) =>
          item && <Comment comment={item} includeDetails={true} />
        }
        style={{padding: 10}}
        inverted
        keyExtractor={item => item?.id || ''}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text>No comments. Be the first comment</Text>
        )}
      />
      <Input postId={postId} />
    </View>
  );
};

export default CommentScreen;
