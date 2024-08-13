import React from 'react';
import { Box, HStack, VStack, Text, Image } from '@chakra-ui/react';
import puce from '../../images/puce.jpeg'; // Ensure the image path is correct

const CardNumber = ({ phone }) => {
  return (
    <Box
      key={phone.id}
      p={4}
      border="1px"
      borderColor="gray.300"
      borderRadius="md"
      bg="white"
    >
      <HStack spacing={4}>
        <Image src={puce} alt={`Image de ${phone.type}`} boxSize="50px" />
        <VStack align="start">
          <Text fontSize="lg" fontWeight="bold">
            {phone.number}
          </Text>
          <Text>Type: {phone.type}</Text>
          <Text>Date d'activation: {phone.activationDate}</Text>
          <Text>Code PUK: {phone.pukCode}</Text>
          <Text>Code PIN: {phone.pinCode}</Text>
          {phone.type === 'SIM' && <Text>Numéro de série: {phone.serialNumber}</Text>}
          {phone.type === 'eSIM' && (
            <>
              <Text>IMEI: {phone.imei}</Text>
              <Text>Type de smartphone: {phone.smartphoneType}</Text>
            </>
          )}
        </VStack>
      </HStack>
    </Box>
  );
};

export default CardNumber;
