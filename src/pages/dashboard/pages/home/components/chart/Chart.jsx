import React from 'react';
import MainChart from './components/MainChart';
import ControlChart from './components/ControlChart';
import styled from '@emotion/styled';

const Chart = () => {
  return (
    <Wrapper>
      <MainChart />
      <ControlChart />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  gap: 1rem;
`;
export default Chart;
