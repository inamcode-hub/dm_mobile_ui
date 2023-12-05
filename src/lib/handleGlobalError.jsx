import { toast } from 'react-toastify';

export const handleGlobalError = (error, thunkAPI) => {
  if (!error.response) {
    toast.error('Network error: Unable to reach the server');
    return thunkAPI.rejectWithValue({ message: 'Network error' });
  }

  const status = error.response.status || 500;
  const message = error.response.data.message || 'An error occurred';

  // Handle specific HTTP status codes
  switch (status) {
    case 400: // Bad Request
      toast.error(`${message}`);
      break;
    case 401: // Unauthorized
      toast.error(`${message}`);
      break;
    case 403: // Forbidden
      toast.error(`${message}`);
      break;
    case 404: // Not Found
      toast.error(`${message}`);
      break;
    case 500: // Internal Server Error
      toast.error(`server error: ${message}`);
      break;
    case 503: // Service Unavailable
      toast.error(`server error: ${message}`);
      break;
    default: // Other errors
      toast.error(message);
  }

  return thunkAPI.rejectWithValue({ message, status });
};
