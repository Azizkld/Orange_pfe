import React, { useState } from 'react';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  useDisclosure,
  VStack,
  Text,
} from '@chakra-ui/react';
import ReclamationTable from './ReclamationTable';
import ReclamationFilters from './ReclamationFilters';
import { ReplyModal, DeleteModal } from './ReclamationActions';

export const initialReclamations = [
  {
    id: 1,
    description: "Problème avec la connexion Internet.",
    date: "2024-08-01",
    statut: "En attente",
    user: {
      nom: 'Aziz',
      prenom: 'Khaled',
      cin: '12345678',
    },
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
    },
  },
  {
    id: 3,
    description: "Connexion lente pendant les heures de pointe.",
    date: "2024-08-03",
    statut: "En attente",
    user: {
      nom: 'Ines',
      prenom: 'Bouejla',
      cin: '98765432',
    },
  },
];

const GestionReclamations = () => {
  const [activeReclamations, setActiveReclamations] = useState(
    initialReclamations.filter((r) => r.statut !== 'Résolu')
  );
  const [archivedReclamations, setArchivedReclamations] = useState(
    initialReclamations.filter((r) => r.statut === 'Résolu')
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('Toutes');
  const [showMore, setShowMore] = useState({});
  const [selectedReclamation, setSelectedReclamation] = useState(null);
  const [response, setResponse] = useState('');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isReplyOpen,
    onOpen: onReplyOpen,
    onClose: onReplyClose,
  } = useDisclosure();

  const handleDeleteReclamation = (id) => {
    setActiveReclamations(
      activeReclamations.filter((reclamation) => reclamation.id !== id)
    );
    onClose();
    toast({
      title: 'Réclamation supprimée.',
      description: 'La réclamation a été supprimée avec succès.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSendResponse = () => {
    if (response.trim() === '') {
      toast({
        title: 'Erreur',
        description: 'Le message ne peut pas être vide.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Update the status to "Résolu"
    const updatedReclamations = activeReclamations.map((reclamation) =>
      reclamation.id === selectedReclamation.id
        ? { ...reclamation, statut: 'Résolu' }
        : reclamation
    );

    // Filter out the resolved reclamation from activeReclamations and add it to archivedReclamations
    setActiveReclamations(
      updatedReclamations.filter(
        (reclamation) => reclamation.id !== selectedReclamation.id
      )
    );

    const resolvedReclamation = updatedReclamations.find(
      (reclamation) => reclamation.id === selectedReclamation.id
    );
    setArchivedReclamations([...archivedReclamations, resolvedReclamation]);

    // Clear the response and close the modal
    setResponse('');
    onReplyClose();

    // Show success toast
    toast({
      title: 'Réclamation résolue.',
      description: 'La réclamation a été marquée comme résolue et archivée.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const filteredReclamations = activeReclamations.filter((reclamation) => {
    return (
      (filterStatus === 'Toutes' || reclamation.statut === filterStatus) &&
      (filterDate === '' || reclamation.date === filterDate) &&
      (reclamation.user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reclamation.user.prenom
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
    );
  });

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

  return (
    <Box p={4}>
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>Réclamations Actives</Tab>
          <Tab>Réclamations Archivées</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ReclamationFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterDate={filterDate}
              setFilterDate={setFilterDate}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
            <ReclamationTable
              reclamations={filteredReclamations}
              handleShowMoreToggle={handleShowMoreToggle}
              showMore={showMore}
              handleOpenReplyModal={handleOpenReplyModal}
              handleOpenDeleteModal={handleOpenDeleteModal}
            />
          </TabPanel>
          <TabPanel>
            <VStack align="stretch" spacing={4}>
              {archivedReclamations.map((reclamation) => (
                <Box
                  key={reclamation.id}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  boxShadow="md"
                >
                  <Text fontWeight="bold">Date: {reclamation.date}</Text>
                  <Text>Description: {reclamation.description}</Text>
                  <Text>Nom: {reclamation.user.nom}</Text>
                  <Text>Prénom: {reclamation.user.prenom}</Text>
                  <Text>CIN: {reclamation.user.cin}</Text>
                  <Text>Statut: {reclamation.statut}</Text>
                </Box>
              ))}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        handleDeleteReclamation={handleDeleteReclamation}
        selectedReclamation={selectedReclamation}
      />

      <ReplyModal
        isOpen={isReplyOpen}
        onClose={onReplyClose}
        handleSendResponse={handleSendResponse}
        response={response}
        setResponse={setResponse}
      />
    </Box>
  );
};

export default GestionReclamations;
