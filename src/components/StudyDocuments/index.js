// eslint-disable-next-line no-unused-vars
import React from 'react';
/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';

import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LEVEL_LISTS } from './graphQl/queries';

import {
  levelItem,
  levelContainer,
  levelSpan,
  levelTitle,
  levelDoc,
  studyDocumentContainerLevel
} from './styles';

const SelectLevel = () => {
  const { loading, data: levels } = useQuery(LEVEL_LISTS);

  return (
    <div css={studyDocumentContainerLevel}>
      <Link
        to="/student-profile"
        style={{
          color: '#fff',
          fontSize: '22px'
        }}
      >
        [&#8656;]
      </Link>
      <h1 css={levelTitle}>Choose your English level to go </h1>
      <div css={levelContainer}>
        {loading && (
          <div className="bran-loading">
            <Spinner animation="border" />
          </div>
        )}
        {levels &&
          levels.listLevels.items.map((level, index) => {
            return (
              <div css={levelItem} key={index}>
                <div css={levelSpan}>
                  <Link to={'student-documents-level/' + level.id}>
                    <h1>{index + 1}</h1>
                  </Link>
                </div>
                <p>Level</p>
              </div>
            );
          })}
      </div>
      <div css={levelDoc}>
        <p>
          If you dont know your English level, take a level test, or talk to your teacher
          to asign you one, then come back here
        </p>
      </div>
    </div>
  );
};

export default SelectLevel;
