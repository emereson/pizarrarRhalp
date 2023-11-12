import { gql } from '@apollo/client';
import { CLASSROOM_DATA_FRAGMENT } from './mutations';

export const ON_UPDATE_CLASSROOM_BY_ID = gql`
  ${CLASSROOM_DATA_FRAGMENT}
  subscription OnClassRoomUpdated($id: ID!) {
    onClassRoomUpdated(id: $id) {
      ...classRoomData
    }
  }
`;
