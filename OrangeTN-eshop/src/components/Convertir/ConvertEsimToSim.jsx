import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import Header from '../Header';
import Footer from '../Footer';

const ConvertSimToEsimForm = ({ onSubmit }) => (
  <VStack spacing={4} align="stretch">
    <FormControl>
      <FormLabel>Numéro</FormLabel>
      <Input placeholder="Entrez votre numéro" />
    </FormControl>
    <FormControl>
      <FormLabel>IMEI</FormLabel>
      <Input placeholder="Entrez votre IMEI" />
    </FormControl>
    <Button colorScheme="orange" onClick={onSubmit}>Soumettre</Button>
  </VStack>
);

const ConvertEsimToSim = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleSubmit = () => {
    onOpen();
  };

  return (
    <Box>
      <Header />
      <Container maxW="container.lg" p={4}>
        <Box p={6} boxShadow="md" bg="white" borderRadius="md">
          <ConvertSimToEsimForm onSubmit={handleSubmit} />
        </Box>
      </Container>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold" display="flex" alignItems="center">
              <CheckCircleIcon color="green.500" mr={2} />
              Succès !
            </AlertDialogHeader>
            <AlertDialogBody>
              Veuillez consulter la boutique Orange près de vous pour récupérer votre SIM.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="orange" onClick={onClose}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Footer />
    </Box>
  );
};

export default ConvertEsimToSim;
