import { Provider as ReduxProvider } from 'react-redux';
import Store from '../store';
import { CssBaseline } from '@mui/material';

const Provider = ({ children }) => {
  return (
    <ReduxProvider store={Store}>
      <CssBaseline enableColorScheme />
      {children}
    </ReduxProvider>
  );
};

export default Provider;
