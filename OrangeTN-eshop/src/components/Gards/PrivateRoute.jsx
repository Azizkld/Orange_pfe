import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useToast } from '@chakra-ui/react';

const PrivateRoute = ({ children }) => {
  const toast = useToast();
  const token = Cookies.get('accessToken');
  const location = useLocation();

  if (!token) {
    /*toast({
      title: 'Accès restreint',
      description: 'Vous devez vous connecter pour accéder à cette page.',
      status: 'warning',
      duration: 3000,
      isClosable: true,
    });*/

    // Redirect to login page and save the intended route
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
