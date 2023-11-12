import { gql } from '@apollo/client';
import { CLASSROOM_DATA_FRAGMENT } from '../../Whiteboard/graphQL/mutations';

export const ON_UPDATE_CLASSROOM = gql`
  ${CLASSROOM_DATA_FRAGMENT}
  subscription OnUpdateClassRoom {
    onUpdateClassRoom {
      ...classRoomData
    }
  }
`;
