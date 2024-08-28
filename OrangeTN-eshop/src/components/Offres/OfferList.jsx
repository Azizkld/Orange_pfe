import React, { useState, useEffect } from 'react';
import {
  Box,
  SimpleGrid,
  Container,
  Text,
  HStack,
  Button,
  Tabs,
  TabPanel,
  TabPanels,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import Header from '../Header';
import Footer from '../Footer';
import CardOffer from './CardOffer';
import PaymentForm from '../Paiement/PaymentForm';
import Cookies from 'js-cookie';

const OfferList = () => {
  const [offers, setOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState(0); // Gérer l'onglet actif
  const [isModalOpen, setIsModalOpen] = useState(false); // Gérer l'état ouvert du modal
  const [phoneNumber, setPhoneNumber] = useState(''); // Gérer l'entrée du numéro de téléphone
  const [selectedOfferId, setSelectedOfferId] = useState(null); // ID de l'offre sélectionnée
  const toast = useToast();

  const itemsPerPage = 5;

  useEffect(() => {
    const token = Cookies.get('accessToken'); // Récupérer le token des cookies

    fetch('http://localhost:8050/api/RatePlan/afficherTousOffres', {
      headers: {
        'Authorization': `Bearer ${token}`, // Inclure le token Bearer dans l'en-tête Authorization
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccessfull && data.rateplans) {
          // Mapper la réponse de l'API pour inclure uniquement les champs pertinents
          const formattedOffers = data.rateplans.map((offer) => ({
            rp_id: offer.id, // Assurez-vous d'avoir un champ ID pour l'offre
            rp_name: offer.rpName,
            rp_desc: offer.rpDesc,
            rp_price: offer.rpPrice,
            rp_validation_jours: offer.rpValidationDays,
          }));
          setOffers(formattedOffers);
        } else {
          toast({
            title: 'Erreur',
            description: 'Impossible de récupérer les offres.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des offres:', error);
        toast({
          title: 'Erreur',
          description: 'Impossible de récupérer les offres.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  }, [toast]);

  const totalPages = Math.ceil(offers.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleAcheterClick = (offerId) => {
    setSelectedOfferId(offerId); // Définir l'ID de l'offre sélectionnée
    setIsModalOpen(true); // Ouvrir le modal pour saisir le numéro de téléphone
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirmPhoneNumber = () => {
    if (phoneNumber.trim() === '') {
      toast({
        title: 'Erreur',
        description: 'Le numéro de téléphone est requis.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const userId = Cookies.get('userID'); // Récupérer l'ID de l'utilisateur connecté
console.log('idut'+userId)
console.log('selectedOfferId'+selectedOfferId)

console.log('phoneNumber'+phoneNumber)

    // Envoyer la requête POST pour ajouter le contrat
    fetch('http://localhost:8050/api/v1/Contract/ajouterContract', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
      },
      body: JSON.stringify({
        utilisateurId: userId,
        rateplanId: selectedOfferId,
        numPhoneNumber: phoneNumber,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de l\'ajout du contrat');
        }
        return response.json();
      })
      .then(data => {
        console.log('Contrat ajouté avec succès:', data);
        toast({
          title: 'Succès',
          description: 'Le contrat a été ajouté avec succès.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setActiveTab(1); // Passer à l'interface de paiement après confirmation
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du contrat:', error);
        toast({
          title: 'Erreur',
          description: 'Impossible d\'ajouter le contrat.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });

    setIsModalOpen(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = offers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box bg="gray.50" minH="100vh">
      <Header />
      <Container maxW="container.lg" py={10}>
        <Tabs index={activeTab} onChange={setActiveTab}>
          <TabPanels>
            <TabPanel>
              <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
                Nos Offres
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {currentItems.map((offer, index) => (
                  <CardOffer key={index} offer={offer} onAcheterClick={() => handleAcheterClick(offer.rp_id)} />
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
              <PaymentForm onBack={() => setActiveTab(0)} onPay={() => toast({
                title: 'Paiement effectué',
                description: 'Votre paiement a été réalisé avec succès.',
                status: 'success',
                duration: 3000,
                isClosable: true,
              })} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <Footer />

      {/* Modal pour entrer le numéro de téléphone */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Entrez votre numéro de téléphone</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Numéro de téléphone</FormLabel>
              <Input
                placeholder="Entrez votre numéro de téléphone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="orange" onClick={handleConfirmPhoneNumber}>
              Confirmer
            </Button>
            <Button variant="ghost" onClick={handleModalClose} ml={3}>
              Annuler
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default OfferList;
