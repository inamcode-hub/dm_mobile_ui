import styled from '@emotion/styled';
import { grey } from '@mui/material/colors';
import React from 'react';

const Inlet = () => {
  return (
    <Wrapper>
      <div className='heading'>
        <div className='title'>Inlet</div>
        <div className='warning_alert'>
          <div className='warning'>Warning</div>
          <div className='alert'>Alert</div>
        </div>
      </div>
      <div className='body'>
        <div className='value'>
          <div className='main'>20.0</div>
          <div className='sub'>
            82.1 <span> &#8451;</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${({ theme }) =>
    theme.palette.mode === 'dark' ? theme.palette.background.paper : '#d9534f'};
  border: ${({ theme }) => theme.palette.mode === 'dark' && 'px solid #333'};
  box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px,
    rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
  border-radius: 8px;
  overflow: hidden;
  .heading {
    background-color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? grey[900] : '#e58e8b'};
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: ${({ theme }) =>
      theme.palette.mode === 'dark'
        ? `3px solid ${grey[600]}`
        : '3px solid var(--primary)'};

    gap: 1rem;
    .title {
      font-size: 1.5rem;
      font-weight: 500;
    }

    .warning_alert {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      .warning {
        background: ${({ theme }) =>
          theme.palette.mode === 'dark' ? grey[900] : '#d9534f'};
      }
      .alert {
        background: ${({ theme }) =>
          theme.palette.mode === 'dark' ? grey[900] : '#d9534f'};
      }
      .warning,
      .alert {
        border: 1px solid #ffffff;
        color: #ffffff;
        border-radius: 8px;
        padding: 0.5rem;
        font-size: 1rem;
        font-weight: 500;
      }
    }
  }
  .body {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    .value {
      display: flex;
      align-items: flex-end;
      gap: 0.5rem;
      color: #ffffff;
      .main {
        font-size: 2rem;
        font-weight: 500;
        color: #ffffff;
      }
      .sub {
        font-size: 1rem;
        font-weight: 500;
      }
    }
  }
`;
export default Inlet;
