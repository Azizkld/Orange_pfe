import React, { useEffect, useState } from 'react';
import { Box, Flex, Avatar, Menu, MenuButton, MenuList, MenuItem,useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Nav from './Nav';
import logo from "../images/logo.png";
import Logout from './Auth/Logout';

const Header = () => {
  const [header, setHeader] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [image, setImage] = useState('');
  const toast = useToast();
  useEffect(() => {
    // Check if userID is available, if not, use the one from cookies
    const id =  Cookies.get('userID');
    const token = Cookies.get('accessToken'); // Retrieve token from cookies

    if (!id) {
     /* toast({
        title: 'Erreur',
        description: 'Utilisateur non identifié.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });*/
      return;
    }

    // Fetch user data using the userID
    fetch(`http://localhost:8050/api/UtilisateurAll/afficherUtilisateurId?id=${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        return response.json();
    })
    .then((data) => {
        if (data.utilisateurAll) {
         
           
Cookies.set('image', data.utilisateurAll.utImage, { expires: 22222 });

setImage(Cookies.get('image'));
        }
    })
    .catch((error) => {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        toast({
            title: 'Erreur de chargement',
            description: 'Impossible de récupérer les informations utilisateur.',
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
    });
  }, [ toast,Cookies.get('image')]);

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

  useEffect(() => {
    const token = Cookies.get('accessToken');
    setIsLoggedIn(!!token); // Set logged in status based on whether token exists
  }, []);

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="30"
      height="66px"
      width="full"
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
            <MenuButton as={Avatar}  src={`/${image}`}  cursor="pointer" />
            <MenuList color="black">
              {!isLoggedIn ? (
                <>
                  <MenuItem>
                    <Link to="/signup">
                      Créer un compte
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/login">
                      Se connecter
                    </Link>
                  </MenuItem>
                </>
              ) : (
                <MenuItem>
                  <Logout />
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
