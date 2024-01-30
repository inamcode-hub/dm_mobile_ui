import styled from '@emotion/styled';
import { grey } from '@mui/material/colors';
import React from 'react';

const ChangeMoisture = () => {
  return (
    <Wrapper>
      <div className='second_value'>
        <div className='main'>15</div>
        <div className='sub'>
          <span>Moisture</span>
          <span>Setpoint</span>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .second_value {
    display: flex;
    align-items: center;
    color: #ffffff;
    background: ${({ theme }) =>
      theme.palette.mode === 'dark' ? grey[900] : '#0961ad'};
    border-radius: 8px;
    padding: 0.3rem 0.5rem;
    transition: all 0.3s ease;
    :hover {
      background: ${({ theme }) =>
        theme.palette.mode === 'dark' ? grey[800] : '#042f55'};
      cursor: pointer;
    }
    .main {
      font-size: 1.8rem;
      font-weight: 400;
      color: #ffffff;
      span {
        font-size: 1rem;
      }
    }
    .sub {
      display: flex;
      flex-direction: column;
      font-size: 0.8rem;
      font-weight: 400;
      margin-left: 0.5rem;
    }
  }
`;
export default ChangeMoisture;
