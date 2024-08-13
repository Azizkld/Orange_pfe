import React, { useState } from 'react';
import {
  Box,
  Button,
  HStack,
  VStack,
  Text,
  Avatar,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  Input,
} from '@chakra-ui/react';
import { FaCheck, FaTrash } from 'react-icons/fa';

const initialVerifiedUsers = [
  { id: 1, nom: 'Aziz', prenom: 'Khaled', cin: '12345678', email: 'aziz@example.com', date: '01 Aug 2024' },
  { id: 2, nom: 'Fedi', prenom: 'Khaled', cin: '87654321', email: 'fedi@example.com', date: '02 Aug 2024' },
];

const initialWaitingUsers = [
  { id: 3, nom: 'Aziz', prenom: 'Khaled', cin: '12312312', email: 'aziz@example.com', frontImage: '/path/to/frontImage.jpg', backImage: '/path/to/backImage.jpg' },
  { id: 4, nom: 'Fedi', prenom: 'Khaled', cin: '87687687', email: 'fedi@example.com', frontImage: '/path/to/frontImage2.jpg', backImage: '/path/to/backImage2.jpg' },
];

const GererClients = () => {
  const [activeTab, setActiveTab] = useState('verified');
  const [verifiedUsers, setVerifiedUsers] = useState(initialVerifiedUsers);
  const [waitingUsers, setWaitingUsers] = useState(initialWaitingUsers);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleApproveUser = (id) => {
    const userToApprove = waitingUsers.find(user => user.id === id);
    if (userToApprove) {
      setVerifiedUsers([...verifiedUsers, userToApprove]);
      setWaitingUsers(waitingUsers.filter(user => user.id !== id));
      toast({
        title: 'Utilisateur approuvé.',
        description: `${userToApprove.nom} ${userToApprove.prenom} a été approuvé.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteUser = (id, isVerified) => {
    setUserToDelete({ id, isVerified });
    onOpen();
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      const { id, isVerified } = userToDelete;
      if (isVerified) {
        setVerifiedUsers(verifiedUsers.filter(user => user.id !== id));
      } else {
        setWaitingUsers(waitingUsers.filter(user => user.id !== id));
      }
      toast({
        title: 'Utilisateur supprimé.',
        description: 'L\'utilisateur a été supprimé avec succès.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    onOpen();
  };

  const filteredVerifiedUsers = verifiedUsers.filter(user =>
    `${user.nom} ${user.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredWaitingUsers = waitingUsers.filter(user =>
    `${user.nom} ${user.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const bg = useColorModeValue('white', 'gray.800');
  const boxShadow = useColorModeValue('sm', 'sm-dark');

  const renderUserRow = (user, isVerified) => (
    <Tr key={user.id}>
      <Td><Avatar name={`${user.nom} ${user.prenom}`} size="sm" /></Td>
      <Td>{user.nom} {user.prenom}</Td>
      <Td>{user.cin}</Td>
      <Td>{user.email}</Td>
      {!isVerified && (
        <Td>
          <HStack>
            <Image src={user.frontImage} alt="Front of CIN" boxSize="50px" cursor="pointer" onClick={() => handleImageClick(user.frontImage)} />
            <Image src={user.backImage} alt="Back of CIN" boxSize="50px" cursor="pointer" onClick={() => handleImageClick(user.backImage)} />
          </HStack>
        </Td>
      )}
      <Td>
        {isVerified ? (
          <IconButton
            icon={<FaTrash />}
            colorScheme="red"
            aria-label="Delete user"
            onClick={() => handleDeleteUser(user.id, true)}
          />
        ) : (
          <>
            <IconButton
              icon={<FaCheck />}
              colorScheme="green"
              aria-label="Approve user"
              onClick={() => handleApproveUser(user.id)}
              mr={2}
            />
            <IconButton
              icon={<FaTrash />}
              colorScheme="red"
              aria-label="Reject user"
              onClick={() => handleDeleteUser(user.id, false)}
            />
          </>
        )}
      </Td>
    </Tr>
  );

  return (
    <Box p={4}>
      <HStack spacing={4} mb={6}>
        <Button colorScheme="orange" onClick={() => setActiveTab('verified')} variant={activeTab === 'verified' ? 'solid' : 'outline'}>
          Comptes Vérifiés
        </Button>
        <Button colorScheme="orange" onClick={() => setActiveTab('waiting')} variant={activeTab === 'waiting' ? 'solid' : 'outline'}>
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
              <Th></Th>
              <Th>Nom Prénom</Th>
              <Th>CIN</Th>
              <Th>Email</Th>
              {activeTab === 'waiting' && <Th>Image</Th>}
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {activeTab === 'verified' && filteredVerifiedUsers.map(user => renderUserRow(user, true))}
            {activeTab === 'waiting' && filteredWaitingUsers.map(user => renderUserRow(user, false))}
          </Tbody>
        </Table>
      </Box>

      {/* Image Modal */}
      <Modal isOpen={selectedImage !== null} onClose={() => setSelectedImage(null)} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Image CIN</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedImage && <Image src={selectedImage} alt="CIN" w="full" />}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setSelectedImage(null)}>Fermer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isOpen && !selectedImage} onClose={onClose}>
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
