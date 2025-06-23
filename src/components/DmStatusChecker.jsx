import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const DmStatusChecker = () => {
  const { connectionStatus, devicesStatusSnapshot, isSocketConnecting } =
    useSelector((state) => state.home);

  const isOnline = connectionStatus?.status === 'online';
  const [isOpen, setIsOpen] = useState(false);

  const getStatus = () => {
    if (isSocketConnecting) return 'Connecting...';
    if (isOnline) return 'Online';
    return 'Offline';
  };

  const getIndicatorClass = () => {
    if (isSocketConnecting) return 'dot orange';
    if (isOnline) return 'dot green';
    return 'dot grey';
  };

  return (
    <Wrapper>
      <div
        className={`card ${
          isOnline ? 'online' : isSocketConnecting ? 'connecting' : 'offline'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={getIndicatorClass()} />
        <div className="details">
          <div className="serial">
            {connectionStatus?.serial?.split('-').slice(-3).join('-') ||
              'No Device'}
          </div>
          <div className="status">{getStatus()}</div>
        </div>
        <div className="toggle">{isOpen ? '▲' : '▼'}</div>
      </div>

      {isOpen && (
        <div className="dropdown">
          {devicesStatusSnapshot?.length ? (
            devicesStatusSnapshot.map((device) => (
              <div
                key={device.serial}
                className={`device ${
                  device.serial === connectionStatus?.serial ? 'active' : ''
                }`}
              >
                <div className="serial">{device.serial}</div>
                <div>
                  Model: <strong>{device.model || 'N/A'}</strong>
                </div>
                <div>
                  Firmware: <strong>{device.firmware || 'N/A'}</strong>
                </div>
                <div>
                  Registered: <strong>{device.registeredAt || 'N/A'}</strong>
                </div>
                <div>
                  Last Seen: <strong>{device.lastSeen || 'N/A'}</strong>
                </div>
              </div>
            ))
          ) : (
            <div className="no-data">No device data available.</div>
          )}
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  font-family: sans-serif;

  .card {
    display: flex;
    align-items: center;
    padding: 0.6rem 1rem;
    border-radius: 1.5rem;
    border: 1px solid #ccc;
    background-color: #f8f8f8;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    gap: 0.75rem;
    min-width: 300px;
    height: 45px;
  }

  .card.online {
    background: #e6f4ea;
    border-color: #cce8d5;
  }
  .card.connecting {
    background: #fff4e5;
    border-color: #ffe0b2;
  }
  .card.offline {
    background: #f0f2f5;
    border-color: #cbd8df;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .green {
    background: #2e7d32;
  }
  .orange {
    background: #ed6c02;
    animation: pulse 1.2s infinite;
  }
  .grey {
    background: #78909c;
  }

  .details {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .serial {
    font-weight: 600;
    font-size: 0.9rem;
    color: #222;
  }
  .status {
    font-size: 0.75rem;
    color: #666;
  }

  .toggle {
    font-size: 0.85rem;
    color: #555;
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    width: 100%;
    background: white;
    border: 1px solid #ddd;
    border-radius: 0.75rem;
    padding: 0.75rem 1rem;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }

  .device {
    padding: 0.5rem 0;
    font-size: 0.8rem;
    color: #333;
    border-bottom: 1px solid #eee;
  }

  .device:last-child {
    border-bottom: none;
  }

  .device.active {
    background: #f1fbf4;
    border-left: 4px solid #43a047;
    padding-left: 0.5rem;
    border-radius: 0.4rem;
  }

  .device .serial {
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  .no-data {
    color: #888;
    font-size: 0.85rem;
    padding: 0.5rem 0;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default DmStatusChecker;
