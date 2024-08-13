import React, { useState } from 'react';
import {
  Box, Button, VStack, Text, HStack, Image, useDisclosure, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useToast
} from '@chakra-ui/react';

const initialWaitingUsers = [
  { id: 1, nom: 'Alice', prenom: 'Johnson', cin: '12312312', frontImage: '/path/to/frontImage.jpg', backImage: '/path/to/backImage.jpg' },
  { id: 2, nom: 'Bob', prenom: 'Williams', cin: '87687687', frontImage: '/path/to/frontImage2.jpg', backImage: '../components/images/logo.png' },
  // Add more users waiting for approval here
];

const WaitingForApprovalList = () => {
  const [waitingUsers, setWaitingUsers] = useState(initialWaitingUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleApproveClick = (user) => {
    setSelectedUser(user);
    onApprove(user);
  };

  const handleRejectClick = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  const onApprove = (user) => {
    setWaitingUsers(waitingUsers.filter(u => u.id !== user.id));
    toast({
      title: "Utilisateur approuvé",
      description: `L'utilisateur ${user.nom} ${user.prenom} a été approuvé.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const onReject = () => {
    setWaitingUsers(waitingUsers.filter(u => u.id !== selectedUser.id));
    onClose();
    toast({
      title: "Utilisateur rejeté",
      description: `L'utilisateur ${selectedUser.nom} ${selectedUser.prenom} a été rejeté.`,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <VStack align="stretch" spacing={4}>
      {waitingUsers.map(user => (
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
              <Button colorScheme="green" onClick={() => handleApproveClick(user)}>Approuver</Button>
              <Button colorScheme="red" onClick={() => handleRejectClick(user)}>Rejeter</Button>
            </HStack>
          </HStack>
        </Box>
      ))}

      {/* Modal for reject confirmation */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmer le rejet</ModalHeader>
          <ModalBody>
            Êtes-vous sûr de vouloir rejeter l'utilisateur {selectedUser?.nom} {selectedUser?.prenom} ?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={onReject}>
              Rejeter
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

export default WaitingForApprovalList;
