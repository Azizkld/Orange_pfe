import React, { useState, useEffect } from 'react';
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
  useToast,
} from '@chakra-ui/react';
import Header from '../Header';
import Footer from '../Footer';
import CardNumber from './CardNumber';
import Cookies from 'js-cookie';

const ConsultList = () => {
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [filterNumber, setFilterNumber] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const toast = useToast();

  useEffect(() => {
    const token = Cookies.get('accessToken'); // Get the token from cookies
    const userID = Cookies.get('userID'); // Get the userID from cookies

    if (!token || !userID) {
      toast({
        title: 'Erreur',
        description: 'Utilisateur non authentifié.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Fetch the phone numbers based on the user's ID
    fetch(`http://localhost:8050/api/Num/findAllNumById?utilisateurId=${userID}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.isSuccessfull && Array.isArray(data.nums)) {
          setPhoneNumbers(data.nums);
        } else {
          toast({
            title: 'Erreur',
            description: 'Impossible de récupérer les numéros.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des numéros:', error);
        toast({
          title: 'Erreur',
          description: 'Erreur lors de la récupération des numéros.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  }, [toast]);

  const filteredNumbers = phoneNumbers.filter(
    (phone) =>
      (filterNumber === '' || phone.numPhoneNumber.toString().includes(filterNumber)) &&
      (filterDate === '' || phone.numActivationDate.includes(filterDate))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNumbers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredNumbers.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <Box bg="gray.50" minH="100vh">
      <Header />
      <Container maxW="container.lg" py={10}>
        <Box mb={6}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Consulter la liste des numéros
          </Text>
          <HStack spacing={4}>
            <FormControl>
              <FormLabel>Filtrer par numéro</FormLabel>
              <Input
                placeholder="Entrez le numéro"
                value={filterNumber}
                onChange={(e) => setFilterNumber(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Filtrer par date d'activation</FormLabel>
              <Input
                placeholder="Entrez la date d'activation"
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </FormControl>
          </HStack>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {currentItems.map((phone) => (
            <CardNumber key={phone.numid} phone={phone} />
          ))}
        </SimpleGrid>
        <HStack justifyContent="center" mt={6}>
          <Button onClick={handlePreviousPage} isDisabled={currentPage === 1}>
            Précédent
          </Button>
          <Text mx={4}>
            Page {currentPage} sur {totalPages}
          </Text>
          <Button onClick={handleNextPage} isDisabled={currentPage === totalPages}>
            Suivant
          </Button>
        </HStack>
      </Container>
      <Footer />
    </Box>
  );
};

export default ConsultList;
