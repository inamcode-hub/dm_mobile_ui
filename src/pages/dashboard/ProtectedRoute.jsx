import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const [isMember, setIsMember] = useState(!!Cookies.get('dryermaster_token'));
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get('dryermaster_token');
    if (!token) {
      setIsMember(false);
    }
  }, [location.pathname]);

  if (!isMember) {
    return <Navigate to={'/'} />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
