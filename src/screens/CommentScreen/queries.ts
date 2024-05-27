import {gql} from '@apollo/client';

export const commentsByPost = gql`
  query CommentsByPost(
    $postID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByPost(
      postID: $postID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        comment
        userID
        postID
        User {
          id
          name
          username
          image
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const onCreateCommentByPostId = gql`
  subscription OnCreateCommentByPostId($postID: ID!) {
    onCreateCommentByPostId(postID: $postID) {
      id
      comment
      userID
      postID
      Post {
        id
        nofComments
        createdAt
        updatedAt
      }
      User {
        id
        image
        email
        username
        name
      }
      createdAt
      updatedAt
    }
  }
`;

// export const onCreateCommentByPostIdSubscription = gql`
//   subscription OnCreateCommentByPostIdSubscription($postID: ID!) {
//     onCreateCommentByPostIdSubscription(postID: $postID) {
//       id
//       comment
//       userID
//       postID
//       Post {
//         id
//         nofComments
//         createdAt
//         updatedAt
//       }
//       User {
//         id
//         image
//         username
//         name
//       }
//       createdAt
//       updatedAt
//     }
//   }
// `;
