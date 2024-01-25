import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  readMessageThunk,
  toggleDrawer,
} from '../../../../../features/message/messageSlice';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const ReadMessage = () => {
  const { isDrawerOpen, readMessageId, readMessageLoading } = useSelector(
    (state) => state.message
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (readMessageId) {
      dispatch(readMessageThunk());
    }
  }, [readMessageId]);
  return (
    <Modal
      open={isDrawerOpen}
      onClose={() => dispatch(toggleDrawer())}
      aria-labelledby='read-message-modal'
      aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <Wrapper>
          <div className='heading'>
            <div className='mobile'>
              <IconButton
                onClick={() => dispatch(toggleDrawer())}
                variant='contained'
                className='close-btn'>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className='desktop'>
              <IconButton
                onClick={() => dispatch(toggleDrawer())}
                variant='contained'
                className='close-btn'>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </Wrapper>
        {/* <Button
          onClick={() => dispatch(toggleDrawer())}
          variant='contained'>
          Close
        </Button> */}
      </Box>
    </Modal>
  );
};

// Responsive styles
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '100%', sm: '80%', md: '60%' },
  height: { xs: '100%', sm: '80%', md: '60%' },
  bgcolor: 'background.paper',
  boxShadow: 24,
};

const Wrapper = styled.div`
  .heading {
    background-color: ${({ theme }) =>
      theme.palette.mode === 'dark'
        ? theme.palette.grey[900]
        : 'var(--primary)'};
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 768px) {
      .desktop {
        button {
          display: none;
        }
      }
    }
    @media (min-width: 768px) {
      .mobile {
        button {
          display: none;
        }
      }
    }
    .close-btn {
      //icon color
      color: ${({ theme }) =>
        theme.palette.mode === 'dark'
          ? theme.palette.grey[300]
          : 'var(--white)'};
      padding: 1rem;
    }
  }
`;

export default ReadMessage;
