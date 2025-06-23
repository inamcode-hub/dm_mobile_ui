import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserCookies } from '../user/lib';
import { toast } from 'react-toastify';

let socket = null;
let manualClose = false;
let fatalError = false;

const initialState = {
  // Dialog states
  moistureSetPointDialog: false,
  rateSetPointDialog: false,
  modeControlDialog: false,

  // Current state values
  moistureSetPoint: 15,
  rateSetPoint: 35,
  modeControl: 'automatic',

  // Desired state values
  desiredMoistureSetPoint: '',
  desiredRateSetPoint: '',
  desiredModeControl: '',

  // Loading state
  isLoading: false,
  isSocketConnecting: false,

  // Live data
  streamPayload: [],
  // Connection/device diagnostics
  connectionStatus: null,
  devicesStatusSnapshot: [],
};

// Reconnectable socket logic
function connectWithRetry(dispatch, maxRetries = 5) {
  let retries = 0;

  const connect = () => {
    if (fatalError || retries >= maxRetries) {
      console.warn(
        '[WebSocket] Retry stopped due to fatal error or max retries'
      );
      dispatch(setSocketConnecting(false));
      return;
    }

    const token = getUserCookies('dryermaster_token');
    if (!token) {
      toast.error('Token missing. Cannot connect to live stream.');
      dispatch(setSocketConnecting(false));
      return;
    }

    const wsURL = `${import.meta.env.VITE_WS_URL}?token=${token}`;
    console.log('[WebSocket] Connecting to:', wsURL);
    dispatch(setSocketConnecting(true));
    socket = new WebSocket(wsURL);

    socket.onopen = () => {
      console.log('[WebSocket] Connected');
      retries = 0;
      dispatch(setSocketConnecting(false));
    };

    socket.onmessage = (event) => {
      try {
        if (!event.data) return;

        const message = JSON.parse(event.data);
        console.debug('[WebSocket][Received]', message);

        switch (message.type) {
          case 'devices_status_snapshot':
            dispatch(updateDevicesSnapshot(message));
            break;
          case 'connection_status':
            dispatch(updateConnectionStatus(message));
            break;
          case 'data':
            if (message.topic === 'home') {
              dispatch(handleStreamPayload(message.payload));
            }
            break;
          case 'subscribed':
            console.log('[WebSocket] Subscribed:', message.message);
            break;
          case 'error':
            console.warn('[WebSocket][Error]', message);
            toast.error(`[WebSocket] ${message.message}`);
            if (message.reason === 'auth') {
              fatalError = true;
              socket.close();
            }
            break;
          default:
            console.log('[WebSocket][Unhandled]', message);
        }
      } catch (e) {
        console.error('[WebSocket] JSON parse error:', e, event.data);
        toast.error('WebSocket: Failed to parse message');
      }
    };

    socket.onerror = (err) => {
      console.error('[WebSocket] Error:', err);
    };

    socket.onclose = (event) => {
      console.warn(
        `[WebSocket] Closed. Code=${event.code}, Reason=${event.reason}`
      );
      dispatch(setSocketConnecting(false));
      if (!manualClose && !fatalError) {
        retries += 1;
        const backoff = Math.min(1000 * 2 ** retries, 10000);
        console.log(`[WebSocket] Reconnecting in ${backoff}ms...`);
        setTimeout(connect, backoff);
      }
    };
  };

  connect();
}

export const openHomeStream = createAsyncThunk(
  'home/openHomeStream',
  async (_, thunkAPI) => {
    fatalError = false;
    manualClose = false;
    connectWithRetry(thunkAPI.dispatch);
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setSocketConnecting: (state, { payload }) => {
      state.isSocketConnecting = payload;
    },
    getHomeStateValues: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    handleStreamPayload: (state, { payload }) => {
      state.streamPayload = payload;
    },
    updateDevicesSnapshot: (state, { payload }) => {
      const snapshot = payload.devices.map((device) => ({
        ...device,
        registeredAt: device.registeredAt
          ? new Date(Number(device.registeredAt)).toLocaleString()
          : null,
        lastSeen: device.lastSeen
          ? new Date(Number(device.lastSeen)).toLocaleString()
          : null,
      }));
      console.table(snapshot);
      state.devicesStatusSnapshot = snapshot;
    },
    updateConnectionStatus: (state, { payload }) => {
      console.log('[ConnectionStatus]', payload);
      state.connectionStatus = {
        ...payload,
        firstSeen: payload.firstSeen
          ? new Date(Number(payload.firstSeen)).toLocaleString()
          : null,
        lastSeen: payload.lastSeen
          ? new Date(Number(payload.lastSeen)).toLocaleString()
          : null,
      };
    },
    sendHomeMessage: (_, { payload }) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(payload));
        console.debug('[WebSocket] Sent:', payload);
      } else {
        console.warn('[WebSocket] Not connected. Message not sent.');
        toast.warn('WebSocket not connected.');
      }
    },
    closeHomeStream: (state) => {
      manualClose = true;
      if (socket) {
        socket.close();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(openHomeStream.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(openHomeStream.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(openHomeStream.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(`WebSocket failed: ${payload}`);
      });
  },
});

export const {
  setSocketConnecting,
  getHomeStateValues,
  handleStreamPayload,
  sendHomeMessage,
  closeHomeStream,
  updateConnectionStatus,
  updateDevicesSnapshot,
} = homeSlice.actions;

export default homeSlice.reducer;
