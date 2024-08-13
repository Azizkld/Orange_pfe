import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Container,
  Text,
  Button,
  HStack,
} from '@chakra-ui/react';
import Header from '../Header';
import Footer from '../Footer';
import ContratCard from './ContratCard';
import PdfGenerated from './PdfGenerated';

const contrats = [
  { id: 1, code: 'C001', status: 'actif', activationDate: '2023-01-01', expirationDate: '2024-01-01', numero: '12345678', typeNumero: 'SIM', offreName: 'Offre 100 Go' },
  { id: 2, code: 'C002', status: 'expiré', activationDate: '2022-01-01', expirationDate: '2023-01-01', numero: '87654321', typeNumero: 'eSIM', offreName: 'Offre 75 Go' },
  { id: 3, code: 'C003', status: 'actif', activationDate: '2023-02-01', expirationDate: '2024-02-01', numero: '11223344', typeNumero: 'SIM', offreName: 'Offre 55 Go' },
  { id: 4, code: 'C004', status: 'expiré', activationDate: '2022-02-01', expirationDate: '2023-02-01', numero: '55667788', typeNumero: 'eSIM', offreName: 'Offre 30 Go' },
  { id: 5, code: 'C005', status: 'actif', activationDate: '2023-03-01', expirationDate: '2024-03-01', numero: '99887766', typeNumero: 'SIM', offreName: 'Offre 25 Go' },
  { id: 6, code: 'C006', status: 'expiré', activationDate: '2022-03-01', expirationDate: '2023-03-01', numero: '22334455', typeNumero: 'eSIM', offreName: 'Offre 20 Go' },
  { id: 7, code: 'C007', status: 'actif', activationDate: '2023-04-01', expirationDate: '2024-04-01', numero: '33445566', typeNumero: 'SIM', offreName: 'Offre 15 Go' },
  { id: 8, code: 'C008', status: 'expiré', activationDate: '2022-04-01', expirationDate: '2023-04-01', numero: '44556677', typeNumero: 'eSIM', offreName: 'Offre 10 Go' },
  { id: 9, code: 'C009', status: 'actif', activationDate: '2023-05-01', expirationDate: '2024-05-01', numero: '55667788', typeNumero: 'SIM', offreName: 'Offre 5 Go' },
];

const itemsPerPage = 5;

const ContratList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContrat, setSelectedContrat] = useState(null);

  const totalPages = Math.ceil(contrats.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contrats.slice(indexOfFirstItem, indexOfLastItem);

  const handleGeneratePDF = (contrat) => {
    setSelectedContrat(contrat);
  };

  return (
    <Box bg="gray.50" minH="100vh">
      <Header />
      <Container maxW="container.lg" py={10}>
        <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
          Liste des Contrats
        </Text>
        {selectedContrat ? (
          <PdfGenerated contrat={selectedContrat} />
        ) : (
          <>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {currentItems.map((contrat) => (
                <ContratCard key={contrat.id} contrat={contrat} onGeneratePDF={handleGeneratePDF} />
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
          </>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default ContratList;
