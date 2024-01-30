import styled from '@emotion/styled';
import { Button } from '@mui/material';
import React from 'react';

const ChangeMode = () => {
  return (
    <Wrapper>
      <Button
        variant='contained'
        color='primary'>
        Mode
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
export default ChangeMode;
