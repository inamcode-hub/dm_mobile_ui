import styled from '@emotion/styled';
import { grey } from '@mui/material/colors';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeStateValues } from '../../../../../../../features/home/homeSlice';
import {
  findMode,
  getStreamValueByName,
} from '../../../../../../../lib/getStreamValueByName';

const RateControl = () => {
  const dispatch = useDispatch();
  const { streamPayload } = useSelector((state) => state.home);

  const dischargeRateIn = getStreamValueByName(streamPayload, 'discharge_rate');
  const dmRateOutput = getStreamValueByName(
    streamPayload,
    'discharge_rate_setpoint'
  );
  const mode = getStreamValueByName(streamPayload, 'mode_control', 0);
  const getMode = (mode) => {
    if (mode == 10) return 'Local';
    if (mode == 11) return 'Manual';
    if (mode == 12) return 'Remote';
    return ' - -';
  };

  const handleSetPoint = () => {
    dispatch(getHomeStateValues({ name: 'rateSetPointDialog', value: true }));
  };

  const handleMode = () => {
    dispatch(getHomeStateValues({ name: 'modeControlDialog', value: true }));
  };

  return (
    <Wrapper>
      <div className="heading">
        <div className="title">Rate</div>
        <div className="warning_alert" />
      </div>
      <div className="body">
        <div className="value">
          <div className="main">{dischargeRateIn || 0}</div>
        </div>
        <div className="second_value">
          <div className="main" onClick={handleSetPoint}>
            <span>SetPoint:</span>
            <span>{dmRateOutput || 0}</span>
          </div>
          <div className="sub" onClick={handleMode}>
            <span>Mode:{getMode(mode)}</span>
            {/* <span>{findMode(localRemoteMode)}</span> */}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${({ theme }) =>
    theme.palette.mode === 'dark' ? '#000' : '#f0ad4e'};
  border: ${({ theme }) => theme.palette.mode === 'dark' && 'px solid #333'};
  box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px,
    rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
  border-radius: 8px;
  overflow: hidden;

  .heading {
    background-color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? grey[800] : '#f4c27c'};
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: ${({ theme }) =>
      theme.palette.mode === 'dark'
        ? `3px solid ${grey[600]}`
        : '3px solid var(--primary)'};
    gap: 1rem;

    .title {
      font-size: 1.5rem;
      font-weight: 500;
      color: ${({ theme }) => theme.palette.mode === 'dark' && '#f0ad4e'};
    }

    .warning_alert {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 0.5rem;
    }
  }

  .body {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;

    .value {
      display: flex;
      align-items: flex-end;
      gap: 0.5rem;
      color: #ffffff;

      .main {
        font-size: 2.5rem;
        font-weight: 500;
        color: #ffffff;
      }

      .sub {
        font-size: 1rem;
        font-weight: 500;
      }
    }

    .second_value {
      color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.2rem;

      .main,
      .sub {
        border: 1px solid #ffffff;
        border-radius: 8px;
        display: flex;
        gap: 0.5rem;
        justify-content: space-between;
        font-weight: 400;
        padding: 0.1rem 0.5rem;
        background-color: ${({ theme }) =>
          theme.palette.mode === 'dark' ? grey[900] : '#e2901c'};
        transition: all 0.3s ease;

        :hover {
          background-color: ${({ theme }) =>
            theme.palette.mode === 'dark' ? grey[700] : '#8f5b14'};
          cursor: pointer;
        }
      }
    }
  }
`;

export default RateControl;
