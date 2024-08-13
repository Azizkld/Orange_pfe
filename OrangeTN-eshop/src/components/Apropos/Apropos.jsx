import React from 'react';
import { Box, Flex, Text, Heading, Button, Container, SimpleGrid } from '@chakra-ui/react';
import Footer from '../Footer';
import Header from '../Header';

const AboutUs = () => {
  return (
    <Box bg="white" color="black" >
      <Header />
      <Container maxW="container.lg">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={10}>
          <Box>
            <Heading fontSize="3xl" mb={4}>Tous les avantages</Heading>
            <Text fontSize="md" color="gray.700">
              Découvrez tous les avantages de rejoindre Orange Tunisie. Profitez de services téléphoniques de haute qualité, de forfaits internet adaptés à vos besoins, et d'une assistance clientèle toujours à votre écoute.
            </Text>
          </Box>
          <Box>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Box p={4} border="1px" borderColor="gray.300" borderRadius="md">
                <Heading fontSize="xl" mb={2} color="orange.500">Réseau de qualité</Heading>
                <Text fontSize="sm" color="gray.700">Bénéficiez d'un réseau téléphonique fiable et performant partout en Tunisie.</Text>
              </Box>
              <Box p={4} border="1px" borderColor="gray.300" borderRadius="md">
                <Heading fontSize="xl" mb={2} color="orange.500">Offres personnalisées</Heading>
                <Text fontSize="sm" color="gray.700">Choisissez parmi une variété de forfaits et services adaptés à vos besoins.</Text>
              </Box>
              <Box p={4} border="1px" borderColor="gray.300" borderRadius="md">
                <Heading fontSize="xl" mb={2} color="orange.500">Assistance clientèle</Heading>
                <Text fontSize="sm" color="gray.700">Notre équipe est disponible 24/7 pour répondre à toutes vos questions et préoccupations.</Text>
              </Box>
              <Box p={4} border="1px" borderColor="gray.300" borderRadius="md">
                <Heading fontSize="xl" mb={2} color="orange.500">Promotions exclusives</Heading>
                <Text fontSize="sm" color="gray.700">Profitez de promotions et d'offres exclusives réservées à nos clients fidèles.</Text>
              </Box>
              <Box p={4} border="1px" borderColor="gray.300" borderRadius="md">
                <Heading fontSize="xl" mb={2} color="orange.500">Couverture étendue</Heading>
                <Text fontSize="sm" color="gray.700">Accédez à une couverture réseau étendue et de qualité.</Text>
              </Box>
            </SimpleGrid>
          </Box>
        </SimpleGrid>

        <Box textAlign="center" mb={10}>
          <Heading fontSize="3xl" mb={4}>Notre Histoire</Heading>
          <Text fontSize="md" color="gray.700">
            Depuis notre création, nous nous engageons à offrir à nos clients le meilleur de la technologie et des services téléphoniques. Notre mission est de connecter les Tunisiens au monde entier grâce à un réseau fiable et des offres adaptées à tous les besoins. Découvrez notre parcours et comment nous avons évolué pour devenir le leader des télécommunications en Tunisie.
          </Text>
        </Box>

        <Box textAlign="center" mb={10}>
          <Text fontSize="sm" letterSpacing="wider" color="orange.500">CLIENTS SATISFAITS</Text>
          <Heading fontSize="3xl" mb={4}>Pourquoi nous choisir</Heading>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={10}>
          <Box p={4} border="1px" borderColor="orange.500" borderRadius="md">
            <Text fontSize="sm" color="gray.700">
              Réseau de qualité supérieure couvrant toute la Tunisie.
            </Text>
          </Box>
          <Box p={4} border="1px" borderColor="orange.500" borderRadius="md">
            <Text fontSize="sm" color="gray.700">
              Assistance clientèle réactive et disponible 24/7.
            </Text>
          </Box>
          <Box p={4} border="1px" borderColor="orange.500" borderRadius="md">
            <Text fontSize="sm" color="gray.700">
              Offres et promotions exclusives adaptées à tous les besoins.
            </Text>
          </Box>
        </SimpleGrid>

        <Box textAlign="center">
          <Button colorScheme="orange" variant="solid" size="lg">VOIR TOUTES LES OFFRES ET PROMOTIONS</Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default AboutUs;
