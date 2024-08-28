import React from 'react';
import { Box, Flex, Text, Heading, Container, SimpleGrid, Stack } from '@chakra-ui/react';
import Footer from '../Footer';
import Header from '../Header';

const AboutUs = () => {
  return (
    <Box bg="white" color="black">
      <Header />
      <Container maxW="container.lg" py={10}>
        
        {/* Section 1: Introduction */}
        <Box mb={12} textAlign="center">
          <Heading fontSize="4xl" mb={4} color="orange.500">
            Bienvenue chez Orange Tunisie
          </Heading>
          <Text fontSize="lg" color="gray.700" maxW="80%" mx="auto" lineHeight="taller">
            Depuis 2012, nous nous efforçons de faire du numérique un facteur d’égalité des chances pour tous les Tunisiens. Découvrez comment Orange Tunisie s'engage à offrir des services de télécommunications de haute qualité, tout en ayant un impact positif sur la société.
          </Text>
        </Box>

        {/* Section 2: Nos Avantages */}
        <Box mb={16}>
          <Heading fontSize="3xl" mb={6} textAlign="center" color="orange.500">
            Nos Avantages
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            <Box p={6} borderRadius="md" bg="gray.50">
              <Heading fontSize="xl" mb={4} color="orange.500">Réseau de qualité</Heading>
              <Text fontSize="md" color="gray.700">
                Un réseau performant couvrant toute la Tunisie pour vous permettre de rester connecté où que vous soyez.
              </Text>
            </Box>
            <Box p={6} borderRadius="md" bg="gray.50">
              <Heading fontSize="xl" mb={4} color="orange.500">Offres personnalisées</Heading>
              <Text fontSize="md" color="gray.700">
                Des forfaits adaptés à vos besoins spécifiques, vous offrant la flexibilité et le choix.
              </Text>
            </Box>
            <Box p={6} borderRadius="md" bg="gray.50">
              <Heading fontSize="xl" mb={4} color="orange.500">Assistance clientèle</Heading>
              <Text fontSize="md" color="gray.700">
                Un service client réactif, disponible 24/7 pour répondre à toutes vos questions et vous assister en cas de besoin.
              </Text>
            </Box>
            <Box p={6} borderRadius="md" bg="gray.50">
              <Heading fontSize="xl" mb={4} color="orange.500">Promotions exclusives</Heading>
              <Text fontSize="md" color="gray.700">
                Des promotions et des offres spéciales conçues pour récompenser notre clientèle fidèle.
              </Text>
            </Box>
            <Box p={6} borderRadius="md" bg="gray.50">
              <Heading fontSize="xl" mb={4} color="orange.500">Couverture étendue</Heading>
              <Text fontSize="md" color="gray.700">
                Une couverture réseau étendue pour que vous ne perdiez jamais le fil de vos communications.
              </Text>
            </Box>
            <Box p={6} borderRadius="md" bg="gray.50">
              <Heading fontSize="xl" mb={4} color="orange.500">Service digitalisé</Heading>
              <Text fontSize="md" color="gray.700">
                Une gestion autonome de vos services grâce à notre application, simplifiant votre quotidien.
              </Text>
            </Box>
          </SimpleGrid>
        </Box>

        {/* Section 3: Notre Histoire */}
        <Box mb={16} textAlign="center">
          <Heading fontSize="3xl" mb={6} color="orange.500">
            Notre Histoire
          </Heading>
          <Text fontSize="lg" color="gray.700" maxW="80%" mx="auto" lineHeight="taller">
            Depuis sa création, Orange Tunisie s’est engagée à fournir les meilleures solutions de télécommunications, tout en jouant un rôle actif dans le développement social et économique de la Tunisie. Nous avons constamment évolué pour répondre aux besoins de nos clients, tout en innovant pour l'avenir.
          </Text>
        </Box>

        {/* Section 4: Impact Social et Éducation */}
        <Box mb={16} textAlign="center" bg="orange.50" py={10} px={6} borderRadius="md">
          <Heading fontSize="3xl" mb={6} color="orange.500">
            Impact Social et Éducation
          </Heading>
          <Text fontSize="lg" color="gray.700" maxW="80%" mx="auto" lineHeight="taller">
            Orange Tunisie, en partenariat avec la Fondation Orange, s’engage à rendre le numérique accessible à tous, notamment aux jeunes en difficulté, aux femmes en situation précaire, et aux personnes en situation de handicap. Grâce à des initiatives telles que les écoles numériques et le concours WikiChallenge, nous transformons l’éducation en Tunisie.
          </Text>
        </Box>

        {/* Section 5: Engagement Continu */}
        <Box textAlign="center" mb={16}>
          <Heading fontSize="3xl" mb={6} color="orange.500">
            Notre Engagement Continu
          </Heading>
          <Text fontSize="lg" color="gray.700" maxW="80%" mx="auto" lineHeight="taller">
            En tant que premier opérateur alternatif convergent en Tunisie, Orange Tunisie continue d'innover et de s'engager en matière de responsabilité sociale. Nous restons à l'écoute de nos clients et de la société pour anticiper leurs besoins et les soutenir dans un monde en constante évolution.
          </Text>
        </Box>
        
      </Container>
      <Footer />
    </Box>
  );
};

export default AboutUs;
