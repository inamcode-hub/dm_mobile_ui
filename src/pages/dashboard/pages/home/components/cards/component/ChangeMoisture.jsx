import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';

const ChangeMoisture = () => {
  return (
    <Wrapper>
      <Button
        variant='contained'
        color='primary'>
        SetPoint: 15
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .second_value {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
export default ChangeMoisture;
