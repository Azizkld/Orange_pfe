import React from 'react';
import { Box, Text, VStack, Badge, Image, Button, HStack } from '@chakra-ui/react';
import defaultImage from '../../images/contrat.png'; // Update the path to your default image
import { Link } from 'react-router-dom';

const ContratCard = ({ contrat, onGeneratePDF }) => {
  if (!contrat) {
    return null; // Ensure we don't render anything if contrat is undefined
  }

  return (
    <Box
      border="1px"
      borderColor="gray.300"
      borderRadius="md"
      p={4}
      textAlign="center"
      bg="white"
      w="250px"
    >
      <VStack spacing={3}>
        <Text fontSize="lg" fontWeight="bold" color="orange.500">
          Code: {contrat.code}
        </Text>
        {/*<Image src={defaultImage} alt="Contrat" boxSize="150px" />*/}
        <Text fontSize="sm" color="gray.500">
          Statut: {contrat.status}
        </Text>
        <Badge colorScheme={contrat.status === 'expiré' ? 'red' : 'green'}>
          {contrat.status}
        </Badge>
        <Text fontSize="sm" color="gray.500">
          Activation: {contrat.activationDate}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Expiration: {contrat.expirationDate}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Numéro: {contrat.numero}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Type de numéro: {contrat.typeNumero}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Offre: {contrat.offreName}
        </Text>
        <HStack spacing={3} mt={4}>
          
          <Button colorScheme="orange" size="sm" onClick={() => onGeneratePDF(contrat)}>
          
            Télécharger PDF
           
          </Button>
          
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            Imprimer
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ContratCard;
