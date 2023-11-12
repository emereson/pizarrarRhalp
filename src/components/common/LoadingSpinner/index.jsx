import { useColorScheme } from 'components/Exam/hooks/useColorScheme';
import React from 'react';

const LoadingSpinner = ({ customClasses }) => {
  const { CurrentColor } = useColorScheme();

  return (
    <div
      className={`spinner-border ${customClasses}`}
      style={{ color: CurrentColor === 'light' && '#000' }}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
