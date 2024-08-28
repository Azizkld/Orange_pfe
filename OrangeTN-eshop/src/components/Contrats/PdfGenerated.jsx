import React, { useRef } from 'react';
import { Box, Button, VStack, Text, HStack, Image } from '@chakra-ui/react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../../images/logo.png'; // Assurez-vous que le chemin du logo est correct

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
      <Box ref={pdfRef} p={6} bg="white" boxShadow="md" borderRadius="md" w="210mm" minH="297mm" position="relative">
        <VStack spacing={6} align="stretch">
          {/* En-tête */}
          <HStack justifyContent="space-between">
            <Box>
              <Text fontSize="sm">{contrat.clientName} - {contrat.clientAddress}</Text>
            </Box>
            <Box textAlign="right">
              <Text fontSize="sm">Numéro de contrat</Text>
              <Text fontSize="sm" fontWeight="bold">{contrat.numero}</Text>
            </Box>
          </HStack>

          {/* Logo et informations d'Orange Tunisie */}
          <HStack justifyContent="space-between" mt={4}>
            <Image src={logo} alt="Logo Orange Tunisie" w="100px" />
            <Box textAlign="right">
              <Text fontSize="xl" fontWeight="bold">Orange Tunisie</Text>
              <Text fontSize="sm">Service Client</Text>
            </Box>
          </HStack>

          {/* Date */}
          <Box textAlign="right" mt={2}>
            <Text fontSize="sm">{new Date().toLocaleDateString()}</Text>
          </Box>

          {/* Titre */}
          <Box>
            <Text fontSize="2xl" fontWeight="bold" mt={6}>Détails du Contrat</Text>
          </Box>

          {/* Détails du Contrat en paragraphe */}
          <Box>
            <Text fontSize="sm" mb={4}>
              Cher(e) client,<br /><br />
              Nous avons le plaisir de vous informer que votre contrat numéro <Text as="span" fontWeight="bold">{contrat.numero}</Text> pour l'offre <Text as="span" fontWeight="bold">{contrat.offreName}</Text> a été activé avec succès le <Text as="span" fontWeight="bold">{contrat.activationDate}</Text>. Ce contrat vous offre les avantages suivants :
            </Text>
            <Text fontSize="sm" mb={4} pl={4}>
              - Appels illimités vers tous les réseaux en Tunisie.<br />
              - Accès Internet haut débit 24/7 avec <Text as="span" fontWeight="bold">x Go</Text> de données par mois.<br />
              - Accès prioritaire à nos services clients via le 1234.<br />
              - Des offres exclusives et personnalisées via l'application OrangePlus.
            </Text>
            <Text fontSize="sm" mb={4}>
              Votre contrat est valable jusqu'au <Text as="span" fontWeight="bold">{contrat.expirationDate}</Text>. Le numéro associé à votre contrat est de type <Text as="span" fontWeight="bold">{contrat.typeNumero}</Text>.<br /><br />
              Actuellement, le statut de votre contrat est <Text as="span" fontWeight="bold" color={contrat.status === 'expiré' ? 'red' : 'green'}>{contrat.status}</Text>. Nous espérons que ces services vous apporteront entière satisfaction.<br /><br />
              En cas de questions ou de besoin d'assistance, ou si vous souhaitez soumettre une réclamation, vous pouvez nous contacter via l'application OrangePlus, utiliser la fonctionnalité dédiée aux réclamations, ou appeler notre service client au 1155. Nous vous remercions de votre confiance et restons à votre disposition pour toute information complémentaire.
            </Text>
          </Box>

          {/* Signature */}
          <Box mt={6}>
            <Text fontSize="lg" fontWeight="bold" color="teal.500">{contrat.clientName}</Text>
            <Text fontSize="sm">{contrat.clientName}</Text>
          </Box>

          {/* Note de bas de page */}
          <Box textAlign="center" w="full" mt={8} position="absolute" bottom="20px">
            <Text fontSize="xs">Ce fichier est une pièce justificative !</Text>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default PdfGenerated;
