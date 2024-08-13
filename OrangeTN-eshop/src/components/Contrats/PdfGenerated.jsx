import React, { useRef } from 'react';
import { Box, Button, VStack, Text, SimpleGrid, Image } from '@chakra-ui/react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../../images/logo.png';

const PdfGenerated = ({ contrat }) => {
  const pdfRef = useRef();

  const generatePDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('contrat.pdf');
    });
  };

  return (
    <Box p={4} bg="gray.50">
      <Button onClick={generatePDF} colorScheme="blue" mb={4}>
        Générer PDF
      </Button>
      <Box ref={pdfRef} p={6} bg="white" boxShadow="md" borderRadius="md">
        <VStack spacing={4} align="start">
          <SimpleGrid columns={2} spacing={4} w="full">
            <Box>
              <Image src={logo} alt="University Logo" w="150px" />
            </Box>
            <Box textAlign="right">
              <Text fontSize="lg" fontWeight="bold">
               ORANGE TUNISIE
              </Text>
              <Text fontSize="md">Contrats Clients</Text>
            </Box>
          </SimpleGrid>
          <Text fontSize="xl" fontWeight="bold" textAlign="center" w="full">
            Détails du Contrat
          </Text>
          <SimpleGrid columns={2} spacing={4} w="full">
            <Text>Code du Contrat:</Text>
            <Text fontWeight="bold">{contrat.code}</Text>
            <Text>Date d'Activation:</Text>
            <Text fontWeight="bold">{contrat.activationDate}</Text>
            <Text>Date d'Expiration:</Text>
            <Text fontWeight="bold">{contrat.expirationDate}</Text>
            <Text>Numéro:</Text>
            <Text fontWeight="bold">{contrat.numero}</Text>
            <Text>Type de Numéro:</Text>
            <Text fontWeight="bold">{contrat.typeNumero}</Text>
            <Text>Offre:</Text>
            <Text fontWeight="bold">{contrat.offreName}</Text>
            <Text>Status:</Text>
            <Text fontWeight="bold" color={contrat.status === 'expiré' ? 'red' : 'green'}>
              {contrat.status}
            </Text>
          </SimpleGrid>
          <Box textAlign="center" w="full" mt={6}>
          <Text>Ce fichier est une piéce justificative !</Text>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default PdfGenerated;
