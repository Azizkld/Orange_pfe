import React, { useState } from 'react';
import { Box, Button, VStack, Text, HStack, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useToast } from '@chakra-ui/react';

const initialUsers = [
  { id: 1, nom: 'John', prenom: 'Doe', cin: '12345678', frontImage: '/path/to/frontImage.jpg', backImage: '/path/to/backImage.jpg' },
  { id: 2, nom: 'Jane', prenom: 'Smith', cin: '87654321', frontImage: '/path/to/frontImage2.jpg', backImage: '/path/to/backImage2.jpg' },
  // Add more verified users here
];

const VerifiedAccountsList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const toast = useToast();

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleConfirmDelete = () => {
    // Remove the user from the list
    setUsers(users.filter(u => u.id !== selectedUser.id));
    onClose();
    toast({
      title: "Utilisateur supprimé",
      description: `L'utilisateur ${selectedUser.nom} ${selectedUser.prenom} a été supprimé avec succès.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <VStack align="stretch" spacing={4}>
      {users.map(user => (
        <Box key={user.id} p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
          <HStack spacing={4}>
            <VStack align="start">
              <Text fontWeight="bold">{user.nom} {user.prenom}</Text>
              <Text>CIN: {user.cin}</Text>
              <HStack>
                <Image src={user.frontImage} alt="Front of CIN" boxSize="100px" />
                <Image src={user.backImage} alt="Back of CIN" boxSize="100px" />
              </HStack>
            </VStack>
            <HStack spacing={2} ml="auto">
              <Button colorScheme="red" onClick={() => handleDeleteClick(user)}>Supprimer</Button>
            </HStack>
          </HStack>
        </Box>
      ))}

      {/* Modal for delete confirmation */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmer la suppression</ModalHeader>
          <ModalBody>
            Êtes-vous sûr de vouloir supprimer l'utilisateur {selectedUser?.nom} {selectedUser?.prenom} ?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleConfirmDelete}>
              Supprimer
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

export default VerifiedAccountsList;
