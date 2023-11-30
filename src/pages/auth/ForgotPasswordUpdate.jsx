import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import send_email from '../../assets/images/send-email.svg';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const initialState = {
  email: 'inam@dryermaster.com',
  password: '',
  confirmPassword: '',
  code: ['', '', '', '', '', ''],
  showPassword: false,
};

const ForgotPasswordUpdate = () => {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    code: '',
  });

  const { email, password, confirmPassword, code, showPassword } = state;

  const handleShowPassword = () => {
    setState({ ...state, showPassword: !showPassword });
  };

  const handleCodeChange = (index, value) => {
    if (!isNaN(value) && value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setState({ ...state, code: newCode });

      // If the current input has a value, move to the next input
      if (value && index < code.length - 1) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      code: '',
    };

    // Validate email
    if (!email) {
      newErrors.email = 'Please enter your email';
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(password)) {
      newErrors.password = 'Password must include digits and letters';
    }

    // Validate confirmPassword
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Validate code
    if (code.some((digit) => digit === '')) {
      newErrors.code = 'Please enter all 6 digits for verification';
    }

    setErrors(newErrors);

    // If all validations pass, proceed with form submission
    if (
      !newErrors.email &&
      !newErrors.password &&
      !newErrors.confirmPassword &&
      !newErrors.code
    ) {
      console.log('Submit form with:');
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Code:', code.join(''));
    }
  };
  useEffect(() => {
    const path = window.location.pathname;
    document.getElementById('code-input-0').focus();
    const pathArray = path.split('/');
    const email = pathArray[2];

    setState({ ...state, email });
  }, []);
  return (
    <Wrapper>
      <Container>
        <Heading>
          <img
            src={send_email}
            alt='lock'
            width='120'
            height='120'
          />
          <Typography
            variant='h4'
            className='heading-title'>
            Request sent successfully!
          </Typography>
          <HeadingBody>
            <Typography
              variant='body2'
              className='new-user'>
              We&apos;ve sent a 6-digit confirmation email to your email. Please
              enter the code in the boxes below to verify your email.
            </Typography>
          </HeadingBody>
        </Heading>
        <form onSubmit={handleSubmit}>
          <Body>
            <TextField
              fullWidth
              type='email'
              label='Email address'
              variant='outlined'
              value={email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
              error={!!errors.email}
              helperText={errors.email}
              disabled
            />

            <CodeInput>
              {code.map((digit, index) => (
                <TextField
                  key={index}
                  id={`code-input-${index}`}
                  label={`${index + 1}`}
                  variant='outlined'
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  type='number'
                  inputProps={{ maxLength: 1 }}
                />
              ))}
            </CodeInput>
            {errors.code && (
              <Typography color='error'>{errors.code}</Typography>
            )}
            <TextField
              fullWidth
              label='Password'
              type={showPassword ? 'text' : 'password'}
              variant='outlined'
              value={password}
              onChange={(e) =>
                setState({
                  ...state,
                  password: e.target.value,
                  passwordError: e.target.value === '', // Set error if password is empty
                })
              }
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleShowPassword}
                      edge='end'>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label='Confirm Password'
              type={showPassword ? 'text' : 'password'}
              variant='outlined'
              value={confirmPassword}
              onChange={(e) =>
                setState({
                  ...state,
                  confirmPassword: e.target.value,
                  confirmPasswordError: e.target.value === '', // Set error if confirm password is empty
                })
              }
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleShowPassword}
                      edge='end'>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              fullWidth
              variant='contained'
              color='primary'
              type='submit'
              size='large'>
              Send request
            </Button>
            <div className='resend-code'>
              <Typography variant='body2'>
                Didn&apos;t receive the code? <Link to='/'>Resend code</Link>
              </Typography>
            </div>
            <Link
              to='/'
              className='login'>
              <Typography variant='body2'>&lt; Return to sign in</Typography>
            </Link>
          </Body>
        </form>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
`;

const Container = styled.div`
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px,
    rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
  border-radius: 16px;
  padding: 40px 24px;
  z-index: 0;
  background-color: ${({ theme }) =>
    theme.palette.mode === 'dark' ? '#333' : 'white'};
  border: ${({ theme }) => theme.palette.mode === 'dark' && '1px solid #333'};
  @media (max-width: 600px) {
    width: 90%;
  }
  @media (min-width: 600px) {
    width: 500px;
  }
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
  display: grid;
  place-items: center;
  text-align: center;
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
  button {
    text-transform: capitalize;
  }
  .login {
    text-align: center;
    text-decoration: none;

    p {
      margin: 0px;
      font-weight: 600;
      line-height: 1.57143;
      font-size: 0.875rem;
      font-family: 'Public Sans', sans-serif;
      color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? 'white' : 'black'};
      text-decoration: none;
    }
    :hover {
      text-decoration: underline;
    }
  }
  .resend-code {
    text-align: center;
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
`;

const CodeInput = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;

  /* Hide number input arrow */
  input[type='number'] {
    -moz-appearance: textfield; /* Firefox */
    appearance: none; /* Other modern browsers */
    margin: 0; /* Remove default margin */
  }

  /* Hide number input arrow in Webkit browsers (Chrome, Safari) */
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
  }
`;

export default ForgotPasswordUpdate;
