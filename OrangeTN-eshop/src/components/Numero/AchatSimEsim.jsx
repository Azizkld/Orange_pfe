import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
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
import Header from '../Header';
import Footer from '../Footer';
import Cookies from 'js-cookie'; // Import js-cookie to get the userID from the cookie

const SimForm = ({ onSuccess }) => {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSimPurchase = () => {
    if (!address.trim()) {  // Check if the address is empty or contains only spaces
      alert('Le champ "Adresse actuelle" est obligatoire.');
      return;
    }

    const userId = Cookies.get('userID'); // Get the userID from cookies
    const token = Cookies.get('accessToken'); // Get the accessToken from cookies

    setIsLoading(true); // Set loading state

    fetch(`http://localhost:8050/api/Num/acheterSim?utilisateurId=${userId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address }), // Sending the address in the request body
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to purchase SIM');
        }
        return response.json();
      })
      .then((data) => {
        console.log('SIM purchased successfully:', data);
        onSuccess('sim'); // Show success message for SIM
      })
      .catch((error) => {
        console.error('Error purchasing SIM:', error);
        // Optionally, you can show an error toast here
      })
      .finally(() => {
        setIsLoading(false); // Reset loading state
      });
  };

  return (
    <VStack spacing={4} align="stretch">
      <Text color="green.500" fontWeight="bold">
        L'achat de cette SIM est gratuit.
      </Text>
      <FormControl isRequired>
        <FormLabel>Adresse actuelle</FormLabel>
        <Input
          placeholder="Entrez votre adresse actuelle"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </FormControl>
      <Button
        colorScheme="orange"
        onClick={handleSimPurchase}
        isLoading={isLoading}
      >
        Acheter
      </Button>
    </VStack>
  );
};

const EsimForm = ({ onSuccess }) => {
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
        console.log('data' + JSON.stringify(data));
        setPhoneTypes(data.phoneTypes); // Assuming the API returns an array of phone types
      })
      .catch((error) => {
        console.error('Error fetching phone types:', error);
      });
  }, []);

  const handleEsimPurchase = () => {
    if (!imei.trim() || !phoneType) {  // Check if the IMEI and phone type are selected
      alert('Les champs IMEI et Type de smartphone sont obligatoires.');
      return;
    }

    const userId = Cookies.get('userID'); // Get the userID from cookies
    const token = Cookies.get('accessToken'); // Get the accessToken from cookies

    setIsLoading(true); // Set loading state

    fetch(`http://localhost:8050/api/Num/acheterEsim?utilisateurId=${userId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'numImei': imei, 'phoneTypeId': phoneType }), // Sending the IMEI and phoneType in the request body
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to purchase eSIM');
        }
        return response.json();
      })
      .then((data) => {
        console.log('eSIM purchased successfully:', data);
        onSuccess('esim'); // Show success message for eSIM
      })
      .catch((error) => {
        console.error('Error purchasing eSIM:', error);
        // Optionally, you can show an error toast here
      })
      .finally(() => {
        setIsLoading(false); // Reset loading state
      });
  };

  return (
    <VStack spacing={4} align="stretch">
      <Text color="green.500" fontWeight="bold">
        L'achat de cette eSIM est gratuit.
      </Text>
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
        onClick={handleEsimPurchase}
        isLoading={isLoading}
      >
        Acheter
      </Button>
    </VStack>
  );
};

const AcheterNumero = () => {
  const [formType, setFormType] = useState('sim');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [successMessage, setSuccessMessage] = useState('');
  const cancelRef = useRef();

  const handleSuccess = (type) => {
    if (type === 'sim') {
      setSuccessMessage(
        "Votre achat a été effectué avec succès. Veuillez visiter la boutique Orange la plus proche de votre adresse pour récupérer votre SIM."
      );
    } else if (type === 'esim') {
      setSuccessMessage(
        "Votre achat eSIM a été effectué avec succès. Votre numéro eSIM sera activé et prêt à être utilisé dans les 24 heures."
      );
    }
    onOpen(); // Show the success dialog
  };

  return (
    <Box>
      <Header />
      <Container maxW="container.lg" p={4}>
        <Tabs variant="enclosed">
          <TabList>
            <Tab onClick={() => setFormType('sim')}>SIM</Tab>
            <Tab onClick={() => setFormType('esim')}>eSIM</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box p={6} boxShadow="md" bg="white" borderRadius="md">
                <SimForm onSuccess={handleSuccess} />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box p={6} boxShadow="md" bg="white" borderRadius="md">
                <EsimForm onSuccess={handleSuccess} />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
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
              Achat Réussi
            </AlertDialogHeader>
            <AlertDialogBody>
              {successMessage}
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

export default AcheterNumero;
