import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Container,
  Text,
  Button,
  HStack,
  Tabs,
  TabPanels,
  TabPanel,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Image,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import Header from '../Header';
import Footer from '../Footer';
import CardOffer from './CardOffer';
import visaImage from '../../images/visa.png';

const offers = [
  { id: 1, nom: 'Offre 100 Go', desc: 'Description de l\'offre 100 Go', prix: 72, service_name: ['SMS Illimités', 'Appels Illimités', 'Internet 100 Go'], duree_expiration: 60 },
  { id: 2, nom: 'Offre 75 Go', desc: 'Description de l\'offre 75 Go', prix: 60, service_name: ['SMS Illimités', 'Appels 500 minutes'], duree_expiration: 60 },
  { id: 3, nom: 'Offre 55 Go', desc: 'Description de l\'offre 55 Go', prix: 55, service_name: ['Appels Illimités', 'SMS Illimités'], duree_expiration: 30 },
  { id: 4, nom: 'Offre 30 Go', desc: 'Description de l\'offre 30 Go', prix: 30, service_name: ['SMS Illimités','Appels Illimités'], duree_expiration: 30 },
  { id: 5, nom: 'Offre 25 Go', desc: 'Description de l\'offre 25 Go', prix: 22.5, service_name: ['SMS Illimités'], duree_expiration: 30 },
  { id: 6, nom: 'Offre 20 Go', desc: 'Description de l\'offre 20 Go', prix: 18, service_name: ['SMS Illimités'], duree_expiration: 30 },
  { id: 7, nom: 'Offre 15 Go', desc: 'Description de l\'offre 15 Go', prix: 15, service_name: ['SMS Illimités'], duree_expiration: 30 },
  { id: 8, nom: 'Offre 10 Go', desc: 'Description de l\'offre 10 Go', prix: 10, service_name: ['SMS Illimités'], duree_expiration: 30 },
  { id: 9, nom: 'Offre 5 Go', desc: 'Description de l\'offre 5 Go', prix: 5, service_name: ['SMS Illimités'], duree_expiration: 30 },
];

const itemsPerPage = 5;

const PaymentForm = ({ onBack }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleConfirmPayment = () => {
    toast({
      title: 'Paiement réussi',
      description: 'Votre paiement a été effectué avec succès.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose(); // Close the confirmation modal after success
  };

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="2xl" fontWeight="bold">Détails de paiement</Text>
      <FormControl>
        <FormLabel>Nom sur la carte</FormLabel>
        <Input placeholder="Aziz Khaled" />
      </FormControl>
      <FormControl>
        <FormLabel>Numéro de carte</FormLabel>
        <Input placeholder="16 chiffres" />
      </FormControl>
      <SimpleGrid columns={2} spacing={4}>
        <FormControl>
          <FormLabel>Valide jusqu'au</FormLabel>
          <Input placeholder="02/22" />
        </FormControl>
        <FormControl>
          <FormLabel>CVV</FormLabel>
          <Input placeholder="123" />
        </FormControl>
      </SimpleGrid>
      <Button colorScheme="orange" w="full" onClick={onOpen}>PAYER</Button>
      <Button variant="outline" onClick={onBack}>Retour aux offres</Button>

      {/* Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmer le paiement</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Êtes-vous sûr de vouloir effectuer ce paiement ?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" onClick={handleConfirmPayment}>
              Confirmer
            </Button>
            <Button variant="ghost" onClick={onClose} ml={3}>
              Annuler
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

const OfferList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [phoneNumber, setPhoneNumber] = useState('');
  const toast = useToast();

  const totalPages = Math.ceil(offers.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = offers.slice(indexOfFirstItem, indexOfLastItem);

  const handleAcheterClick = () => {
    onOpen();
  };

  const handleSubmitPhoneNumber = () => {
    if (phoneNumber.trim() === '') {
      toast({
        title: 'Erreur',
        description: 'Le numéro de téléphone ne peut pas être vide.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    toast({
      title: 'Numéro soumis',
      description: `Votre numéro ${phoneNumber} a été soumis avec succès.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setTabIndex(1);
    onClose();
  };

  const handleBackToOffers = () => {
    setTabIndex(0);
  };

  return (
    <Box bg="gray.50" minH="100vh">
      <Header />
      <Container maxW="container.lg" py={10}>
        <Tabs index={tabIndex} onChange={setTabIndex} variant="enclosed">
          <TabPanels>
            <TabPanel>
              <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
                Nos Offres
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {currentItems.map((offer) => (
                  <CardOffer key={offer.id} offer={offer} onAcheterClick={handleAcheterClick} />
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
            </TabPanel>
            <TabPanel>
              <Box mt={6} p={6} boxShadow="md" bg="white" borderRadius="md">
                <HStack mb={4} spacing={4}>
                  <Box flex="1">
                    <Image src={visaImage} alt="Card" />
                  </Box>
                  <Box flex="2">
                    <PaymentForm onBack={handleBackToOffers} />
                  </Box>
                </HStack>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Modal for entering phone number */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Entrez votre numéro de téléphone</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Numéro de téléphone</FormLabel>
                <Input
                  placeholder="Entrez votre numéro"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="orange" onClick={handleSubmitPhoneNumber}>
                Soumettre
              </Button>
              <Button variant="ghost" onClick={onClose} ml={3}>
                Annuler
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
      <Footer />
    </Box>
  );
};

export default OfferList;
