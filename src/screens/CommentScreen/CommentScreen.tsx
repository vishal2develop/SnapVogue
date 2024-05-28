import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import Comment from '../../components/Comment/Comment';
import Input from './Input';
import {useQuery, useSubscription} from '@apollo/client';
import {
  Comment as CommentType,
  CommentsByPostQuery,
  CommentsByPostQueryVariables,
  ModelSortDirection,
  OnCreateCommentByPostIdSubscription,
  OnCreateCommentByPostIdSubscriptionVariables,
} from '../../API';
import {commentsByPost, onCreateCommentByPostId} from './queries';
import {useRoute} from '@react-navigation/native';
import {CommentsRouteProp} from '../../types/navigation';
import ApiErrorMessage from '../../components/ApiErrorMessage';
const CommentScreen = () => {
  const route = useRoute<CommentsRouteProp>();
  const {postId} = route.params;

  const [newComments, setNewComments] = useState<CommentType[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const {data, loading, error, fetchMore} = useQuery<
    CommentsByPostQuery,
    CommentsByPostQueryVariables
  >(commentsByPost, {
    variables: {
      postID: postId,
      sortDirection: ModelSortDirection.DESC,
      limit: 20,
    },
    fetchPolicy: 'no-cache',
  });

  const {data: newCommentsData} = useSubscription<
    OnCreateCommentByPostIdSubscription,
    OnCreateCommentByPostIdSubscriptionVariables
  >(onCreateCommentByPostId, {variables: {postID: postId}});

  const comments = data?.commentsByPost?.items || [];
  console.log('commentsL', comments);

  const nextToken = data?.commentsByPost?.nextToken;

  useEffect(() => {
    if (newCommentsData?.onCreateCommentByPostId) {
      setNewComments(existingNewComments => [
        newCommentsData.onCreateCommentByPostId as CommentType,
        ...existingNewComments,
      ]);
    }
  }, [newCommentsData]);

  const isNewComment = (comment: CommentType) => {
    return newComments.some(c => c.id === comment.id);
  };

  const loadMore = async () => {
    console.log('loading more posts');
    if (!nextToken || isFetchingMore) {
      return;
    }
    setIsFetchingMore(true);
    await fetchMore({variables: {nextToken}});
    setIsFetchingMore(false);
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
        data={[...newComments, ...comments]}
        renderItem={({item}) =>
          item && (
            <Comment
              comment={item}
              includeDetails={true}
              isNew={isNewComment(item)}
            />
          )
        }
        style={{padding: 10}}
        inverted
        keyExtractor={item => item?.id || ''}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text>No comments. Be the first comment</Text>
        )}
        onEndReached={() => loadMore()}
      />
      <Input postId={postId} />
    </View>
  );
};

export default CommentScreen;
