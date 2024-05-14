import {
  View,
  Image,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  CreateNavigationProp,
  CreateRouteProp,
  UpdatePostRouteProp,
} from '../../types/navigation';
import colors from '../../theme/color';
import Button from '../../components/Button';
import {createPost, getPost, updatePost} from './queries';
import {useMutation, useQuery} from '@apollo/client';
import {
  CreatePostMutation,
  CreatePostMutationVariables,
  GetPostQuery,
  GetPostQueryVariables,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from '../../API';
import {useAuthContext} from '../../contexts/AuthContext';
import Carousel from '../../components/Carousel';
import VideoPlayer from '../../components/VideoPlayer';
import ApiErrorMessage from '../../components/ApiErrorMessage';

const UpdatePostScreen = () => {
  const [description, setDescription] = useState('');
  // const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {userId} = useAuthContext();

  const navigation = useNavigation<CreateNavigationProp>();

  const route = useRoute<UpdatePostRouteProp>();
  const {id} = route.params;

  const [doUpdatePost, {error: updateError, data: updateData}] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost);

  const {data, loading, error} = useQuery<GetPostQuery, GetPostQueryVariables>(
    getPost,
    {variables: {id: id}},
  );

  const post = data?.getPost;

  useEffect(() => {
    if (post) {
      setDescription(post?.description || '');
    }
  }, [post]);

  useEffect(() => {
    if (updateData) {
      navigation.canGoBack() && navigation.goBack();
    }
  }, [updateData, navigation]);

  const submit = async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    try {
      if (!post) {
        return;
      }
      await doUpdatePost({
        variables: {input: {id: post?.id, description: description}},
      });
      setIsSubmitting(false);
    } catch (err) {
      Alert.alert('Error uploading post', (err as Error).message);
      console.log((err as Error).message);
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <ApiErrorMessage
        title="Failed to fetch the post"
        message={error?.message || updateError?.message}
      />
    );
  }

  return (
    <View style={styles.root}>
      {/* <Image
        source={{uri: image}}
        style={styles.image}
        resizeMode={'contain'}
      /> */}
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description..."
        style={styles.input}
        multiline
        numberOfLines={5}
      />
      {/* <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="Location"
        style={styles.input}
      /> */}

      <Button
        text={isSubmitting ? 'Submitting...' : 'Submit'}
        onPress={submit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  input: {
    marginVertical: 10,
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
  content: {
    width: '100%',
    aspectRatio: 1,
  },
  progressContainer: {
    backgroundColor: colors.lightgrey,
    width: '100%',
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginVertical: 10,
  },
  progress: {
    backgroundColor: colors.primary,
    position: 'absolute',
    height: '100%',
    alignSelf: 'flex-start',
    borderRadius: 25,
  },
});

export default UpdatePostScreen;
