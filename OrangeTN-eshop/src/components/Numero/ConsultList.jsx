import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import Header from '../Header';
import Footer from '../Footer';
import CardNumber from './CardNumber';

const phoneNumbers = [
  {
    id: 1,
    type: 'SIM',
    number: '12345678',
    activationDate: '2023-01-01',
    pukCode: '12345678',
    pinCode: '1234',
    serialNumber: 'SN1234567890',
  },
  {
    id: 2,
    type: 'eSIM',
    number: '87654321',
    activationDate: '2023-02-01',
    pukCode: '87654321',
    pinCode: '4321',
    imei: 'IMEI123456789012',
    smartphoneType: 'iPhone 13',
  },
  {
    id: 3,
    type: 'SIM',
    number: '11223344',
    activationDate: '2023-03-01',
    pukCode: '11223344',
    pinCode: '5678',
    serialNumber: 'SN0987654321',
  },
  {
    id: 4,
    type: 'eSIM',
    number: '55667788',
    activationDate: '2023-04-01',
    pukCode: '55667788',
    pinCode: '8765',
    imei: 'IMEI098765432109',
    smartphoneType: 'Galaxy S21',
  },
  {
    id: 5,
    type: 'SIM',
    number: '99887766',
    activationDate: '2023-05-01',
    pukCode: '99887766',
    pinCode: '4321',
    serialNumber: 'SN5678901234',
  },
  {
    id: 6,
    type: 'eSIM',
    number: '22334455',
    activationDate: '2023-06-01',
    pukCode: '22334455',
    pinCode: '1234',
    imei: 'IMEI112233445566',
    smartphoneType: 'Galaxy S22',
  },
];

const ConsultList = () => {
  const [filterNumber, setFilterNumber] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredNumbers = phoneNumbers.filter(
    (phone) =>
      (filterNumber === '' || phone.number.includes(filterNumber)) &&
      (filterDate === '' || phone.activationDate.includes(filterDate))
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
            <CardNumber key={phone.id} phone={phone} />
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
