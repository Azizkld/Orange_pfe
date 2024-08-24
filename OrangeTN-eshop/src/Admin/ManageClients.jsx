import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Input,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaCheck, FaTrash } from 'react-icons/fa';
import Cookies from 'js-cookie';

const GererClients = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userToDelete, setUserToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState('waiting');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Function to fetch users
  const fetchUtilisateurs = async () => {
    try {
      const token = Cookies.get('accessToken');

      if (!token) {
        throw new Error('Token manquant. Veuillez vous reconnecter.');
      }

      const response = await fetch('http://localhost:8050/api/UtilisateurAll/afficherListeUtilisateurs', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors du fetch des utilisateurs');
      }

      const data = await response.json();
      setUtilisateurs(data.filter(user => user.id !== 2)); // Exclude user with id=2
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Erreur',
        description: "Impossible de gérer les utilisateurs",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUtilisateurs();
  }, [toast]);

  // Fetch users whenever the active tab changes
  useEffect(() => {
    fetchUtilisateurs();
  }, [activeTab]);

  const handleDeleteUser = (id) => {
    setUserToDelete(id);
    onOpen();
  };

  const confirmDeleteUser = async () => {
    try {
      const token = Cookies.get('accessToken');

      if (!token) {
        throw new Error('Token manquant. Veuillez vous reconnecter.');
      }

      const response = await fetch(`http://localhost:8050/api/UtilisateurAll/supprimerUtilisateurId?id=${userToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('403 Forbidden - You may not have the necessary permissions.');
        }
        throw new Error('Erreur lors de la suppression de l\'utilisateur');
      }

      setUtilisateurs(utilisateurs.filter(utilisateur => utilisateur.id !== userToDelete));

      toast({
        title: 'Utilisateur supprimé.',
        description: 'L\'utilisateur a été supprimé avec succès.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      console.error('Error deleting user:', error.message);
      toast({
        title: 'Erreur',
        description: error.message || "Impossible de supprimer l'utilisateur",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleApproveUser = async (id) => {
    try {
      const token = Cookies.get('accessToken');

      if (!token) {
        throw new Error('Token manquant. Veuillez vous reconnecter.');
      }

      const response = await fetch('http://localhost:8050/api/status/change', {
        method: 'POST',  // Ensure this matches your API method (POST)
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: id }),
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('403 Forbidden - You may not have the necessary permissions.');
        }
        throw new Error('Erreur lors de la modification du statut de l\'utilisateur');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error('API response was not successful');
      }

      // Immediately move the user to the verified list by re-fetching the users
      fetchUtilisateurs();

      toast({
        title: 'Utilisateur approuvé.',
        description: 'L\'utilisateur a été approuvé avec succès.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error:', error.message);
      toast({
        title: 'Erreur',
        description: error.message || "Impossible d'approuver l'utilisateur",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const filteredUtilisateurs = utilisateurs.filter(utilisateur =>
    `${utilisateur.utFName} ${utilisateur.utLName}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeTab === 'verified' ? utilisateur.utStatus : !utilisateur.utStatus)
  );

  const bg = useColorModeValue('white', 'gray.800');
  const boxShadow = useColorModeValue('sm', 'sm-dark');

  return (
    <Box p={4}>
      <HStack spacing={4} mb={6}>
        <Button
          colorScheme="orange"
          onClick={() => setActiveTab('verified')}
          variant={activeTab === 'verified' ? 'solid' : 'outline'}
        >
          Comptes Vérifiés
        </Button>
        <Button
          colorScheme="orange"
          onClick={() => setActiveTab('waiting')}
          variant={activeTab === 'waiting' ? 'solid' : 'outline'}
        >
          Comptes en Attente
        </Button>
        <Input
          placeholder="Rechercher par nom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          maxW="300px"
        />
      </HStack>

      <Box bg={bg} boxShadow={boxShadow} borderRadius="md" overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Avatar</Th>
              <Th>Nom Prénom</Th>
              <Th>CIN</Th>
              <Th>Email</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredUtilisateurs.length > 0 ? (
              filteredUtilisateurs.map(utilisateur => (
                <Tr key={utilisateur.id}>
                  <Td><Avatar name={`${utilisateur.utFName} ${utilisateur.utLName}`} size="sm" /></Td>
                  <Td>{utilisateur.utFName} {utilisateur.utLName}</Td>
                  <Td>{utilisateur.utCin}</Td>
                  <Td>{utilisateur.utMail}</Td>
                  <Td>
                    {activeTab === 'waiting' && (
                      <IconButton
                        icon={<FaCheck />}
                        colorScheme="green"
                        aria-label="Approve utilisateur"
                        onClick={() => handleApproveUser(utilisateur.id)}
                        mr={2}
                      />
                    )}
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme="red"
                      aria-label="Delete utilisateur"
                      onClick={() => handleDeleteUser(utilisateur.id)}
                    />
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={5} textAlign="center">
                  Aucun utilisateur trouvé.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation de suppression</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Êtes-vous sûr de vouloir supprimer cet utilisateur ?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={confirmDeleteUser}>
              Supprimer
            </Button>
            <Button variant="ghost" onClick={onClose}>Annuler</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GererClients;
