import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
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
import visaImage from '../../images/visa.png'; // Ensure the image path is correct
import Header from '../Header';
import Footer from '../Footer';
import PaymentForm from '../Paiement/PaymentForm';

const SimForm = ({ onNext }) => (
  <VStack spacing={4} align="stretch">
    <FormControl>
      <FormLabel>Adresse actuelle</FormLabel>
      <Input placeholder="Entrez votre adresse actuelle" />
    </FormControl>
    <Button colorScheme="orange" onClick={onNext}>Continuer vers le paiement</Button>
  </VStack>
);

const EsimForm = ({ onNext }) => (
  <VStack spacing={4} align="stretch">
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
    <Button colorScheme="orange" onClick={onNext}>Continuer vers le paiement</Button>
  </VStack>
);

const AcheterNumero = () => {
  const [formType, setFormType] = useState('sim');
  const [step, setStep] = useState('form');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleNext = () => setStep('payment');
  const handleBack = () => setStep('form');

  const handlePay = () => {
    onOpen();
  };

  const getAlertDialogBody = () => {
    if (formType === 'sim') {
      return 'Veuillez consulter la boutique Orange près de vous pour récupérer votre SIM.';
    } else if (formType === 'esim') {
      return 'Succés !';
    }
    return '';
  };

  return (
    <Box>
      <Header />
      <Container maxW="container.lg" p={4}>
        {step === 'form' && (
          <Tabs variant="enclosed">
            <TabList>
              <Tab onClick={() => setFormType('sim')}>SIM</Tab>
              <Tab onClick={() => setFormType('esim')}>eSIM</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box p={6} boxShadow="md" bg="white" borderRadius="md">
                  <SimForm onNext={handleNext} />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box p={6} boxShadow="md" bg="white" borderRadius="md">
                  <EsimForm onNext={handleNext} />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
        {step === 'payment' && (
          <Box mt={6} p={6} boxShadow="md" bg="white" borderRadius="md">
            <HStack mb={4} spacing={4}>
              <Box flex="1">
                <Image src={visaImage} alt="Card" />
              </Box>
              <Box flex="2">
                <PaymentForm onBack={handleBack} onPay={handlePay} />
              </Box>
            </HStack>
          </Box>
        )}
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
              Confirmation de paiement
            </AlertDialogHeader>
            <AlertDialogBody>
              {getAlertDialogBody()}
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

export default AcheterNumero;
