import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  HStack,
  Image,
  useToast,
} from '@chakra-ui/react';
import claim from "../../images/claim.png";
import Header from '../Header';
import Footer from '../Footer';

const Reclamation = () => {
  const [reclamation, setReclamation] = useState(''); // State to track the input value
  const toast = useToast();

  const handleSubmit = () => {
    if (reclamation.trim() !== '') {
      toast({
        title: 'Réclamation envoyée.',
        description: 'Votre réclamation a été soumise avec succès.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setReclamation(''); // Clear the input field
      // Additional form submission logic here if necessary
    }
  };

  return (
    <Box>
      <Header />
      <Box bg="gray.50" minH="100vh" py={10}>
        <Container maxW="container.lg">
          <Box textAlign="center" mb={10}>
            <Text fontSize="4xl" fontWeight="bold">
              Obtenez l'aide dont vous avez besoin.
            </Text>
            <Text fontSize="lg" color="gray.600">
              Décrivez-nous votre problème et nous vous proposerons la meilleure solution.
            </Text>
          </Box>
          <Box display="flex" justifyContent="center" mb={10}>
            <Image src={claim} alt="Card" />
          </Box>
          <VStack spacing={8} align="stretch">
            <FormControl id="reclamation">
              <FormLabel fontSize="lg" fontWeight="bold">Réclamation</FormLabel>
              <Input
                placeholder="Décrivez votre problème ici..."
                size="lg"
                value={reclamation}
                onChange={(e) => setReclamation(e.target.value)}
              />
            </FormControl>
            <Button
              colorScheme="orange"
              size="lg"
              onClick={handleSubmit}
              isDisabled={reclamation.trim() === ''}
            >
              Soumettre
            </Button>
          </VStack>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Reclamation;
