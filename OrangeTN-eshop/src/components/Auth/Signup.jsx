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
  HStack,
} from '@chakra-ui/react';
import Footer from '../Footer';
import Header from '../Header';

const SignupForm = () => {
  return (
    <Box>
      <Header/>
      <Flex minH="100vh">
        {/* Left section */}
        <Box w="60%" bg="black" color="white" p={10} display="flex" flexDirection="column" justifyContent="center">
          <VStack spacing={6} align="flex-start">
            <Heading size="2xl">ORANGE ESHOP</Heading>
            <Text fontSize="lg">Créez votre compte maintenant et gagnez du temps pour vos prochaines commandes</Text>
            <Text fontSize="md">
              Vous aurez la possibilité de suivre simplement vos commandes et de bénéficier d’offres exclusives
            </Text>
          </VStack>
        </Box>

        {/* Right section */}
        <Box w="50%" p={10} display="flex" flexDirection="column" justifyContent="center">
          <Container maxW="md">
            <HStack justifyContent="space-between" mb={8}>
              <Text>Tu as un compte?</Text>
              <Link to="/Login">
                <Button variant="outline" colorScheme="orange">Se connecter</Button>
              </Link>
            </HStack>
            <VStack spacing={6} align="flex-start">
              <Heading size="lg">Créer un compte</Heading>
              <Text>Saisir vos informations de connexion</Text>
            </VStack>
            <VStack spacing={4} mt={6}>
              <FormControl>
                <FormLabel>Nom</FormLabel>
                <Input type="text" placeholder="Nom" />
              </FormControl>
              <FormControl>
                <FormLabel>Prénom</FormLabel>
                <Input type="text" placeholder="Prénom" />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Email" />
              </FormControl>
              <FormControl>
                <FormLabel>CIN</FormLabel>
                <Input type="text" placeholder="CIN 8 chiffres" />
              </FormControl>
              <FormControl>
                <FormLabel>Mot de passe</FormLabel>
                <Input type="password" placeholder="Saisir votre mot de passe" />
              </FormControl>
              <FormControl>
                <FormLabel>Confirmer le mot de passe</FormLabel>
                <Input type="password" placeholder="Confirmer votre mot de passe" />
              </FormControl>
              <FormControl>
                <FormLabel>Photo CIN (Recto)</FormLabel>
                <Input type="file" accept="image/*" />
              </FormControl>
              <FormControl>
                <FormLabel>Photo CIN (Verso)</FormLabel>
                <Input type="file" accept="image/*" />
              </FormControl>
              <Button colorScheme="orange" w="full">Créer un compte</Button>
            </VStack>
          </Container>
        </Box>
      </Flex>
      <Footer/>
    </Box>
  );
};

export default SignupForm;
