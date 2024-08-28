import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import Cookies from 'js-cookie'; // Import js-cookie to get the userID from the cookie
import Header from '../Header';
import Footer from '../Footer';

const ConvertEsimToSimForm = ({ onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [imei, setImei] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEsimToSimConversion = () => {
    if (!phoneNumber.trim() || !imei.trim()) {
      alert('Les champs "Numéro" et "IMEI" sont obligatoires.');
      return;
    }

    const userId = Cookies.get('userID'); // Get the userID from cookies
    const token = Cookies.get('accessToken'); // Get the accessToken from cookies

    setIsLoading(true);

    const url = `http://localhost:8050/api/Num/changerEsimVersSim?numPhoneNumber=${phoneNumber}&numImei=${imei}&utilisateurId=${userId}`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to convert eSIM to SIM');
        }
        return response.json();
      })
      .then((data) => {
        console.log('eSIM converted to SIM successfully:', data);
        onSubmit(); // Trigger the success dialog
      })
      .catch((error) => {
        console.error('Error converting eSIM to SIM:', error);
        // Optionally, you can show an error toast here
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl isRequired>
        <FormLabel>Numéro</FormLabel>
        <Input
          placeholder="Entrez votre numéro"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>IMEI</FormLabel>
        <Input
          placeholder="Entrez votre IMEI"
          value={imei}
          onChange={(e) => setImei(e.target.value)}
        />
      </FormControl>
      <Button
        colorScheme="orange"
        onClick={handleEsimToSimConversion}
        isLoading={isLoading}
      >
        Soumettre
      </Button>
    </VStack>
  );
};

const ConvertEsimToSim = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleSubmit = () => {
    onOpen();
  };

  return (
    <Box>
      <Header />
      <Container maxW="container.lg" p={4}>
        <Box p={6} boxShadow="md" bg="white" borderRadius="md">
          <ConvertEsimToSimForm onSubmit={handleSubmit} />
        </Box>
      </Container>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold" display="flex" alignItems="center">
              <CheckCircleIcon color="green.500" mr={2} />
              Succès !
            </AlertDialogHeader>
            <AlertDialogBody>
              Veuillez consulter la boutique Orange près de vous pour récupérer votre SIM.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="orange" onClick={onClose}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Footer />
    </Box>
  );
};

export default ConvertEsimToSim;
