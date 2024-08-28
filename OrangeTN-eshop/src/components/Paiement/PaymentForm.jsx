import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  SimpleGrid,
  Image,
  HStack,
} from '@chakra-ui/react';
import visaImage from '../../images/visa.png'; // Ensure this path is correct

const PaymentForm = ({ onBack, onPay }) => (
  <Box
    p={6}
    bg="white"
    boxShadow="md"
    borderRadius="md"
    w="full"
    maxW="md"
    mx="auto"
  >
    <Text fontSize="2xl" fontWeight="bold" mb={6}>
      Détails de paiement
    </Text>

    <HStack justifyContent="center" mb={4}>
      <Image src={visaImage} alt="Visa Mastercard" boxSize="150px" />
    </HStack>

    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>Nom sur la carte</FormLabel>
        <Input placeholder="Aziz Khaled" />
      </FormControl>
      <FormControl>
        <FormLabel>Numéro de carte</FormLabel>
        <Input placeholder="16 chiffres" />
      </FormControl>
      <SimpleGrid columns={2} spacing={4}>
        <FormControl>
          <FormLabel>Valide jusqu'au</FormLabel>
          <Input placeholder="02/22" />
        </FormControl>
        <FormControl>
          <FormLabel>CVV</FormLabel>
          <Input placeholder="123" />
        </FormControl>
      </SimpleGrid>
      <Button colorScheme="orange" w="full" onClick={onPay}>
        PAYER
      </Button>
      <Button variant="outline" w="full" onClick={onBack}>
        Retour 
      </Button>
    </VStack>
  </Box>
);

export default PaymentForm;
