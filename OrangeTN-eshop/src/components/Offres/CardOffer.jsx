import React from 'react';
import { Box, Text, VStack, Button, Tooltip, Badge, Divider } from '@chakra-ui/react';

const CardOffer = ({ offer, onAcheterClick }) => {
  return (
    <Box
      border="1px"
      borderColor="gray.300"
      borderRadius="lg"
      p={5}
      textAlign="center"
      bg="white"
      w="260px"
      boxShadow="md"
      _hover={{ transform: "scale(1.02)", transition: "all 0.3s ease-in-out" }}
    >
      <VStack spacing={4}>
        <Tooltip label={offer.rp_desc} fontSize="md" hasArrow>
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="orange.600"
            noOfLines={2}
          >
            {offer.rp_name}
          </Text>
        </Tooltip>

        <Divider borderColor="gray.200" />

        <Badge colorScheme="orange" fontSize="0.85em" py={1} px={3} borderRadius="full">
          Offre Spéciale
        </Badge>

        <Text fontSize="2xl" fontWeight="extrabold" color="gray.900">
          {offer.rp_price} DT
        </Text>
        <Text fontSize="sm" color="gray.500">
          Valable {offer.rp_validation_jours} jours
        </Text>

        <Button
          colorScheme="orange"
          variant="solid"
          size="md"
          mt={4}
          onClick={onAcheterClick}
          w="full"
          _hover={{ bg: "orange.600" }}
        >
          Acheter
        </Button>
      </VStack>
    </Box>
  );
};

export default CardOffer;
