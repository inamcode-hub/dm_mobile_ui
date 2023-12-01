import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getStateValues } from '../../features/user/userSlice';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isMember } = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get('dryermaster_token');
    if (!token) {
      dispatch(getStateValues({ name: 'isMember', value: false }));
    }
  }, [location.pathname]);

  if (!isMember) {
    return <Navigate to={'/'} />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
