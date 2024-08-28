import React from 'react';
import { Box, Text, VStack, Badge, Button, HStack } from '@chakra-ui/react';

const ContratCard = ({ contrat, onGeneratePDF }) => {
  if (!contrat) {
    return null; // Ensure we don't render anything if contrat is undefined
  }

  return (
    <Box
      border="1px"
      borderColor="gray.200"
      borderRadius="lg"
      p={6}
      textAlign="center"
      bg="white"
      w="280px"
      boxShadow="lg"
      _hover={{ transform: "scale(1.03)", transition: "all 0.3s ease-in-out" }}
    >
      <VStack spacing={4}>
        <Text fontSize="xl" fontWeight="extrabold" color="orange.500">
          Code: {contrat.code}
        </Text>

        <Text fontSize="md" color="gray.600">
          Statut:{" "}
          <Badge
            colorScheme={contrat.status === 'expiré' ? 'red' : 'green'}
            fontSize="0.8em"
            borderRadius="full"
            px={3}
            py={1}
          >
            {contrat.status}
          </Badge>
        </Text>

        <Text fontSize="sm" color="gray.600">
          Activation: <Text as="span" fontWeight="semibold">{contrat.activationDate}</Text>
        </Text>
        <Text fontSize="sm" color="gray.600">
          Expiration: <Text as="span" fontWeight="semibold">{contrat.expirationDate}</Text>
        </Text>
        <Text fontSize="sm" color="gray.600">
          Numéro: <Text as="span" fontWeight="semibold">{contrat.numero}</Text>
        </Text>
        <Text fontSize="sm" color="gray.600">
          Type de numéro: <Text as="span" fontWeight="semibold">{contrat.typeNumero}</Text>
        </Text>
        <Text fontSize="sm" color="gray.600">
          Offre: <Text as="span" fontWeight="semibold">{contrat.offreName}</Text>
        </Text>

        <HStack spacing={4} mt={6}>
          <Button
            colorScheme="orange"
            size="sm"
            onClick={() => onGeneratePDF(contrat)}
            _hover={{ bg: "orange.600" }}
          >
            Télécharger PDF
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            _hover={{ bg: "gray.100" }}
          >
            Imprimer
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ContratCard;
