import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import verifyToken from '../utils/verifyToken';

const ProtectedRoute = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        await verifyToken();
        setIsVerified(true);
      } catch (error) {
        console.error('Token verification failed:', error);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner
  }

  return isVerified ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;