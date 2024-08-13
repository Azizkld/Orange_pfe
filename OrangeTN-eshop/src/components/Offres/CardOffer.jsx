import React from 'react';
import { Box, Text, VStack, Button, Tooltip } from '@chakra-ui/react';

const CardOffer = ({ offer, onAcheterClick }) => {
  return (
    <Box
      border="1px"
      borderColor="gray.300"
      borderRadius="md"
      p={4}
      textAlign="center"
      bg="white"
      w="200px"
    >
      <VStack spacing={3}>
        <Tooltip label={offer.desc} fontSize="md">
          <Text fontSize="lg" fontWeight="bold" color="orange.500">
            {offer.nom}
          </Text>
        </Tooltip>
        
        {/* Display services vertically */}
        <VStack align="start" spacing={1}>
          {offer.service_name.map((service, index) => (
            <Text key={index} fontSize="sm" color="gray.700">
              {service}
            </Text>
          ))}
        </VStack>

        <Text fontSize="xl" fontWeight="bold" color="black">
          {offer.prix} DT
        </Text>
        <Text fontSize="sm" color="gray.500">
          Valable {offer.duree_expiration} jours
        </Text>
       
        <Button colorScheme="orange" variant="solid" size="sm" mt={4} onClick={onAcheterClick}>
          Acheter
        </Button>
      </VStack>
    </Box>
  );
};

export default CardOffer;
