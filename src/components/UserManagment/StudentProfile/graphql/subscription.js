import { gql } from '@apollo/client';

export const ON_CHANGE_BACKGROUND_NOTA = gql`
  subscription onChangeBackgroundNote($id: ID!) {
    onChangeBackgroundNote(id: $id) {
      BackgroundColor
      id
    }
  }
`;
