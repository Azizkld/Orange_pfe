import React from 'react';
import { MenuItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove cookies
    Cookies.remove('accessToken');
    Cookies.remove('userID');

    // Redirect to login page
    navigate('/admin');
  };

  return (
    <MenuItem onClick={handleLogout}>
      Logout
    </MenuItem>
  );
};

export default Logout;
