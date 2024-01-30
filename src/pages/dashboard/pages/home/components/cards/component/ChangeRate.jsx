import styled from '@emotion/styled';
import { Button } from '@mui/material';
import React from 'react';

const ChangeRate = () => {
  return (
    <Wrapper>
      <Button
        variant='contained'
        color='primary'>
        SetPoint: 45
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
export default ChangeRate;
