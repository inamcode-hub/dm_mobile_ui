import React, { useEffect } from 'react';
import Inlet from './component/Inlet';
import Outlet from './component/Outlet';
import RateControl from './component/RateControl';
import DryingTemperature from './component/DryingTemperature';
import styled from '@emotion/styled';
import { connectToSSE } from '../../../../../../lib/sseHandler';
import { useDispatch } from 'react-redux';

const Cards = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const eventSource = connectToSSE(dispatch);

    // Clean up the event source when the component unmounts
    return () => {
      eventSource.close();
    };
  }, [dispatch]);

  return (
    <Wrapper>
      <Inlet />
      <Outlet />
      <RateControl />
      <DryingTemperature />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1rem;
  display: grid;
  gap: 1rem;
  @media (min-width: 920px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export default Cards;
