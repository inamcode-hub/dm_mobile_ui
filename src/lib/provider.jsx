import { Provider as ReduxProvider } from 'react-redux';
import Store from '../store';

const Provider = ({ children }) => {
  return <ReduxProvider store={Store}>{children}</ReduxProvider>;
};

export default Provider;
