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
  Link,
  Text,
  VStack,
  HStack,
  useToast,
} from '@chakra-ui/react';
import Footer from '../Footer';
import Header from '../Header';

const SignupForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [cin, setCin] = useState('');
  const [password, setPassword] = useState('');
  const [utCinFrontImage, setUtCinFrontImage] = useState(null);
  const [utCinBackImage, setUtCinBackImage] = useState(null);
  const toast = useToast();

  const handleFileChangeFront = (event) => {
    setUtCinFrontImage(event.target.files[0]);
  };

  const handleFileChangeBack = (event) => {
    setUtCinBackImage(event.target.files[0]);
  };

  const validateEmail = (email) => {
    // Basic email pattern check
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    // Input validation
    if (!firstname) {
      toast({
        title: 'Erreur',
        description: 'Le champ "Nom" est obligatoire.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!lastname) {
      toast({
        title: 'Erreur',
        description: 'Le champ "Prénom" est obligatoire.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!email) {
      toast({
        title: 'Erreur',
        description: 'Le champ "Email" est obligatoire.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!validateEmail(email)) {
      toast({
        title: 'Erreur',
        description: 'Veuillez entrer un email valide.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!cin) {
      toast({
        title: 'Erreur',
        description: 'Le champ "CIN" est obligatoire.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (cin.length !== 8 || !/^\d+$/.test(cin)) {
      toast({
        title: 'Erreur',
        description: 'Le CIN doit contenir exactement 8 chiffres.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!password) {
      toast({
        title: 'Erreur',
        description: 'Le champ "Mot de passe" est obligatoire.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!utCinFrontImage) {
      toast({
        title: 'Erreur',
        description: 'La photo du CIN (Recto) est obligatoire.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!utCinBackImage) {
      toast({
        title: 'Erreur',
        description: 'La photo du CIN (Verso) est obligatoire.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('cin', cin);
    formData.append('password', password);
    formData.append('utCinFrontImage', utCinFrontImage);
    formData.append('utCinBackImage', utCinBackImage);

    try {
      const response = await fetch('http://localhost:8050/api/v1/auth/register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast({
          title: 'Compte créé avec succès.',
          description: "Vous pouvez maintenant vous connecter.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: 'Erreur de création du compte.',
          description: errorData.message || 'Une erreur est survenue.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Erreur de connexion.',
        description: 'Impossible de contacter le serveur.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Header />
      <Flex minH="100vh">
        <Box w="60%" bg="black" color="white" p={10} display="flex" flexDirection="column" justifyContent="center">
          <VStack spacing={6} align="flex-start">
            <Heading size="2xl">ORANGE ESHOP</Heading>
            <Text fontSize="lg">Créez votre compte maintenant et gagnez du temps pour vos prochaines commandes</Text>
            <Text fontSize="md">
              Vous aurez la possibilité de suivre simplement vos commandes et de bénéficier d’offres exclusives
            </Text>
          </VStack>
        </Box>

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
                <Input type="text" placeholder="Nom" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Prénom</FormLabel>
                <Input type="text" placeholder="Prénom" value={lastname} onChange={(e) => setLastname(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>CIN</FormLabel>
                <Input type="text" placeholder="CIN 8 chiffres" value={cin} onChange={(e) => setCin(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Mot de passe</FormLabel>
                <Input type="password" placeholder="Saisir votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Photo CIN (Recto)</FormLabel>
                <Input type="file" accept="image/*" onChange={handleFileChangeFront} />
              </FormControl>
              <FormControl>
                <FormLabel>Photo CIN (Verso)</FormLabel>
                <Input type="file" accept="image/*" onChange={handleFileChangeBack} />
              </FormControl>
              <Button colorScheme="orange" w="full" onClick={handleSubmit}>Créer un compte</Button>
            </VStack>
          </Container>
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
};

export default SignupForm;
