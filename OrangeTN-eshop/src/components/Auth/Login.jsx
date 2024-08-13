import React from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  VStack,
  Checkbox,
  HStack,
} from '@chakra-ui/react';
import Footer from '../Footer';
import Header from '../Header';

const LoginForm = () => {
  return (
    <Box>
    <Header/>
    <Flex minH="100vh">
      {/* Left section */}
      <Box w="60%" bg="black" color="white" p={10} display="flex" flexDirection="column" justifyContent="center">
        <VStack spacing={6} align="flex-start">
          <Heading size="2xl">ORANGE ESHOP</Heading>
          <Text fontSize="lg">En vous connectant à votre compte, votre parcours d’achat sera plus rapide.
          Pas de compte client?
          </Text>
          <Text fontSize="md">
          Créez votre compte maintenant et gagnez du temps pour vos prochaines commandes
          </Text>
        </VStack>
      </Box>

      {/* Right section */}
      <Box w="50%" p={10} display="flex" flexDirection="column" justifyContent="center">
        <Container maxW="md">
          <HStack justifyContent="space-between" mb={8}>
            <Text>T'as pas un comptes?</Text>
            <Link to="/signup">
            <Button variant="outline" colorScheme="orange">Créer un compte</Button>
           </Link>
          </HStack>
          <VStack spacing={6} align="flex-start">
            <Heading size="lg">se connecter </Heading>
            <Text>Saisir vos information de connection</Text>
          </VStack>
          <VStack spacing={4} mt={6}>
            <FormControl>
              <FormLabel>CIN</FormLabel>
              <Input type="text" placeholder="CIN 8 chiffres" />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="saisir votre mot de passe" />
              <Link color="orange.500" fontSize="sm" mt={2}>Mot de passe oubliée</Link>
            </FormControl>
            <Button colorScheme="orange" w="full">Sign In</Button>
          </VStack>
        </Container>
      </Box>
    </Flex>
    <Footer/>
    </Box>
  );
};

export default LoginForm;
