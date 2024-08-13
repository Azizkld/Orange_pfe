import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Input,
  Select,
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
import { FaTrash, FaReply, FaArchive } from 'react-icons/fa';

const initialReclamations = [
  {
    id: 1,
    description: "Problème avec la connexion Internet.",
    date: "2024-08-01",
    statut: "En attente",
    user: {
      nom: 'Aziz',
      prenom: 'Khaled',
      cin: '12345678',
    }
  },
  {
    id: 2,
    description: "Facture incorrecte pour le mois dernier.",
    date: "2024-08-02",
    statut: "Résolu",
    user: {
      nom: 'Fedi',
      prenom: 'Khaled',
      cin: '87654321',
    }
  },
  // Add more reclamations here
];

const GestionReclamations = () => {
  const [activeReclamations, setActiveReclamations] = useState(initialReclamations.filter(r => r.statut !== "Résolu"));
  const [archivedReclamations, setArchivedReclamations] = useState(initialReclamations.filter(r => r.statut === "Résolu"));
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("Toutes");
  const [showMore, setShowMore] = useState({});
  const [selectedReclamation, setSelectedReclamation] = useState(null);
  const [response, setResponse] = useState('');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isReplyOpen, onOpen: onReplyOpen, onClose: onReplyClose } = useDisclosure();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDateChange = (event) => {
    setFilterDate(event.target.value);
  };

  const handleStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleDeleteReclamation = (id) => {
    setActiveReclamations(activeReclamations.filter(reclamation => reclamation.id !== id));
    onClose();
    toast({
      title: "Réclamation supprimée.",
      description: "La réclamation a été supprimée avec succès.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleShowMoreToggle = (id) => {
    setShowMore((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleOpenDeleteModal = (reclamation) => {
    setSelectedReclamation(reclamation);
    onOpen();
  };

  const handleOpenReplyModal = (reclamation) => {
    setSelectedReclamation(reclamation);
    onReplyOpen();
  };

  const handleSendResponse = () => {
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

    // Move the reclamation to the archive after setting it to resolved
    setActiveReclamations(activeReclamations.map(reclamation => 
      reclamation.id === selectedReclamation.id 
        ? { ...reclamation, statut: "Résolu" } 
        : reclamation
    ));
    
    const resolvedReclamation = activeReclamations.find(reclamation => reclamation.id === selectedReclamation.id);
    setArchivedReclamations([...archivedReclamations, resolvedReclamation]);

    setActiveReclamations(activeReclamations.filter(reclamation => reclamation.id !== selectedReclamation.id));

    onReplyClose();
    toast({
      title: "Réclamation résolue.",
      description: "La réclamation a été marquée comme résolue et archivée.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const filteredReclamations = activeReclamations.filter(reclamation => {
    return (
      (filterStatus === "Toutes" || reclamation.statut === filterStatus) &&
      (filterDate === "" || reclamation.date === filterDate) &&
      (reclamation.user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
       reclamation.user.prenom.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const bg = useColorModeValue('white', 'gray.800');
  const boxShadow = useColorModeValue('sm', 'sm-dark');

  return (
    <Box p={4}>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Réclamations Actives</Tab>
          <Tab>Réclamations Archivées</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HStack spacing={4} mb={6}>
              <Input
                placeholder="Rechercher par nom..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Input
                type="date"
                placeholder="Filtrer par date"
                value={filterDate}
                onChange={handleDateChange}
                w="200px"
              />
              <Select
                value={filterStatus}
                onChange={handleStatusChange}
                w="200px"
              >
                <option value="Toutes">Toutes</option>
                <option value="En attente">En attente</option>
                <option value="Résolu">Résolu</option>
              </Select>
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
                      <Td>{reclamation.user.nom}</Td>
                      <Td>{reclamation.user.prenom}</Td>
                      <Td>{reclamation.user.cin}</Td>
                      <Td>
                        <Tag colorScheme={reclamation.statut === "Résolu" ? "green" : "orange"}>
                          {reclamation.statut}
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

          <TabPanel>
            <VStack align="stretch" spacing={4}>
              {archivedReclamations.map(reclamation => (
                <Box key={reclamation.id} p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
                  <VStack align="start">
                    <Text fontWeight="bold">Date: {reclamation.date}</Text>
                    <Text>
                      Description: {showMore[reclamation.id] || reclamation.description.length <= 30 ? reclamation.description : `${reclamation.description.substring(0, 30)}...`}
                      {reclamation.description.length > 30 && (
                        <Button variant="link" colorScheme="orange" size="sm" onClick={() => handleShowMoreToggle(reclamation.id)}>
                          {showMore[reclamation.id] ? "Afficher moins" : "Afficher plus"}
                        </Button>
                      )}
                    </Text>
                    <Text>Nom: {reclamation.user.nom}</Text>
                    <Text>Prénom: {reclamation.user.prenom}</Text>
                    <Text>CIN: {reclamation.user.cin}</Text>
                    <Text>Statut: {reclamation.statut}</Text>
                  </VStack>
                </Box>
              ))}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Modal de suppression */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmer la suppression</ModalHeader>
          <ModalBody>
            Êtes-vous sûr de vouloir supprimer cette réclamation ?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={() => handleDeleteReclamation(selectedReclamation?.id)}>
              Supprimer
            </Button>
            <Button variant="ghost" onClick={onClose} ml={3}>
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
