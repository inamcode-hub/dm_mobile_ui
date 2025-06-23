import React from 'react';
import styled from '@emotion/styled';
import {
  MdCloudOff,
  MdDevices,
  MdErrorOutline,
  MdAutorenew,
} from 'react-icons/md';

const ICONS = {
  'no-server': <MdCloudOff size={42} color="#b71c1c" />,
  'waiting-device': <MdDevices size={42} color="#ef6c00" />,
  'offline-device': <MdErrorOutline size={42} color="#f44336" />,
};

const DmReconnect = ({ status, message }) => {
  return (
    <Wrapper>
      <div className="card">
        <div className="icon">{ICONS[status] || <MdAutorenew size={42} />}</div>
        <h3>{message}</h3>
        <p>
          {status === 'no-server' &&
            'We’re trying to connect to the server. Please ensure your internet connection is working.'}
          {status === 'waiting-device' &&
            'We are connected to the server but haven’t received device status yet.'}
          {status === 'offline-device' &&
            'Your device is currently offline. Please check its connection or power state.'}
        </p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;

  .card {
    text-align: center;
    max-width: 400px;
    padding: 2rem;
    border-radius: 1rem;
    background-color: #fafafa;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  .icon {
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0.5rem 0;
    color: #333;
  }

  p {
    font-size: 0.9rem;
    color: #666;
  }
`;

export default DmReconnect;
