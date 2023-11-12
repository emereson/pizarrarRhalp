import arrow from '../../assets/color-note-arrow.svg';
import styles from './styles.module.scss';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BACKGROUND_NOTE } from 'components/UserManagment/StudentProfile/graphql/queries';
import { CREATE_BACKGROUND_NOTE } from 'components/UserManagment/StudentProfile/graphql/mutation';
import { UPDATE_BACKGROUND_NOTE } from 'components/UserManagment/StudentProfile/graphql/mutation';

export const BackgroundNote = () => {
  const [index, setIndex] = useState(0);
  const [updateBackgroundNote] = useMutation(UPDATE_BACKGROUND_NOTE);
  const [createBackgroundNote] = useMutation(CREATE_BACKGROUND_NOTE);
  const { data: dataQuery } = useQuery(GET_BACKGROUND_NOTE, {
    variables: { id: '1' }
  });

  const updateColor = color => {
    if (dataQuery?.getBackgroundNote?.BackgroundColor) {
      updateBackgroundNote({
        variables: {
          id: '1',
          BackgroundColor: color
        }
      });
    } else {
      createBackgroundNote({
        variables: {
          id: '1',
          BackgroundColor: color
        }
      });
    }
  };

  const changeColor = () => {
    let color = colors[index];
    setIndex((index + 1) % colors.length);
    updateColor(color);
  };

  const opacity = '0.15';
  const colors = [
    `rgba(11, 166, 288, ${opacity})`,
    `rgba(11, 166, 288, 1)`,
    `rgba(0, 0, 0, ${opacity})`,
    `rgba(0, 0, 0, 1)`,
    `rgba(250, 250, 250, ${opacity})`,
    `rgba(250, 250, 250, 1)`,
    `rgba(147, 207, 12, ${opacity})`,
    `rgba(147, 207, 12, 1)`,
    `rgba(18, 9, 210, ${opacity})`,
    `rgba(18, 9, 210, 1)`,
    `rgba(139, 255, 184, ${opacity})`,
    `rgba(139, 255, 184, 1)`,
    `rgba(0, 232, 255, ${opacity})`,
    `rgba(0, 232, 255, 1)`,
    `rgba(255, 23, 212, ${opacity})`,
    `rgba(255, 23, 212, 1)`,
    `rgba(254, 160, 255, ${opacity})`,
    `rgba(254, 160, 255, 1)`,
    `rgba(185, 155, 255, ${opacity})`,
    `rgba(185, 155, 255, 1)`,
    `rgba(243, 255, 139, ${opacity})`,
    `rgba(243, 255, 139, 1)`,
    `rgba(106, 13, 255, ${opacity})`,
    `rgba(106, 13, 255, 1)`,
    `rgba(165, 207, 255, ${opacity})`,
    `rgba(165, 207, 255, 1)`,
    `rgba(0, 0, 0, 0)`
  ];

  return (
    <div>
      <img
        src={arrow}
        alt="change color"
        onClick={changeColor}
        className={styles.arrowIcon}
      />
    </div>
  );
};
