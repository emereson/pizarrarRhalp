import { gql } from '@apollo/client';

export const UPDATE_PROFILE_PICTURE = gql`
  mutation updateUserProfilePicture($userId: ID!, $profilePicture: String!) {
    updateUser(input: { id: $userId, profilePicture: $profilePicture }) {
      id
      profilePicture
    }
  }
`;

// background

export const CREATE_GLOBAL = gql`
  mutation MyMutation($imageUrl: String, $homeImageUrl: String) {
    createGlobal(input: { id: "1", imageUrl: $imageUrl, homeImageUrl: $homeImageUrl }) {
      id
    }
  }
`;

export const UPDATE_GLOBAL = gql`
  mutation changeBackground($imageUrl: String, $homeImageUrl: String) {
    updateGlobal(input: { id: "1", imageUrl: $imageUrl, homeImageUrl: $homeImageUrl }) {
      id
      imageUrl
      homeImageUrl
    }
  }
`;
