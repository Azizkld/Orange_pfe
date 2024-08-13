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
  Select,
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
      <FormLabel>Numéro de série</FormLabel>
      <Input placeholder="Entrez votre numéro de série" />
    </FormControl>
    <FormControl>
      <FormLabel>IMEI</FormLabel>
      <Input placeholder="Entrez votre IMEI" />
    </FormControl>
    <FormControl>
      <FormLabel>Type de smartphone</FormLabel>
      <Select placeholder="Sélectionnez votre smartphone">
        <option value="galaxy-s21">Galaxy S21</option>
        <option value="galaxy-s22">Galaxy S22</option>
        <option value="galaxy-s23">Galaxy S23</option>
        <option value="galaxy-s24-ultra">Galaxy S24 Ultra</option>
        <option value="iphone-13">iPhone 13</option>
        <option value="iphone-14">iPhone 14</option>
      </Select>
    </FormControl>
    <Button colorScheme="orange" onClick={onSubmit}>Soumettre</Button>
  </VStack>
);

const ConvertSimToEsim = () => {
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
              Succés !
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

export default ConvertSimToEsim;
