import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';

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
    {
      id: 4,
      name: 'Predicted Moisture ',
      value: '13',
    },
    {
      id: 5,
      name: 'Suggested Rate',
      value: '0',
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
                  variant='contained'
                  color='primary'>
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
  /* Basic setup */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 1rem;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${({ theme }) =>
    theme.palette.mode === 'dark' ? '#121212' : '#fff'};

  /* Heading style */
  .heading {
    background-color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? '#333' : '#e0e0e0'};
    color: ${({ theme }) => (theme.palette.mode === 'dark' ? '#fff' : '#000')};
    padding: 1rem;
    font-size: 1rem;
    font-weight: bold;
    border-bottom: 1px solid
      ${({ theme }) => (theme.palette.mode === 'dark' ? '#444' : '#d0d0d0')};
  }

  /* Content and items */
  .content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
    padding: 0.5rem;
    .item {
      display: flex;
      flex-direction: column;
      /* gap: 8px; */
      border-radius: 8px;
      border: 1px solid
        ${({ theme }) => (theme.palette.mode === 'dark' ? '#444' : '#d0d0d0')};
      /* Name and value styling for better emphasis */
      .name-value {
        display: flex;
        justify-content: space-between;
        padding: 8px;
        align-items: center;

        .name {
        }
        .value {
          color: ${({ theme }) =>
            theme.palette.mode === 'dark' ? '#ddd' : '#333'};
        }
      }
      /* Adjust action button for better visual integration */
      .action {
        /* padding-right: 8px;
      padding-bottom: 8px; */
        /* display: flex;
      justify-content: flex-end; */
        button {
          width: 100%;
        }
      }
    }

    /* Responsive adjustments */
    @media (max-width: 600px) {
      .content {
        grid-template-columns: 1fr;
      }
    }
  }
`;
export default Controller;
