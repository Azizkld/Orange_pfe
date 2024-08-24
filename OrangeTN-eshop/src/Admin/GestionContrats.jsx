import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Select,
  Input,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import Cookies from 'js-cookie';

const GestionContrats = () => {
  const [contrats, setContrats] = useState([]);
  const [filterStatus, setFilterStatus] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContrat, setSelectedContrat] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const toast = useToast();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Fetch contracts when the component mounts
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const token = Cookies.get('accessToken'); // Get the token from cookies

        if (!token) {
          throw new Error('Token manquant. Veuillez vous reconnecter.');
        }

        const response = await fetch('http://localhost:8050/api/v1/Contract/findAllContract', {
          headers: {
            'Authorization': `Bearer ${token}`, // Send token in headers
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors du fetch des contrats');
        }

        const data = await response.json();
        setContrats(data.contracts || []); // Set contracts, or an empty array if no contracts found
      } catch (error) {
        console.error(error);
        toast({
          title: 'Erreur',
          description: "Impossible de gérer les contrats",
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchContracts();
  }, [toast]);

  // Handle deletion of a contract
  const handleDeleteContrat = async () => {
    try {
      const token = Cookies.get('accessToken');
      if (!token) {
        throw new Error('Token manquant. Veuillez vous reconnecter.');
      }

      const response = await fetch(`http://localhost:8050/api/v1/Contract/supprimerContract/${selectedContrat}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du contrat');
      }

      // Remove the deleted contract from the state
      setContrats(contrats.filter(contrat => contrat.id !== selectedContrat));
      onDeleteClose(); // Close the modal

      toast({
        title: 'Succès',
        description: "Contrat supprimé avec succès",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Erreur',
        description: "Impossible de supprimer le contrat",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle opening of the delete confirmation modal
  const handleOpenDeleteModal = (id) => {
    setSelectedContrat(id);
    onDeleteOpen();
  };

  const filteredContrats = contrats.filter((contrat) => {
    const matchesStatus =
      filterStatus === 'Tous' ||
      (filterStatus === 'Actif' && contrat.coStatus == 1) ||
      (filterStatus === 'Expiré' && contrat.coStatus != 1);

    const matchesSearchTerm =
      !searchTerm ||
      `${contrat.utilisateurAll.utFName} ${contrat.utilisateurAll.utLName}`
        .toLowerCase()
        .includes(searchTerm);

    return matchesStatus && matchesSearchTerm;
  });

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <HStack spacing={4}>
          <Input
            placeholder="Rechercher par nom ou code"
            value={searchTerm}
            onChange={handleSearchChange}
            w="300px"
          />
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="Tous">Tous</option>
            <option value="Actif">Actif</option>
            <option value="Expiré">Expiré</option>
          </Select>
        </HStack>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Code Contrat</Th>
              <Th>Nom Client</Th>
              <Th>Offre</Th>
              <Th>Numéro</Th>
              <Th>Date Activation</Th>
              <Th>Date Expiration</Th>
              <Th>Statut</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredContrats.map((contrat) => (
              <Tr key={contrat.id}>
                <Td>{contrat.coCode}</Td>
                <Td>{contrat.utilisateurAll.utFName} {contrat.utilisateurAll.utLName}</Td>
                <Td>{contrat.rateplan.rpName}</Td>
                <Td>{contrat.num.numPhoneNumber}</Td>
                <Td>{contrat.coActivDate}</Td>
                <Td>{contrat.coExpirDate}</Td>
                <Td>
                  <Tag colorScheme={contrat.coStatus == 1 ? 'green' : 'red'}>
                    {contrat.coStatus == 1 ? 'Actif' : 'Expiré'}
                  </Tag>
                </Td>
                <Td>
                  <IconButton
                    icon={<FaTrash />}
                    colorScheme="red"
                    onClick={() => handleOpenDeleteModal(contrat.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmer la suppression</ModalHeader>
          <ModalBody>
            <Text>Êtes-vous sûr de vouloir supprimer ce contrat ?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleDeleteContrat}>
              Supprimer
            </Button>
            <Button onClick={onDeleteClose} ml={3}>
              Annuler
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GestionContrats;
