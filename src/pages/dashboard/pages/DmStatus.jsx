import React from 'react';
import dm_status from '../../../assets/images/dm_status.svg';
import styled from '@emotion/styled';
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ReplayIcon from '@mui/icons-material/Replay';

const DmStatus = () => {
  const steps = [
    {
      icon: <WifiIcon />,
      text: 'Connect Your <strong>Dryer Master</strong> to the internet.',
    },
    {
      icon: <AddCircleOutlineIcon />,
      text: "Click on the '<strong>Add Serial</strong>' button.",
    },
    {
      icon: <AddCircleOutlineIcon />,
      text: "Add Your Serial Number and click on '<strong>Add</strong>'.",
    },
    {
      icon: <ReplayIcon />,
      text: "Click on the '<strong>Reconnect</strong>' button.",
    },
  ];

  const handleClick = () => {
    console.log('DM Status');
  };

  return (
    <Wrapper>
      <div className='content'>
        <img
          src={dm_status}
          alt='DM Status'
          width={300}
        />
        <div className='actions'>
          <Button
            variant='contained'
            color='primary'
            onClick={handleClick}>
            Add Serial
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={handleClick}>
            Reconnect
          </Button>
        </div>
        <StyledList>
          {steps.map((step, index) => (
            <ListItem key={index}>
              <ListItemIcon>{step.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <span
                    className='text'
                    dangerouslySetInnerHTML={{ __html: step.text }}
                  />
                }
              />
            </ListItem>
          ))}
        </StyledList>
        <div className='actions'>
          <Button
            variant='outlined'
            color='primary'
            onClick={handleClick}>
            Watch Video
          </Button>
          <Button
            variant='outlined'
            color='primary'
            onClick={handleClick}>
            Contact Us
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 2rem;

  img {
    width: 90vw;
    @media (min-width: 768px) {
      max-width: 400px;
      margin-top: -3rem;
      margin-bottom: -3rem;
    }
  }
  .actions {
    display: flex;
    justify-content: space-around;
    button {
      width: 48%;
    }
  }
  .text {
  }
`;

const StyledList = styled(List)`
  border-radius: 5px;

  margin-top: 1rem;

  .MuiListItemIcon-root {
    min-width: 40px;
  }
  li {
    padding: 0.5rem;
  }
`;

export default DmStatus;
