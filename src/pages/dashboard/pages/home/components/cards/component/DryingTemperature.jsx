import styled from '@emotion/styled';
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
        <div className='body'>
          <div className='value'>
            <div className='main'>20.0</div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .heading {
    background: #ffffff;
    border-radius: 8px;
    padding: 0.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;

    gap: 1rem;
    .title {
      font-size: 1.5rem;
      font-weight: 500;
    }
    .warning_alert {
      display: flex;
      justify-content: space-between;
      .warning {
        background: #f5f5f5;
        border-radius: 8px;
        padding: 0.5rem;
        font-size: 1rem;
        font-weight: 500;
      }
      .alert {
        background: #f5f5f5;
        border-radius: 8px;
        padding: 0.5rem;
        font-size: 1rem;
        font-weight: 500;
      }
    }
    .body {
      display: flex;
      justify-content: space-between;
      height: 100%;

      .value {
        .main {
          font-size: 2rem;
          font-weight: 500;
        }
        .sub {
          font-size: 1rem;
          font-weight: 500;
        }
      }
    }
  }
`;
export default Inlet;
