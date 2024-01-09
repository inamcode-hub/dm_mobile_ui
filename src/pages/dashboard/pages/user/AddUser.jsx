import React from 'react';
import CardWrapper from '../../../../styles/warppers/CardWrapper';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { TbMoodEmpty } from 'react-icons/tb';
import { grey } from '@mui/material/colors';

const AddUser = () => {
  const user = [
    {
      id: 1,
      name: 'John Doe',
      email: 'jhon@gmail.com',
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'chris@gmail.com',
    },
    {
      id: 3,
      name: 'John Doe',
      email: 'jhon@gmail.com',
    },
    {
      id: 4,
      name: 'John Doe',
      email: 'chris@gmail.com',
    },
  ];
  return (
    <Wrapper>
      <CardWrapperStyle>
        <div className='title'>
          Operators
          <br />
        </div>
        <div className='body'>
          {
            // if no user found
            user.length === 0 ? (
              <div className='no-user'>
                <div className='icon'>
                  <TbMoodEmpty />
                </div>
                <div className='text'>Currently you have no operators</div>
              </div>
            ) : (
              <div className='table'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td className='buttons'>
                          <Button
                            variant='outlined'
                            color='primary'>
                            Edit
                          </Button>
                          <Button
                            variant='outlined'
                            color='error'>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
        </div>
        <div className='footer'>
          <Button
            variant='contained'
            color='primary'
            sx={{ width: '100%' }}>
            Add Operator
          </Button>
          <small>
            <i>
              <b>Note:</b> Only admin can add upto 5 operators
            </i>
          </small>
        </div>
      </CardWrapperStyle>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
  .no-user {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .icon {
      font-size: 8rem;
      color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? '#fff' : grey[500]};
    }
    .text {
      font-size: 1.2rem;
      margin-top: -2rem;
      color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? '#fff' : grey[900]};
    }
  }
  .body {
    .table {
      // button box need only 130px width

      th:nth-child(3) {
        width: 130px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        // button must have width only as required

        th,
        td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        tr:nth-child(even) {
          background-color: ${({ theme }) =>
            theme.palette.mode === 'dark' ? '#424242' : '#f2f2f2'};
        }
        tr:hover {
          background-color: ${({ theme }) =>
            theme.palette.mode === 'dark' ? '#424242' : 'var(--primary-1)'};
        }
        th {
          padding-top: 12px;
          padding-bottom: 12px;
          text-align: left;
          background-color: ${({ theme }) =>
            theme.palette.mode === 'dark' ? '#333' : 'var(--primary);'};
          color: white;
        }
      }
    }
    .buttons {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
      button {
        text-transform: capitalize;
      }
    }
  }
  .footer {
    margin-top: 1rem;
  }
`;
const CardWrapperStyle = styled(CardWrapper)`
  @media (max-width: 600px) {
    width: 90%;
  }
  @media (min-width: 600px) {
    width: 500px;
  }
  @media (min-width: 960px) {
    width: 700px;
  }
`;
export default AddUser;
