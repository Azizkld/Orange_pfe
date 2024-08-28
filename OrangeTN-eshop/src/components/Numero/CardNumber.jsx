import React from 'react';
import { Box, HStack, VStack, Text, Image } from '@chakra-ui/react';
import puce from '../../images/puce.jpeg'; // Ensure the image path is correct

const CardNumber = ({ phone }) => {
  return (
    <Box
      key={phone.numid}
      p={5}
      border="1px"
      borderColor="gray.200"
      borderRadius="lg"
      bg="white"
      boxShadow="lg"
      _hover={{ transform: "scale(1.02)", transition: "all 0.3s ease-in-out" }}
    >
      <HStack spacing={6} align="start">
        <Image src={puce} alt={`Image de ${phone.numType}`} boxSize="60px" borderRadius="full" />
        <VStack align="start" spacing={2}>
          <Text fontSize="xl" fontWeight="bold" color="orange.500">
            {phone.numPhoneNumber}
          </Text>
          <Text fontSize="md" color="gray.600">
            Type: <Text as="span" fontWeight="semibold">{phone.numType}</Text>
          </Text>
          <Text fontSize="md" color="gray.600">
            Date d'activation: <Text as="span" fontWeight="semibold">{phone.numActivationDate}</Text>
          </Text>
          <Text fontSize="md" color="gray.600">
            Code PUK: <Text as="span" fontWeight="semibold">{phone.numPukCode}</Text>
          </Text>
          <Text fontSize="md" color="gray.600">
            Code PIN: <Text as="span" fontWeight="semibold">{phone.numPinCode}</Text>
          </Text>
          {phone.numType === 'SIM' && (
            <Text fontSize="md" color="gray.600">
              Numéro de série: <Text as="span" fontWeight="semibold">{phone.numSerialNumber}</Text>
            </Text>
          )}
          {phone.numType === 'eSIM' && (
            <>
              <Text fontSize="md" color="gray.600">
                IMEI: <Text as="span" fontWeight="semibold">{phone.numImei}</Text>
              </Text>
              <Text fontSize="md" color="gray.600">
                Type de smartphone: <Text as="span" fontWeight="semibold">{phone.phoneType?.phName}</Text>
              </Text>
            </>
          )}
        </VStack>
      </HStack>
    </Box>
  );
};

export default CardNumber;
