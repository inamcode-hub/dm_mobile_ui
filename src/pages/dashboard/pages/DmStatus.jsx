import styled from '@emotion/styled';
import { Button, Divider, Paper } from '@mui/material';
import React from 'react';
import DmStatusChecker from '../../../components/DmStatusChecker';
import { Link } from 'react-router-dom';

const DmStatus = () => {
  return (
    <Wrapper>
      <Paper
        className='card'
        elevation={1}>
        <div className='heading'>
          <h3>Dryer Master Status</h3>
          <DmStatusChecker />
        </div>
        <Divider />
        <div className='body'>
          <ul className='list'>
            <li>
              <span>✔</span> Is your Dryer Master power On?
            </li>
            <li>
              <span>✔</span> Is your Internet connection working?
            </li>
            <li>
              <span>✔</span> Is your Dryer Master connected to the internet?
            </li>
            <li>
              <span>✔</span> Watch our trouble shooting video
            </li>
          </ul>
          <span>
            <Link
              to='/'
              style={{ marginLeft: '.5rem', fontWeight: '500' }}>
              <Button
                variant='outlined'
                color='primary'>
                Watch Video
              </Button>
            </Link>
          </span>
          <p>
            If you are still having issues after watching the video, please
            contact us at 1-800-265-8521.
          </p>
        </div>
        <Divider />
        <div className='footer'>
          <Button
            variant='contained'
            color='primary'>
            Reconnect Dryer Master
          </Button>
        </div>
      </Paper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1rem;
  .card {
    padding: 1rem;
    max-width: 600px;
    margin: 0 auto;
    .heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      @media (max-width: 600px) {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1rem;
      }

      h3 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
      }
    }
    .body {
      .list {
        padding: 0;
        padding-top: 5px;
        margin: 0;
        list-style: none;
        li {
          padding: 0.5rem;
          font-size: 1rem;
          display: flex;
          align-items: center;
          span {
            margin-right: 0.5rem;
            color: green;
            font-weight: bold;
          }
        }
      }
    }
    .footer {
      display: grid;
      grid-template-columns: 1fr;
      margin-top: 1rem;
    }
  }
`;

export default DmStatus;
