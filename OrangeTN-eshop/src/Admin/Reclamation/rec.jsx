import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Input,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
  IconButton,
  Textarea,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaTrash, FaReply } from 'react-icons/fa';
import Cookies from 'js-cookie';

const GestionReclamations = () => {
  const [activeReclamations, setActiveReclamations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [showMore, setShowMore] = useState({});
  const [selectedReclamation, setSelectedReclamation] = useState(null);
  const [response, setResponse] = useState('');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isReplyOpen, onOpen: onReplyOpen, onClose: onReplyClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  useEffect(() => {
    const fetchReclamations = async () => {
      try {
        const token = Cookies.get('accessToken'); // Get the token from cookies

        if (!token) {
          throw new Error('Token manquant. Veuillez vous reconnecter.');
        }

        const response = await fetch('http://localhost:8050/api/claim/afficherListReclamation', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Send token in headers
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des réclamations.');
        }

        const data = await response.json();

        if (data.isSuccessfull && data.claims) {
          setActiveReclamations(data.claims);
        } else {
          throw new Error(data.message || "Aucune réclamation trouvée.");
        }
      } catch (error) {
        console.error('Erreur:', error.message); // Log the error message
        toast({
          title: 'Erreur',
          description: error.message || "Impossible de charger les réclamations.",
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchReclamations();
  }, [toast]);

  const handleDeleteReclamation = async () => {
    try {
      const token = Cookies.get('accessToken'); // Get the token from cookies

      if (!token) {
        throw new Error('Token manquant. Veuillez vous reconnecter.');
      }

      const response = await fetch(`http://localhost:8050/api/claim/supprimerReclamationId?clId=${selectedReclamation.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Send token in headers
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la réclamation.');
      }

      setActiveReclamations(activeReclamations.filter(reclamation => reclamation.id !== selectedReclamation.id));
      toast({
        title: "Réclamation supprimée.",
        description: "La réclamation a été supprimée avec succès.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onDeleteClose(); // Close the delete confirmation modal
    } catch (error) {
      console.error('Erreur:', error.message); // Log the error message
      toast({
        title: 'Erreur',
        description: error.message || "Impossible de supprimer la réclamation.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleShowMoreToggle = (id) => {
    setShowMore((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleOpenDeleteModal = (reclamation) => {
    setSelectedReclamation(reclamation);
    onDeleteOpen(); // Open the delete confirmation modal
  };

  const handleOpenReplyModal = (reclamation) => {
    setSelectedReclamation(reclamation);
    onReplyOpen();
  };

  const handleSendResponse = async () => {
    if (response.trim() === '') {
      toast({
        title: "Erreur",
        description: "Le message ne peut pas être vide.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const token = Cookies.get('accessToken'); // Get the token from cookies

      if (!token) {
        throw new Error('Token manquant. Veuillez vous reconnecter.');
      }

      const res = await fetch(`http://localhost:8050/api/claim/repondreReclamation/${selectedReclamation.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clReponce: response
        })
      });

      if (!res.ok) {
        throw new Error('Erreur lors de l\'envoi de la réponse.');
      }

      setActiveReclamations(activeReclamations.filter(reclamation => reclamation.id !== selectedReclamation.id));

      onReplyClose();
      toast({
        title: "Réclamation résolue.",
        description: "La réclamation a été marquée comme résolue.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Erreur:', error.message);
      toast({
        title: 'Erreur',
        description: error.message || "Erreur lors de l'envoi de la réponse.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const filteredReclamations = activeReclamations.filter(reclamation => {
    return (
      (filterDate === "" || reclamation.date === filterDate) &&
      (reclamation.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       reclamation.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const bg = useColorModeValue('white', 'gray.800');
  const boxShadow = useColorModeValue('sm', 'sm-dark');

  return (
    <Box p={4}>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Réclamations Actives</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HStack spacing={4} mb={6}>
              <Input
                placeholder="Rechercher par nom..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Input
                type="date"
                placeholder="Filtrer par date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                w="200px"
              />
            </HStack>
            <Box bg={bg} boxShadow={boxShadow} borderRadius="md" overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Date</Th>
                    <Th>Description</Th>
                    <Th>Nom</Th>
                    <Th>Prénom</Th>
                    <Th>CIN</Th>
                    <Th>Statut</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredReclamations.map(reclamation => (
                    <Tr key={reclamation.id}>
                      <Td>{reclamation.date}</Td>
                      <Td>
                        {showMore[reclamation.id] || reclamation.description.length <= 30
                          ? reclamation.description
                          : `${reclamation.description.substring(0, 30)}...`}
                        {reclamation.description.length > 30 && (
                          <Button
                            variant="link"
                            colorScheme="orange"
                            size="sm"
                            onClick={() => handleShowMoreToggle(reclamation.id)}
                          >
                            {showMore[reclamation.id] ? "Afficher moins" : "Afficher plus"}
                          </Button>
                        )}
                      </Td>
                      <Td>{reclamation.user.firstName}</Td>
                      <Td>{reclamation.user.lastName}</Td>
                      <Td>{reclamation.user.cin}</Td>
                      <Td>
                        <Tag colorScheme={reclamation.status === false ? "orange" : "green"}>
                          {reclamation.status === false ? "En attente" : "Résolu"}
                        </Tag>
                      </Td>
                      <Td>
                        <HStack>
                          <IconButton
                            icon={<FaReply />}
                            colorScheme="blue"
                            aria-label="Reply to reclamation"
                            onClick={() => handleOpenReplyModal(reclamation)}
                          />
                          <IconButton
                            icon={<FaTrash />}
                            colorScheme="red"
                            aria-label="Delete reclamation"
                            onClick={() => handleOpenDeleteModal(reclamation)}
                          />
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Modal de suppression */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmer la suppression</ModalHeader>
          <ModalBody>
            Êtes-vous sûr de vouloir supprimer cette réclamation ?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleDeleteReclamation}>
              Supprimer
            </Button>
            <Button variant="ghost" onClick={onDeleteClose} ml={3}>
              Annuler
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal de réponse */}
      <Modal isOpen={isReplyOpen} onClose={onReplyClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Répondre à la réclamation</ModalHeader>
          <ModalBody>
            <Textarea
              placeholder="Écrire une réponse..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSendResponse}>
              Envoyer la réponse
            </Button>
            <Button variant="ghost" onClick={onReplyClose} ml={3}>
              Annuler
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GestionReclamations;
