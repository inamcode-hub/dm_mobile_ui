import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getStateValues } from '../features/localStorage/localStorageSlice';

const ToggleTheme = () => {
  const { mode } = useSelector((state) => state.localStorage);
  const dispatch = useDispatch();
  const handleClick = () => {
    localStorage.setItem('mode', mode === 'dark' ? 'light' : 'dark');
    dispatch(
      getStateValues({
        name: 'mode',
        value: mode === 'dark' ? 'light' : 'dark',
      })
    );
  };
  return (
    <div>
      <Button
        onClick={handleClick}
        variant='contained'
        color='primary'>
        Toggle Theme
      </Button>
    </div>
  );
};

export default ToggleTheme;
