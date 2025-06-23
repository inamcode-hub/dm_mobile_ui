// homeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let socket = null;

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
  // Live data
  streamPayload: [],
};

export const homeThunk = createAsyncThunk(
  'home/homeThunk',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/home`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const openHomeStream = createAsyncThunk(
  'home/openHomeStream',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const serial = state.user.serial;

    if (!serial) {
      return thunkAPI.rejectWithValue('Device serial not found.');
    }
    console.log('[openHomeStream] serial:', serial);
    const wsURL = `${import.meta.env.VITE_WS_URL}?token=${state.user.token}`;

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          action: 'subscribe',
          serial,
          topics: ['home'],
          userId: state.user.userId,
          role: state.user.role,
        })
      );
      return;
    }

    socket = new WebSocket(wsURL);

    socket.onopen = () => {
      console.log('[WebSocket] Connected');
      socket.send(
        JSON.stringify({
          action: 'subscribe',
          serial,
          topics: ['home'],
          userId: state.user.userId,
          role: state.user.role,
        })
      );
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'streamData' && message.streamType === 'home') {
          thunkAPI.dispatch(handleStreamPayload(message.data));
        }
      } catch (err) {
        console.error('[WebSocket] Failed to parse message:', err);
      }
    };

    socket.onerror = (err) => {
      console.error('[WebSocket] Error:', err);
    };

    socket.onclose = () => {
      console.warn('[WebSocket] Disconnected');
    };
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getHomeStateValues: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    handleStreamPayload: (state, { payload }) => {
      console.log('[Payload]', payload);
      state.streamPayload = payload;
    },
    sendHomeMessage: (_, { payload }) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(payload));
      } else {
        console.warn('[WebSocket] Not connected, cannot send');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(homeThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(homeThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log('[homeThunk.fulfilled]', payload);
      })
      .addCase(homeThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log('[homeThunk.rejected]', payload);
      });
  },
});

export const { getHomeStateValues, handleStreamPayload, sendHomeMessage } =
  homeSlice.actions;
export default homeSlice.reducer;
