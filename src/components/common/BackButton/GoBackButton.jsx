import React from 'react';
import { useHistory } from 'react-router-dom';
import CrystalButton from '../CrystalButton/CrystalButton';

const GoBackButton = ({ goBackCallback, unhideIcons, purple = false, ...props }) => {
  const history = useHistory();

  const goBack = () => {
    goBackCallback ? goBackCallback() : history.goBack();
  };

  return (
    <CrystalButton
      {...props}
      onClick={() => {
        try {
          unhideIcons();
        } catch (error) {}
        goBack();
      }}
      type="button"
      title="go back"
    >
      {/* <img src={backArrow} alt="go Back" /> */}

      <svg
        width="22.208px"
        height="6.538px"
        viewBox="0 0 22.208 6.538"
        enableBackground="new 0 0 22.208 6.538"
      >
        <line
          fill="none"
          stroke={'#fff'}
          strokeWidth="1.1962"
          strokeMiterlimit="10"
          x1="6.508"
          y1="3.294"
          x2="22.208"
          y2="3.294"
        />
        <polygon fill={'#fff'} points="6.674,6.538 0.208,3.443 6.692,0 " />
      </svg>
    </CrystalButton>
  );
};

export default GoBackButton;
