import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link as ChakraLink,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import Footer from '../Footer';
import Header from '../Header';

const BASE_URL = "http://localhost:8050/api/v1/auth/authenticate";

const LoginForm = () => {
  const [cin, setCin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = () => {
    fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cin: cin,
        password: password,
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        Cookies.set('accessToken', data.access_token, { expires: 1 });
        Cookies.set('userID', data.user_id, { expires: 1 });

        // Redirect to the originally intended route or to the home page
        const from = location.state?.from?.pathname || `/user/${data.user_id}`;
        navigate(from);
      })
      .catch(error => {
        console.log('There has been a problem with your fetch operation:', error);
      });
  };

  return (
    <Box>
      <Header />
      <Flex minH="100vh">
        <Box w="60%" bg="black" color="white" p={10} display="flex" flexDirection="column" justifyContent="center">
          <VStack spacing={6} align="flex-start">
            <Heading size="2xl">ORANGE ESHOP</Heading>
            <Text fontSize="lg">
              En vous connectant à votre compte, votre parcours d’achat sera plus rapide.
              Pas de compte client?
            </Text>
            <Text fontSize="md">
              Créez votre compte maintenant et gagnez du temps pour vos prochaines commandes
            </Text>
          </VStack>
        </Box>

        <Box w="50%" p={10} display="flex" flexDirection="column" justifyContent="center">
          <Container maxW="md">
            <HStack justifyContent="space-between" mb={8}>
              <Text>T'as pas un compte?</Text>
              <Link to="/signup">
                <Button variant="outline" colorScheme="orange">Créer un compte</Button>
              </Link>
            </HStack>
            <VStack spacing={6} align="flex-start">
              <Heading size="lg">Se connecter</Heading>
              <Text>Saisir vos informations de connexion</Text>
            </VStack>
            <VStack spacing={4} mt={6}>
              <FormControl>
                <FormLabel>CIN</FormLabel>
                <Input
                  type="text"
                  placeholder="CIN 8 chiffres"
                  value={cin}
                  onChange={(e) => setCin(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Saisir votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <ChakraLink color="orange.500" fontSize="sm" mt={2}>Mot de passe oublié</ChakraLink>
              </FormControl>
              <Button colorScheme="orange" onClick={handleSubmit} w="full">Sign In</Button>
            </VStack>
          </Container>
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
};

export default LoginForm;
