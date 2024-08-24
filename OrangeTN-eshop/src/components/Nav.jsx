import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/react';
import Logout from './Auth/Logout'; // Import the Logout component

const slugData = ["APROPOS", "PROFILE", "NUMERO", "OFFRES", "CONTRAT", "RECLAMATION"];
const numeroSubmenu = ["Acheter Numero", "convertir sim/esim", "convertir esim/sim"];
//const profileSubmenu = ["créer un compte", "se connecter", ];

const Nav = ({ slug }) => {
  const [activeLink, setActiveLink] = useState(slug);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const handleClick = (link) => {
    setActiveLink(link);
  };

  const handleMouseEnter = () => {
    setIsSubmenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSubmenuOpen(false);
  };

  return (
    <Flex align="center" justify="center" gap={{ base: 2, lg: 4 }} position="relative">
      {slugData.map((slug) => (
        <Box
          key={slug}
          px={{ base: 1, lg: 2 }}
          borderRadius="full"
          position="relative"
          onMouseEnter={slug === "NUMERO"  ? handleMouseEnter : null}
          onMouseLeave={slug === "NUMERO"  ? handleMouseLeave : null}
          _after={{
            content: '""',
            position: 'absolute',
            bottom: '-2px',
            left: '0',
            width: '100%',
            height: '2px',
            bg: 'orange.500',
            transform: 'scaleX(0)',
            transformOrigin: 'center',
            transition: 'transform 0.3s ease-in-out',
          }}
          _hover={{
            _after: {
              transform: 'scaleX(1)',
            },
          }}
        >
          <RouterLink
            to={`/${slug}`}
            style={{
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: activeLink === slug ? 'blue.500' : 'gray.700',
              textDecoration: activeLink === slug ? 'underline' : 'none',
              textDecorationThickness: activeLink === slug ? '2px' : 'initial',
              padding: '5px 0',
              display: 'block'
            }}
            onClick={() => handleClick(slug)}
          >
            {slug}
          </RouterLink>
          {slug === "NUMERO" && isSubmenuOpen && (
            <Box
              position="absolute"
              top="100%"
              left="0"
              bg="black"
              boxShadow="lg"
              rounded="md"
              zIndex="10"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              py={2}
              w="200px"
            >
              {numeroSubmenu.map((submenu, index) => (
                <RouterLink
                  key={index}
                  to={`/${submenu.replace(/\s+/g, '-').toLowerCase()}`}
                  style={{
                    display: 'block',
                    padding: '10px 20px',
                    textDecoration: 'none',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 'normal',
                    transition: 'background 0.3s ease-in-out',
                  }}
                  onClick={() => handleClick(submenu)}
                >
                  <Text
                    _hover={{
                      bg: 'orange.500',
                      color: 'white',
                      borderRadius: 'md',
                    }}
                  >
                    {submenu}
                  </Text>
                </RouterLink>
              ))}
            </Box>
          )}
          
        </Box>
      ))}
    </Flex>
  );
};

export default Nav;
