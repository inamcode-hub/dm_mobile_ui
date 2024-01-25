import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDrawer } from '../../../../../features/message/messageSlice';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const ReadMessage = () => {
  const { isDrawerOpen } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  return (
    <Modal
      open={isDrawerOpen}
      onClose={() => dispatch(toggleDrawer())}
      aria-labelledby='read-message-modal'
      aria-describedby='modal-modal-description'>
      <Box sx={style}>
        {/* Content of the modal */}
        <div>ReadMessage</div>
        <Button onClick={() => dispatch(toggleDrawer())}>Close</Button>
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
  p: 4,
};

export default ReadMessage;
