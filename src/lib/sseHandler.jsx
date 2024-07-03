import { addServerData } from '../features/dryerMaster/dryerMasterSlice';
import { getUserCookies } from '../features/user/lib';

export const connectToSSE = (dispatch) => {
  const apiBaseUrl = import.meta.env.VITE_PUBLIC_API;
  const token = getUserCookies('dryermaster_token');
  const sseUrl = `${apiBaseUrl}/api/v1/dryermaster/dashboard/sseSensorData?token=${token}`;

  const eventSource = new EventSource(sseUrl);

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
    if (data) {
      dispatch(addServerData(data));
    }
  };

  eventSource.onerror = (error) => {
    console.error('SSE error:', error);
    eventSource.close();
  };

  return eventSource;
};
