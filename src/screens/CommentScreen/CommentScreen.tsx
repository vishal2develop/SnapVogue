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
  });

  const comments = data?.commentsByPost?.items || [];
  const nextToken = data?.commentsByPost?.nextToken;

  const isNewComment = (comment: CommentType) => {
    let comments = newComments.some(c => c.id === comment.id);
    console.log('commentS:', comments);
    return comments;
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
        data={[...comments]}
        renderItem={({item}) =>
          item && <Comment comment={item} includeDetails={true} />
        }
        style={{padding: 10}}
        inverted={comments?.length > 0 && true}
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
