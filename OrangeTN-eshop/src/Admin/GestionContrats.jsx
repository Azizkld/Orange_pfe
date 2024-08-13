import React, { useState } from 'react';
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

const initialContrats = [
  { id: 1, code: 'C001', nomClient: 'John Doe', offre: 'Offre 100 Go',numero:54369857, dateActivation: '2023-01-01', dateExpiration: '2024-01-01', statut: 'Actif' },
  { id: 2, code: 'C002', nomClient: 'Jane Smith', offre: 'Offre 75 Go',numero:54368957, dateActivation: '2022-01-01', dateExpiration: '2023-01-01', statut: 'Expiré' },
  // Ajouter d'autres contrats ici
];

const GestionContrats = () => {
  const [contrats, setContrats] = useState(initialContrats);
  const [filterStatus, setFilterStatus] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContrat, setSelectedContrat] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleOpenDeleteModal = (contrat) => {
    setSelectedContrat(contrat);
    onOpen();
  };

  const handleDeleteContrat = () => {
    setContrats(contrats.filter(contrat => contrat.id !== selectedContrat.id));
    onClose();
    toast({
      title: 'Contrat supprimé.',
      description: 'Le contrat a été supprimé avec succès.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const filteredContrats = contrats.filter(contrat => {
    const matchesStatus = filterStatus === 'Tous' || contrat.statut === filterStatus;
    const matchesSearch = contrat.nomClient.toLowerCase().includes(searchTerm) || contrat.code.toLowerCase().includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const bg = useColorModeValue('white', 'gray.800');
  const boxShadow = useColorModeValue('sm', 'sm-dark');

  return (
    <Box p={4}>
      <HStack spacing={4} mb={6}>
        <Select
          value={filterStatus}
          onChange={handleStatusChange}
          w="200px"
        >
          <option value="Tous">Tous</option>
          <option value="Actif">Actif</option>
          <option value="Expiré">Expiré</option>
        </Select>
        <Input
          placeholder="Rechercher par nom ou code"
          value={searchTerm}
          onChange={handleSearchChange}
          w="300px"
        />
      </HStack>
      <Box bg={bg} boxShadow={boxShadow} borderRadius="md" overflowX="auto">
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
            {filteredContrats.map(contrat => (
              <Tr key={contrat.id}>
                <Td>{contrat.code}</Td>
                <Td>{contrat.nomClient}</Td>
                <Td>{contrat.offre}</Td>
                <Td>{contrat.numero}</Td>
                <Td>{contrat.dateActivation}</Td>
                <Td>{contrat.dateExpiration}</Td>
                <Td>
                  <Tag colorScheme={contrat.statut === 'Actif' ? 'green' : 'red'}>
                    {contrat.statut}
                  </Tag>
                </Td>
                <Td>
                  <IconButton
                    icon={<FaTrash />}
                    colorScheme="red"
                    aria-label="Delete contrat"
                    onClick={() => handleOpenDeleteModal(contrat)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Modal de suppression */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmer la suppression</ModalHeader>
          <ModalBody>
            Êtes-vous sûr de vouloir supprimer le contrat {selectedContrat?.code} ?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleDeleteContrat}>
              Supprimer
            </Button>
            <Button variant="ghost" onClick={onClose} ml={3}>
              Annuler
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GestionContrats;
