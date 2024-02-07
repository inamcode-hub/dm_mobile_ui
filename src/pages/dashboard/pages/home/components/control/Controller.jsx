import React from 'react';
import styled from '@emotion/styled';
import { Button, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings'; // Example icon for actions
import TuneIcon from '@mui/icons-material/Tune';

import { grey, blue } from '@mui/material/colors';
import { Tune } from '@mui/icons-material';

const Controller = () => {
  const data = [
    {
      id: 1,
      name: 'Moisture SetPoint',
      value: 15,
      unit: '%',
      action: 'Change',
    },
    {
      id: 2,
      name: 'Discharge Rate SetPoint',
      value: 35,
      action: 'Change',
    },
    {
      id: 3,
      name: 'Operating Mode',
      value: 'Auto',
      action: 'Change',
    },
  ];
  return (
    <Wrapper>
      <div className='heading'>Dryer Control</div>
      <div className='content'>
        {data.map((item) => (
          <div
            key={item.id}
            className='item'>
            <div className='name-value'>
              <div className='name'>{item.name}</div>
              <div className='value'>
                {item.value} {item.unit}
              </div>
            </div>
            {item.action && (
              <div className='action'>
                <Button
                  startIcon={<SettingsIcon />}
                  color='primary'
                  variant='outlined'>
                  {item.action}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  background-color: ${({ theme }) =>
    theme.palette.mode === 'dark' ? '#000' : theme.palette.background.paper};
  margin: 1rem;
  .heading {
    background-color: ${({ theme }) =>
      theme.palette.mode === 'dark'
        ? theme.palette.background.paper
        : theme.palette.primary.main};
    color: #fff;
    padding: 16px;
    font-size: 1.25rem;
    font-weight: 500;
  }

  .content {
    padding: 1rem;
    @media (max-width: 768px) {
      padding: 1rem 0.5rem 1rem 0.5rem;
    }
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;

    .item {
      padding: 1rem;
      @media (max-width: 768px) {
        padding: 0.5rem;
      }
      border-radius: 8px;
      border: 1px solid ${grey[300]};
      transition: box-shadow 0.3s ease-in-out;

      .name-value {
        display: flex;
        justify-content: space-between;
      }

      .name {
        font-weight: bold;
      }

      .value {
        color: ${grey[600]};
        font-weight: 500;
      }

      .action {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
`;

export default Controller;
