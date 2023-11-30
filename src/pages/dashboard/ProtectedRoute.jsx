import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isMember = false;

  if (isMember === false) {
    return <Navigate to={'/'} />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
