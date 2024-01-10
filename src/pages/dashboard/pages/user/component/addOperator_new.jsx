import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserOperatorStateValues,
  operatorsRegisterThunk,
} from '../../../../../features/user/userOperatorSlice';
import styled from '@emotion/styled';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Typography,
} from '@mui/material';

const initialState = {
  passwordError: false,
};
const NewOperatorDialog = () => {
  const {
    openDialog,
    firstName,
    lastName,
    email,
    password,
    isLoadingRegister,
  } = useSelector((state) => state.operators);
  const dispatch = useDispatch();
  const [state, setState] = React.useState(initialState);

  const handleClose = () => {
    dispatch(getUserOperatorStateValues({ name: 'openDialog', value: false }));
  };

  const handleChange = (e) => {
    dispatch(
      getUserOperatorStateValues({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setState({ ...state, passwordError: true });
      return;
    }
    dispatch(operatorsRegisterThunk());
  };

  return (
    <Wrapper>
      <Dialog
        open={openDialog}
        onClose={handleClose}>
        <DialogTitle>Add New Operator</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details of the new operator.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin='dense'
              name='firstName'
              label='First Name'
              type='text'
              fullWidth
              required
              value={firstName}
              onChange={handleChange}
            />
            <TextField
              margin='dense'
              name='lastName'
              label='Last Name'
              type='text'
              fullWidth
              required
              value={lastName}
              onChange={handleChange}
            />
            <TextField
              margin='dense'
              name='email'
              label='Email Address'
              type='email'
              fullWidth
              required
              value={email}
              onChange={handleChange}
            />
            <TextField
              margin='dense'
              name='password'
              label='Password'
              type='text'
              fullWidth
              required
              value={password}
              onChange={handleChange}
            />

            {state.passwordError && (
              <Typography color='error'>
                Password must be at least 8 characters
              </Typography>
            )}
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                type='submit'
                color='primary'>
                {isLoadingRegister ? <CircularProgress size={24} /> : 'Submit'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default NewOperatorDialog;
