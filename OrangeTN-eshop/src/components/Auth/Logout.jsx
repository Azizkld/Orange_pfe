import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Button } from '@chakra-ui/react';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('accessToken'); // Remove the access token from cookies
    Cookies.remove('userID'); // Remove the user ID from cookies
    navigate('/login'); // Redirect to login page
  };

  return (
    <Button onClick={handleLogout} colorScheme="red">
      Se déconnecter
    </Button>
  );
};

export default Logout;
