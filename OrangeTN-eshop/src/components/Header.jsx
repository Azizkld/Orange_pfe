import React, { useEffect, useState } from 'react';
import { Box, Flex, Button, useBreakpointValue, Avatar, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/react';
import Nav from './Nav';
import logo from "../images/logo.png";
import { Link } from 'react-router-dom';
import Logout from './Auth/Logout';

const Header = () => {
  const [header, setHeader] = useState(false);

  const scrollHeader = () => {
    if (window.scrollY >= 20) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);
    return () => {
      window.removeEventListener("scroll", scrollHeader);
    };
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
              <MenuItem>
                
                 
              <Logout/>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;