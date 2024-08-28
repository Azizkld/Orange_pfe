import React, { useState, useEffect } from 'react';
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
  Center,
} from '@chakra-ui/react';
import { FaCamera } from 'react-icons/fa';
import Cookies from 'js-cookie'; // Import js-cookie to get the userID from the cookie
import Header from '../Header';
import Footer from '../Footer';
import { useParams } from 'react-router-dom';

const EditProfile = () => {
  const { userID } = useParams(); // Get the userID from the URL
  const [nom, setNom] = useState(''); // Nom initial
  const [prenom, setPrenom] = useState(''); // Prénom initial
  const [cin, setCin] = useState(''); // CIN initial
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState(''); // Nouveau champ pour le mot de passe actuel
  const [ville, setVille] = useState('');
  const [pays, setPays] = useState('');
  const [adresse, setAdresse] = useState('');
  const [image, setImage] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // New state for selected image
  const toast = useToast();
const fetchData = (id,token)=>{
  if (!id) {
    toast({
      title: 'Erreur',
      description: 'Utilisateur non identifié.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
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
        setNom(data.utilisateurAll.utFName);
        setPrenom(data.utilisateurAll.utLName);
        setCin(data.utilisateurAll.utCin);
        setEmail(data.utilisateurAll.utMail);
        setVille(data.utilisateurAll.utCity);
        setPays(data.utilisateurAll.utCountry);
        setAdresse(data.utilisateurAll.utAdresse);
        setImage(data.utilisateurAll.utImage);
        Cookies.set('image', data.utilisateurAll.utImage, { expires: 22222 });

        setCodePostal(data.utilisateurAll.utZipCode.toString());
      }
    })
    
    
}
  useEffect(() => {
    const id = userID || Cookies.get('userID');
    const token = Cookies.get('accessToken'); // Retrieve token from cookies
fetchData(id,token)
   
  }, [userID, toast]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = async () => {
    const fieldsModified = email || password || ville || pays || adresse || codePostal || selectedImage;

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

    const token = Cookies.get('accessToken'); // Retrieve token from cookies

    // Handle image upload if a new image was selected
    if (selectedImage) {
      const formData = new FormData();
      formData.append('file', selectedImage);
      formData.append('id', userID);

      try {
        const token2 = Cookies.get('accessToken'); // Retrieve token from cookies

        const response = await fetch('http://localhost:8050/api/UtilisateurAll/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token2}`,
          },
          body: formData,
          
        });


        if (!response.ok) {

          throw new Error('Image upload failed');
        }
        const id = userID || Cookies.get('userID');
    const token = Cookies.get('accessToken'); // Retrieve token from cookies
fetchData(id,token)
        //const imageData = await response.json();
        //setImage(imageData.fileName); // Update image state with the new image name
      } catch (error) {
        console.error('Erreur lors du téléchargement de l\'image:', error);
       
        return;
      }
    }

    // Prepare the data to be sent in the API request
    const updatedData = {
      utAdresse: adresse,
      utCity: ville,
      utCountry: pays,
      utMail: email,
      utPassword: password || currentPassword,
      currentPassword: currentPassword,
      utZipCode: parseInt(codePostal, 10),
      utImage: image,
    };

    try {
      const response = await fetch(`http://localhost:8050/api/UtilisateurAll/modifierUtilisateurId?id=${userID}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      const data = await response.json();

      if (data.successfull) {
        toast({
          title: 'Profil sauvegardé',
          description: 'Vos modifications ont été enregistrées avec succès.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        // Optionally, update the state with the new data
        setNom(data.utilisateurAll.utFName);
        setPrenom(data.utilisateurAll.utLName);
        setCin(data.utilisateurAll.utCin);
        setEmail(data.utilisateurAll.utMail);
        setVille(data.utilisateurAll.utCity);
        setPays(data.utilisateurAll.utCountry);
        setAdresse(data.utilisateurAll.utAdresse);
        setCodePostal(data.utilisateurAll.utZipCode.toString());
      } else {
        throw new Error('Update was not successful');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données utilisateur:', error);
      toast({
        title: 'Erreur de mise à jour',
        description: 'Impossible de sauvegarder les informations utilisateur.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
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
              <Avatar size="2xl" src={`/${image}`} />
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
              onChange={handleImageChange}
            />
          </VStack>

          <VStack align="stretch" spacing={4} w={{ base: '100%', md: '80%' }} p={4}>
            <Text fontSize="xl" fontWeight="bold">Modifier votre profil</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormControl>
                <FormLabel>Nom</FormLabel>
                <InputGroup>
                  <Input value={nom} isReadOnly bg="gray.100" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Prénom</FormLabel>
                <InputGroup>
                  <Input value={prenom} isReadOnly bg="gray.100" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>CIN</FormLabel>
                <InputGroup>
                  <Input value={cin} isReadOnly bg="gray.100" />
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
