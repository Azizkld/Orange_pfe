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
} from '@chakra-ui/react';

const PaymentForm = ({ onBack, onPay }) => (
  <VStack spacing={4} align="stretch">
    <Text fontSize="2xl" fontWeight="bold">Détails de paiement</Text>
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
    <Button colorScheme="orange" w="full" onClick={onPay}>PAYER</Button>
    <Button variant="outline" onClick={onBack}>Retour au formulaire</Button>
  </VStack>
);

export default PaymentForm;
