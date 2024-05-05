import {gql} from '@apollo/client';

export const getUser = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
        items {
          id
          image
          images
          video
        }
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
