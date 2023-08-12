import {View, FlatList} from 'react-native';
import React from 'react';
import comments from '../../data/comments.json';
import Comment from '../../components/Comment/Comment';
import Input from './Input';
const CommentScreen = () => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={comments}
        renderItem={({item}) => (
          <Comment comment={item} includeDetails={true} />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
      <Input postId="1" />
    </View>
  );
};

export default CommentScreen;
