import { useState } from 'react';
import styled from '@emotion/styled';
import {
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserStateValues } from '../../../features/user/userSlice';
import CardWrapper from '../../../styles/warppers/CardWrapper';

const RegisterSerial = () => {
  const { isLoading } = useSelector((state) => state.user);
  const [serial, setSerial] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getUserStateValues({ name: 'isDmRegistered', value: 'true' }));
    dispatch(getUserStateValues({ name: 'dmSerial', value: serial }));
  };

  return (
    <Wrapper>
      <CardWrapper>
        <Heading>
          <div className='title'>Get started with DryerMaster</div>
          <HeadingBody>
            <Typography
              variant='body2'
              className='new-user'>
              Already have an account?
            </Typography>
            <Link to='/'>
              <Typography
                variant='body2'
                sx={{ fontWeight: 500 }}>
                Sign in
              </Typography>
            </Link>
          </HeadingBody>
        </Heading>
        <form onSubmit={handleSubmit}>
          <Body>
            <TextField
              fullWidth
              type='text'
              label='Serial Number'
              variant='outlined'
              name='email'
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              required
            />
            <TextField
              fullWidth
              type='password'
              label='Password'
              variant='outlined'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              fullWidth
              variant='contained'
              color='primary'
              type='submit'
              size='large'
              disabled={isLoading}>
              {isLoading ? (
                <>
                  <CircularProgress
                    size={24}
                    color='inherit'
                    style={{ marginRight: '10px' }} // Add some spacing between the spinner and the text
                  />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </Button>
          </Body>
        </form>
        <Divider />
        <p>Need help finding your Dryer Master serial number?</p>
        <div className='actions'>
          <Button variant='outlined'>Contact Us</Button>
          <Button variant='outlined'>Watch video</Button>
        </div>
        <div className='policy'>
          <Typography variant='body2'>
            By signing in, you agree to DryerMaster&apos;s
            <Link to='/'>Privacy Policy</Link> and{' '}
            <Link href='/'>Terms of Use</Link>.
          </Typography>
        </div>
      </CardWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  .policy {
    margin-top: 20px;
    text-align: center;
    p {
      font-size: 0.8rem;
      color: ${({ theme }) => theme.palette.grey[600]};
    }

    a {
      color: ${({ theme }) => theme.palette.secondary.main};
      font-weight: 400;
      padding-left: 4px;
      text-decoration: none;

      :hover {
        text-decoration: underline;
      }
    }
  }
  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
  .heading-title {
    margin: 0px;
    font-weight: 700;
    line-height: 1.5;
    font-size: 1.5rem;
    font-family: 'Public Sans', sans-serif;
  }
`;

const HeadingBody = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;

  button {
    text-transform: capitalize;
  }
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
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 1rem;
  button {
    text-transform: capitalize;
  }
`;

export default RegisterSerial;
