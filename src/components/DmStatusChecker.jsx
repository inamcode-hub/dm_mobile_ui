import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { green, blueGrey, orange } from '@mui/material/colors';

const DmStatusChecker = () => {
  const { connectionStatus, devicesStatusSnapshot, isSocketConnecting } =
    useSelector((state) => state.home);
  const isOnline = connectionStatus?.status === 'online';
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const renderStatusIcon = () => {
    if (isSocketConnecting) return <div className="circle orange" />;
    if (isOnline) return <div className="circle green" />;
    return <div className="circle grey" />;
  };

  return (
    <Wrapper>
      <div
        className={`status-card ${
          isOnline ? 'online' : isSocketConnecting ? 'connecting' : 'offline'
        }`}
        onClick={toggleDropdown}
      >
        {renderStatusIcon()}
        <div className="info">
          <div className="serial">
            {connectionStatus?.serial?.split('-').slice(-3).join('-') ||
              'No Device'}
          </div>
          <div className="status-text">
            {isSocketConnecting
              ? 'Connecting...'
              : isOnline
              ? 'Online'
              : 'Offline'}
          </div>
        </div>
        <div className="arrow">{isOpen ? '▲' : '▼'}</div>
      </div>

      {isOpen && (
        <div className="dropdown">
          {devicesStatusSnapshot?.length > 0 ? (
            devicesStatusSnapshot.map((device) => {
              const isCurrent = device.serial === connectionStatus?.serial;
              return (
                <div
                  key={device.serial}
                  className={`device ${isCurrent ? 'active' : ''}`}
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
                  {/* <div>
                    Topics:{' '}
                    <strong>
                      {device.availableTopics?.join(', ') || 'N/A'}
                    </strong>
                  </div> */}
                  <hr />
                </div>
              );
            })
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
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  .status-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 1rem;
    border-radius: 1.5rem;
    background-color: #f2f2f2;
    cursor: pointer;
    min-width: 240px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    transition: background 0.3s ease;
    border: 1px solid #ddd;
  }

  .status-card.online {
    background-color: #e6f4ea;
    border-color: #cce8d5;
  }

  .status-card.connecting {
    background-color: #fff4e5;
    border-color: #ffe0b2;
  }

  .status-card.offline {
    background-color: #e9eff3;
    border-color: #cbd8df;
  }

  .circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .green {
    background-color: #2e7d32;
  }

  .orange {
    background-color: #ed6c02;
    animation: pulse 1.2s infinite;
  }

  .grey {
    background-color: #78909c;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .serial {
    font-weight: 600;
    font-size: 0.9rem;
    line-height: 1;
    color: #333;
  }

  .status-text {
    font-size: 0.75rem;
    color: #666;
    margin-top: 2px;
  }

  .arrow {
    margin-left: auto;
    font-size: 0.9rem;
    color: #555;
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    width: 100%;
    background: #ffffff;
    border-radius: 0.75rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    padding: 0.75rem 1rem;
    z-index: 100;
    border: 1px solid #ddd;
  }

  .device {
    margin-bottom: 1rem;
    font-size: 0.75rem;
    color: #444;
  }

  .device:last-of-type {
    margin-bottom: 0;
  }

  .device.active {
    background-color: #f1fbf4;
    border-left: 4px solid #43a047;
    padding-left: 0.5rem;
    border-radius: 4px;
  }

  .device .serial {
    font-weight: bold;
    margin-bottom: 4px;
  }

  .device div {
    margin: 1px 0;
  }

  .device strong {
    font-weight: 600;
  }

  .no-data {
    font-size: 0.85rem;
    color: #999;
    padding: 0.5rem 0;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default DmStatusChecker;
