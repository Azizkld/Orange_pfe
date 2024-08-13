import React from 'react';
import { Box, VStack, Link, Button, Avatar, Icon } from '@chakra-ui/react';
import { FaUsers, FaFileContract, FaTags, FaExclamationCircle } from 'react-icons/fa';

const Sidebar = ({ setActiveComponent }) => {
  return (
    <Box
      bg="black"
      w="250px"
      minH="100vh"
      boxShadow="md"
      p={4}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <VStack spacing={6} align="flex-start">
        <Avatar name="Admin" src="https://bit.ly/broken-link" size="xl" mb={4} />
        <VStack spacing={3} align="flex-start" w="full">
          <Link href="#" style={{ textDecoration: 'none' }} w="full">
            <Button
              leftIcon={<Icon as={FaUsers} />}
              variant="ghost"
              colorScheme="orange"
              color="white"
              w="full"
              justifyContent="flex-start"
              _hover={{ bg: 'orange.500', color: 'black' }}
              onClick={() => setActiveComponent('clients')}
            >
              Gérer les Clients
            </Button>
          </Link>
          <Link href="#" style={{ textDecoration: 'none' }} w="full">
            <Button
              leftIcon={<Icon as={FaTags} />}
              variant="ghost"
              colorScheme="orange"
              color="white"
              w="full"
              justifyContent="flex-start"
              _hover={{ bg: 'orange.500', color: 'black' }}
              onClick={() => setActiveComponent('offres')}
            >
              Gérer les Offres
            </Button>
          </Link>
          <Link href="#" style={{ textDecoration: 'none' }} w="full">
            <Button
              leftIcon={<Icon as={FaFileContract} />}
              variant="ghost"
              colorScheme="orange"
              color="white"
              w="full"
              justifyContent="flex-start"
              _hover={{ bg: 'orange.500', color: 'black' }}
              onClick={() => setActiveComponent('contrats')}
            >
              Gérer les Contrats
            </Button>
          </Link>
          <Link href="#" style={{ textDecoration: 'none' }} w="full">
            <Button
              leftIcon={<Icon as={FaExclamationCircle} />}
              variant="ghost"
              colorScheme="orange"
              color="white"
              w="full"
              justifyContent="flex-start"
              _hover={{ bg: 'orange.500', color: 'black' }}
              onClick={() => setActiveComponent('reclamations')}
            >
              Gérer les Réclamations
            </Button>
          </Link>
        </VStack>
      </VStack>
      <Button colorScheme="orange" variant="solid" w="full">
        Déconnexion
      </Button>
    </Box>
  );
};

export default Sidebar;
