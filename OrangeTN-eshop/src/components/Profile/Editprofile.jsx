import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
  VStack,
  IconButton,
  useToast,
  InputGroup,
  InputRightElement,
  Center,
} from '@chakra-ui/react';
import { FaCamera, FaTimesCircle } from 'react-icons/fa';
import Header from '../Header';
import Footer from '../Footer';

const EditProfile = () => {
  const [nom] = useState('John'); // Nom initial non modifiable
  const [prenom] = useState('Doe'); // Prénom initial non modifiable
  const [cin] = useState('12345678'); // CIN initial non modifiable
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState(''); // Nouveau champ pour le mot de passe actuel
  const [ville, setVille] = useState('');
  const [pays, setPays] = useState('');
  const [adresse, setAdresse] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const toast = useToast();

  const handleSave = () => {
    const fieldsModified = email || password || ville || pays || adresse || codePostal;

    if (!fieldsModified) {
      toast({
        title: 'Aucune modification',
        description: 'Aucune modification n\'a été effectuée.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!currentPassword) {
      toast({
        title: 'Erreur de saisie',
        description: 'Veuillez entrer votre mot de passe actuel pour confirmer les modifications.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (email && !email.includes('@')) {
      toast({
        title: 'Erreur de saisie',
        description: 'Veuillez entrer une adresse email valide.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (codePostal && (codePostal.length !== 4 || isNaN(codePostal))) {
      toast({
        title: 'Erreur de saisie',
        description: 'Le code postal doit être composé de 4 chiffres.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: 'Profil sauvegardé',
      description: 'Vos modifications ont été enregistrées avec succès.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <Header />
      <Container maxW="container.xl" p={4}>
        <Flex
          bg="white"
          boxShadow="md"
          borderRadius="md"
          p={6}
          direction={{ base: 'column', md: 'row' }}
        >
          <VStack
            align="center"
            spacing={4}
            w={{ base: '100%', md: '20%' }}
            p={4}
            borderRight={{ base: 'none', md: '1px solid #e2e8f0' }}
            position="relative"
          >
            <Box position="relative">
              <Avatar size="2xl" name={`${nom} ${prenom}`} src="https://bit.ly/broken-link" />
              <IconButton
                icon={<FaCamera />}
                position="absolute"
                bottom="0"
                right="0"
                colorScheme="orange"
                aria-label="Update profile picture"
                borderRadius="full"
                size="sm"
                onClick={() => document.getElementById('imageUpload').click()}
              />
            </Box>
            <Input
              type="file"
              accept="image/*"
              id="imageUpload"
              display="none"
            />
          </VStack>

          <VStack align="stretch" spacing={4} w={{ base: '100%', md: '80%' }} p={4}>
            <Text fontSize="xl" fontWeight="bold">Modifier votre profil</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {/* Champs non modifiables avec fond rouge et icône "X" */}
              <FormControl>
                <FormLabel>Nom</FormLabel>
                <InputGroup>
                  <Input value={nom} isReadOnly bg="red.100" />
                  <InputRightElement>
                    <FaTimesCircle color="red" />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Prénom</FormLabel>
                <InputGroup>
                  <Input value={prenom} isReadOnly bg="red.100" />
                  <InputRightElement>
                    <FaTimesCircle color="red" />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>CIN</FormLabel>
                <InputGroup>
                  <Input value={cin} isReadOnly bg="red.100" />
                  <InputRightElement>
                    <FaTimesCircle color="red" />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* Champs modifiables */}
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input placeholder="Entrez votre email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Nouveau mot de passe</FormLabel>
                <Input placeholder="Entrez votre mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Ville</FormLabel>
                <Input placeholder="Entrez votre ville" value={ville} onChange={(e) => setVille(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Pays</FormLabel>
                <Input placeholder="Entrez votre pays" value={pays} onChange={(e) => setPays(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Adresse</FormLabel>
                <Input placeholder="Entrez votre adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Code postal</FormLabel>
                <Input placeholder="Entrez votre code postal" value={codePostal} onChange={(e) => setCodePostal(e.target.value)} />
              </FormControl>
            </SimpleGrid>

            {/* Champ Mot de passe actuel au centre sous les autres champs */}
            <Center w="full">
              <FormControl maxW={{ base: 'full', md: '50%' }} mt={4}>
                <FormLabel>Mot de passe actuel</FormLabel>
                <Input
                  placeholder="Entrez votre mot de passe actuel"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </FormControl>
            </Center>

            <Button mt={6} colorScheme="orange" alignSelf="flex-start" onClick={handleSave}>
              Sauvegarder
            </Button>
          </VStack>
        </Flex>
      </Container>
      <Footer />
    </Box>
  );
};

export default EditProfile;
