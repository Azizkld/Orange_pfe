import React, { useState, useRef, useEffect } from 'react';
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
  Select,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import Cookies from 'js-cookie'; // Import js-cookie to get the userID from the cookie
import Header from '../Header';
import Footer from '../Footer';

const ConvertSimToEsimForm = ({ onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [imei, setImei] = useState('');
  const [phoneType, setPhoneType] = useState('');
  const [phoneTypes, setPhoneTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get('accessToken'); // Retrieve token from cookies

    // Fetch phone types from the database
    fetch('http://localhost:8050/api/PhoneTYPE/findAllPhoneType', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch phone types');
        }
        return response.json();
      })
      .then((data) => {
        console.log('data'+JSON.stringify(data))
        setPhoneTypes(data.phoneTypes); // Assuming the API returns an array of phone types
      })
      .catch((error) => {
        console.error('Error fetching phone types:', error);
      });
  }, []);

  const handleSimToEsimConversion = () => {
    if (!phoneNumber.trim() || !serialNumber.trim() || !imei.trim() || !phoneType) {
      alert('Tous les champs sont obligatoires.');
      return;
    }

    const userId = Cookies.get('userID'); // Get the userID from cookies
    const token = Cookies.get('accessToken'); // Get the accessToken from cookies

    setIsLoading(true);

    const url = `http://localhost:8050/api/Num/changerSimVersEsim?numPhoneNumber=${phoneNumber}&numSerialNumber=${serialNumber}&numImei=${imei}&phoneTypeId=${phoneType}&utilisateurId=${userId}`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to convert SIM to eSIM');
        }
        return response.json();
      })
      .then((data) => {
        console.log('SIM converted to eSIM successfully:', data);
        onSubmit(); // Trigger the success dialog
      })
      .catch((error) => {
        console.error('Error converting SIM to eSIM:', error);
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
        <FormLabel>Numéro de série</FormLabel>
        <Input
          placeholder="Entrez votre numéro de série"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
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
      <FormControl isRequired>
        <FormLabel>Type de smartphone</FormLabel>
        <Select
          placeholder="Sélectionnez votre smartphone"
          value={phoneType}
          onChange={(e) => setPhoneType(e.target.value)}
        >
          {phoneTypes.map((type) => (
            <option key={type.phid} value={type.phid}>
              {type.phName}
            </option>
          ))}
        </Select>
      </FormControl>
      <Button
        colorScheme="orange"
        onClick={handleSimToEsimConversion}
        isLoading={isLoading}
      >
        Soumettre
      </Button>
    </VStack>
  );
};

const ConvertSimToEsim = () => {
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
          <ConvertSimToEsimForm onSubmit={handleSubmit} />
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
              La conversion du SIM vers eSIM a été réalisée avec succès.
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

export default ConvertSimToEsim;
