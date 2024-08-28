import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import Nav from './Nav';
import Cookies from 'js-cookie';
import Logout from './Auth/Logout';
import logo from "../images/logo.png";


const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  

  return (
    <Box
    as="header"
    position="sticky"
    top="0"
    zIndex="30"
    height="66px"
    width="full"
   // borderBottomRadius="15px"
    backgroundColor={header ? "blackAlpha.900" : "black"}
    boxShadow={header ? "lg" : "none"}
    transition="background-color 0.3s ease, box-shadow 0.3s ease"
    color="white"
  >
    <Flex
      mx={10}
      height="full"
      align="center"
      justify="space-between"
      paddingX={4}
    >
      <Flex align="start">
        <Link to={"/"}>
          <img src={logo} alt="Logo" width={60} height={40} />
        </Link>
      </Flex>
      <Flex align="center">
        {/* Nav for Desktop */}
        <Box display={{ base: 'none', lg: 'flex' }}>
          <Nav slug={""} />
        </Box>
      </Flex>
      <Box display={{ base: 'none', lg: 'flex' }}>
        <Menu>
          <MenuButton as={Avatar} src="https://bit.ly/broken-link" cursor="pointer" />
          <MenuList color="black">
          {!isLoggedIn ? (
            <>
            <MenuItem>
              <Link to="/signup">
                Créer un compte
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/Login">
                Se connecter
              </Link>
            </MenuItem>
            </>
            ) : (
            <MenuItem>
              
               
            <Logout/>
            </MenuItem>
             )}
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  </Box>
  )
};

export default Header;




