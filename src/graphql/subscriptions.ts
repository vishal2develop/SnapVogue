/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateCommentByPostId = /* GraphQL */ `subscription OnCreateCommentByPostId($postID: ID!) {
  onCreateCommentByPostId(postID: $postID) {
    id
    createdAt
    comment
    userID
    postID
    User {
      id
      name
      email
      username
      bio
      website
      nofPosts
      nofFollowers
      nofFollowings
      image
      Posts {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    Post {
      id
      createdAt
      type
      description
      image
      images
      video
      nofComments
      nofLikes
      userID
      User {
        id
        name
        email
        username
        bio
        website
        nofPosts
        nofFollowers
        nofFollowings
        image
        createdAt
        updatedAt
        owner
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      updatedAt
      owner
      __typename
    }
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateCommentByPostIdSubscriptionVariables,
  APITypes.OnCreateCommentByPostIdSubscription
>;
export const onCreateLike = /* GraphQL */ `subscription OnCreateLike(
  $filter: ModelSubscriptionLikeFilterInput
  $owner: String
) {
  onCreateLike(filter: $filter, owner: $owner) {
    id
    userID
    postID
    User {
      id
      name
      email
      username
      bio
      website
      nofPosts
      nofFollowers
      nofFollowings
      image
      Posts {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    Post {
      id
      createdAt
      type
      description
      image
      images
      video
      nofComments
      nofLikes
      userID
      User {
        id
        name
        email
        username
        bio
        website
        nofPosts
        nofFollowers
        nofFollowings
        image
        createdAt
        updatedAt
        owner
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      updatedAt
      owner
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateLikeSubscriptionVariables,
  APITypes.OnCreateLikeSubscription
>;
export const onUpdateLike = /* GraphQL */ `subscription OnUpdateLike(
  $filter: ModelSubscriptionLikeFilterInput
  $owner: String
) {
  onUpdateLike(filter: $filter, owner: $owner) {
    id
    userID
    postID
    User {
      id
      name
      email
      username
      bio
      website
      nofPosts
      nofFollowers
      nofFollowings
      image
      Posts {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    Post {
      id
      createdAt
      type
      description
      image
      images
      video
      nofComments
      nofLikes
      userID
      User {
        id
        name
        email
        username
        bio
        website
        nofPosts
        nofFollowers
        nofFollowings
        image
        createdAt
        updatedAt
        owner
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      updatedAt
      owner
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateLikeSubscriptionVariables,
  APITypes.OnUpdateLikeSubscription
>;
export const onDeleteLike = /* GraphQL */ `subscription OnDeleteLike(
  $filter: ModelSubscriptionLikeFilterInput
  $owner: String
) {
  onDeleteLike(filter: $filter, owner: $owner) {
    id
    userID
    postID
    User {
      id
      name
      email
      username
      bio
      website
      nofPosts
      nofFollowers
      nofFollowings
      image
      Posts {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    Post {
      id
      createdAt
      type
      description
      image
      images
      video
      nofComments
      nofLikes
      userID
      User {
        id
        name
        email
        username
        bio
        website
        nofPosts
        nofFollowers
        nofFollowings
        image
        createdAt
        updatedAt
        owner
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      updatedAt
      owner
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteLikeSubscriptionVariables,
  APITypes.OnDeleteLikeSubscription
>;
export const onCreateComment = /* GraphQL */ `subscription OnCreateComment(
  $filter: ModelSubscriptionCommentFilterInput
  $owner: String
) {
  onCreateComment(filter: $filter, owner: $owner) {
    id
    createdAt
    comment
    userID
    postID
    User {
      id
      name
      email
      username
      bio
      website
      nofPosts
      nofFollowers
      nofFollowings
      image
      Posts {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    Post {
      id
      createdAt
      type
      description
      image
      images
      video
      nofComments
      nofLikes
      userID
      User {
        id
        name
        email
        username
        bio
        website
        nofPosts
        nofFollowers
        nofFollowings
        image
        createdAt
        updatedAt
        owner
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      updatedAt
      owner
      __typename
    }
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateCommentSubscriptionVariables,
  APITypes.OnCreateCommentSubscription
>;
export const onUpdateComment = /* GraphQL */ `subscription OnUpdateComment(
  $filter: ModelSubscriptionCommentFilterInput
  $owner: String
) {
  onUpdateComment(filter: $filter, owner: $owner) {
    id
    createdAt
    comment
    userID
    postID
    User {
      id
      name
      email
      username
      bio
      website
      nofPosts
      nofFollowers
      nofFollowings
      image
      Posts {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    Post {
      id
      createdAt
      type
      description
      image
      images
      video
      nofComments
      nofLikes
      userID
      User {
        id
        name
        email
        username
        bio
        website
        nofPosts
        nofFollowers
        nofFollowings
        image
        createdAt
        updatedAt
        owner
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      updatedAt
      owner
      __typename
    }
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateCommentSubscriptionVariables,
  APITypes.OnUpdateCommentSubscription
>;
export const onDeleteComment = /* GraphQL */ `subscription OnDeleteComment(
  $filter: ModelSubscriptionCommentFilterInput
  $owner: String
) {
  onDeleteComment(filter: $filter, owner: $owner) {
    id
    createdAt
    comment
    userID
    postID
    User {
      id
      name
      email
      username
      bio
      website
      nofPosts
      nofFollowers
      nofFollowings
      image
      Posts {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    Post {
      id
      createdAt
      type
      description
      image
      images
      video
      nofComments
      nofLikes
      userID
      User {
        id
        name
        email
        username
        bio
        website
        nofPosts
        nofFollowers
        nofFollowings
        image
        createdAt
        updatedAt
        owner
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      updatedAt
      owner
      __typename
    }
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteCommentSubscriptionVariables,
  APITypes.OnDeleteCommentSubscription
>;
export const onCreatePost = /* GraphQL */ `subscription OnCreatePost(
  $filter: ModelSubscriptionPostFilterInput
  $owner: String
) {
  onCreatePost(filter: $filter, owner: $owner) {
    id
    createdAt
    type
    description
    image
    images
    video
    nofComments
    nofLikes
    userID
    User {
      id
      name
      email
      username
      bio
      website
      nofPosts
      nofFollowers
      nofFollowings
      image
      Posts {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    Likes {
      items {
        id
        userID
        postID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    Comments {
      items {
        id
        createdAt
        comment
        userID
        postID
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreatePostSubscriptionVariables,
  APITypes.OnCreatePostSubscription
>;
export const onUpdatePost = /* GraphQL */ `subscription OnUpdatePost(
  $filter: ModelSubscriptionPostFilterInput
  $owner: String
) {
  onUpdatePost(filter: $filter, owner: $owner) {
    id
    createdAt
    type
    description
    image
    images
    video
    nofComments
    nofLikes
    userID
    User {
      id
      name
      email
      username
      bio
      website
      nofPosts
      nofFollowers
      nofFollowings
      image
      Posts {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    Likes {
      items {
        id
        userID
        postID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    Comments {
      items {
        id
        createdAt
        comment
        userID
        postID
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdatePostSubscriptionVariables,
  APITypes.OnUpdatePostSubscription
>;
export const onDeletePost = /* GraphQL */ `subscription OnDeletePost(
  $filter: ModelSubscriptionPostFilterInput
  $owner: String
) {
  onDeletePost(filter: $filter, owner: $owner) {
    id
    createdAt
    type
    description
    image
    images
    video
    nofComments
    nofLikes
    userID
    User {
      id
      name
      email
      username
      bio
      website
      nofPosts
      nofFollowers
      nofFollowings
      image
      Posts {
        nextToken
        __typename
      }
      Comments {
        nextToken
        __typename
      }
      Likes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
    Likes {
      items {
        id
        userID
        postID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    Comments {
      items {
        id
        createdAt
        comment
        userID
        postID
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeletePostSubscriptionVariables,
  APITypes.OnDeletePostSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onCreateUser(filter: $filter, owner: $owner) {
    id
    name
    email
    username
    bio
    website
    nofPosts
    nofFollowers
    nofFollowings
    image
    Posts {
      items {
        id
        createdAt
        type
        description
        image
        images
        video
        nofComments
        nofLikes
        userID
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    Comments {
      items {
        id
        createdAt
        comment
        userID
        postID
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    Likes {
      items {
        id
        userID
        postID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onUpdateUser(filter: $filter, owner: $owner) {
    id
    name
    email
    username
    bio
    website
    nofPosts
    nofFollowers
    nofFollowings
    image
    Posts {
      items {
        id
        createdAt
        type
        description
        image
        images
        video
        nofComments
        nofLikes
        userID
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    Comments {
      items {
        id
        createdAt
        comment
        userID
        postID
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    Likes {
      items {
        id
        userID
        postID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onDeleteUser(filter: $filter, owner: $owner) {
    id
    name
    email
    username
    bio
    website
    nofPosts
    nofFollowers
    nofFollowings
    image
    Posts {
      items {
        id
        createdAt
        type
        description
        image
        images
        video
        nofComments
        nofLikes
        userID
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    Comments {
      items {
        id
        createdAt
        comment
        userID
        postID
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    Likes {
      items {
        id
        userID
        postID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
