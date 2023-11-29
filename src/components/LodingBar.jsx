import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';

const LoadingBar = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Set the progress to 100% when the route changes
    setProgress(100);

    // After a short delay, reset the progress to 0
    const timer = setTimeout(() => {
      setProgress(0);
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <ProgressBar
      style={{
        display: progress === 0 ? 'none' : 'block',
        position: 'absolute', // Position it absolutely
        top: 0, // Position it at the top
        left: 0, // Position it at the left
      }}>
      <Filler style={{ width: `${progress}%` }} />
    </ProgressBar>
  );
};

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: #ccc;
  display: none; /* Initially hidden */
`;

const Filler = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

export default LoadingBar;
