import styled from '@emotion/styled';
import { Button } from '@mui/material';
import React from 'react';

const Controller = () => {
  const data = [
    {
      id: 1,
      name: 'Moisture SetPoint',
      value: 0.5,
      unit: '%',
      action: 'Change',
    },
    {
      id: 2,
      name: 'Discharge Rate SetPoint',
      value: 0.5,
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
      value: '11.5',
    },
    {
      id: 5,
      name: 'Suggested Rate',
      value: '0',
    },
  ];
  return (
    <Wrapper>
      <div className='heading'>
        <h2>Controller</h2>
      </div>
      <div className='content'>
        {/* table */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.value}</td>
                {item.action && (
                  <td>
                    <Button
                      variant='contained'
                      color='primary'>
                      {item.action}
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin: 1rem;
  border-radius: 10px;
  overflow: hidden; // Ensures the border-radius applies to the table as well
  background-color: ${({ theme }) =>
    theme.palette.mode === 'dark' ? '#121212' : '#fff'};

  .heading {
    padding: 0 1rem 0rem 1rem;
    h2 {
      color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? '#fff' : '#000'};
      margin: 0;
      border-bottom: 1px solid
        ${({ theme }) => (theme.palette.mode === 'dark' ? '#333' : '#e0e0e0')};
    }
  }

  .content {
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 10px; // Adds spacing between rows
      padding: 1rem;
      thead {
        th {
          text-align: left;
          padding: 1rem;
          background-color: ${({ theme }) =>
            theme.palette.mode === 'dark' ? '#555' : '#e0e0e0'};
          color: ${({ theme }) =>
            theme.palette.mode === 'dark' ? '#fff' : '#000'};
        }
      }

      tbody {
        tr {
          background-color: ${({ theme }) =>
            theme.palette.mode === 'dark' ? '#242424' : '#fff'};
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: background-color 0.3s ease;

          &:hover {
            background-color: ${({ theme }) =>
              theme.palette.mode === 'dark' ? '#353535' : '#f7f7f7'};
          }

          td {
            padding: 1rem;
            color: ${({ theme }) =>
              theme.palette.mode === 'dark' ? '#fff' : '#000'};

            &:first-of-type {
              border-top-left-radius: 10px;
              border-bottom-left-radius: 10px;
            }

            &:last-of-type {
              border-top-right-radius: 10px;
              border-bottom-right-radius: 10px;
            }
          }

          td:not(:last-child) {
            position: relative;

            &:after {
              content: '';
              position: absolute;
              right: 0;
              top: 0;
              height: 100%;
              width: 1px;
              background-color: ${({ theme }) =>
                theme.palette.mode === 'dark' ? '#333' : '#e0e0e0'};
            }
          }
        }
      }
    }

    .MuiButton-root {
      box-shadow: none;
      &:hover {
        box-shadow: none;
      }
    }
  }
`;
export default Controller;
