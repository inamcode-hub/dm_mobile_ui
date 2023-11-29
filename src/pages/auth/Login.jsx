import styled from '@emotion/styled';
import ToggleTheme from '../../components/ToggleTheme';
import { Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <Wrapper>
      <div className='container'>
        <div className='heading'>
          <Typography
            variant='h4'
            className='heading-title'>
            Sign in to DryerMaster
          </Typography>
          <div className='heading-body'>
            <Typography
              variant='body2'
              className='new-user'>
              New User?
            </Typography>
            <Link to='/register'>
              <Typography
                variant='body2'
                sx={{ fontWeight: 500 }}>
                Create an account
              </Typography>
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='body'>
            <TextField
              fullWidth
              label='Email address'
              variant='outlined'
              margin='normal'
            />
            <TextField
              fullWidth
              label='Password'
              type='password'
              variant='outlined'
              margin='normal'
            />
            <div className='forgot-password'>
              <Link to='/forgot-password'>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 500 }}>
                  Forgot password?
                </Typography>
              </Link>
            </div>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              type='submit'
              size='large'>
              Sign In
            </Button>
            <ToggleTheme />
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  /* gray background color */
  background-color: ${({ theme }) =>
    theme.palette.mode === 'light' && '#f0f2f5'};
  .container {
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px,
      rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
    border-radius: 16px;
    padding: 40px 24px;
    z-index: 0;
    background-color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? '#333' : 'white'};
    border: ${({ theme }) => theme.palette.mode === 'dark' && '1px solid #333'};
    .heading {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 40px;
      .heading-title {
        margin: 0px;
        font-weight: 700;
        line-height: 1.5;
        font-size: 1.25rem;
        font-family: 'Public Sans', sans-serif;
      }
      .heading-body {
        display: flex;
        flex-direction: row;
        gap: 4px;
        align-items: center;

        a {
          margin: 0px;
          font-weight: 600;
          line-height: 1.57143;
          font-size: 0.875rem;
          font-family: 'Public Sans', sans-serif;
          color: ${({ theme }) => theme.palette.secondary.main};
          text-decoration: none;
          :hover {
            text-decoration: underline;
          }
        }
      }
    }
    .body {
      display: flex;
      flex-direction: column;
      gap: 20px;
      .MuiTextField-root {
        margin: 0px;
        fieldset {
          border-radius: 8px;
        }
      }
      .forgot-password {
        display: flex;
        justify-content: flex-end;
        a {
          color: ${({ theme }) =>
            theme.palette.mode === 'dark' ? 'white' : 'black'};
        }
      }
    }
  }
  @media (max-width: 600px) {
    .container {
      width: 95vw;
    }
  }
  @media (min-width: 600px) {
    .container {
      width: 500px;
    }
  }
`;

export default Login;
