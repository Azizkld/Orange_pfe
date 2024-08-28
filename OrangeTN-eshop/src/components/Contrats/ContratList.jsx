import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Container,
  Text,
  Button,
  HStack,
  useToast,
} from '@chakra-ui/react';
import Header from '../Header';
import Footer from '../Footer';
import ContratCard from './ContratCard';
import PdfGenerated from './PdfGenerated';
import Cookies from 'js-cookie';

const itemsPerPage = 5;

const ContratList = () => {
  const [contrats, setContrats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContrat, setSelectedContrat] = useState(null);
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

    // Fetch the contracts based on the user's ID
    fetch(`http://localhost:8050/api/v1/Contract/findAllContractById/${userID}`, {
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
        if (data.isSuccessfull && Array.isArray(data.contracts)) {
          setContrats(data.contracts.map(contract => ({
            id: contract.id,
            code: contract.coCode,
            status: contract.coStatus ? 'actif' : 'expiré',
            activationDate: contract.coActivDate,
            expirationDate: contract.coExpirDate,
            numero: contract.num.numPhoneNumber,
            typeNumero: contract.num.numType,
            offreName: contract.rateplan.rpName,
          })));
        } else {
          toast({
            title: 'Erreur',
            description: 'Impossible de récupérer les contrats.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des contrats:', error);
        toast({
          title: 'Erreur',
          description: 'Erreur lors de la récupération des contrats.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  }, [toast]);

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
