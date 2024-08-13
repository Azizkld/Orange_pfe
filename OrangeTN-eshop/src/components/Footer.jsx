// Footer.js
import React from 'react';
import { Box, Container, Stack, Link, IconButton, Text, Divider, Flex, Button, Image } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { SiAppstore, SiGoogleplay } from 'react-icons/si';

const Footer = () => {
    return (
        <Box bg="black" color="white" py={10}>
            <Container maxW="container.xl">
                <Stack direction={{ base: 'column', md: 'row' }} spacing={8} justify="space-between" align="center">
                    <Stack direction="row" spacing={6}>
                        <Link href="https://www.facebook.com/orange.tn/?locale=fr_FR" >
                            <IconButton
                                variant="ghost"
                                color="white"
                                aria-label="Facebook"
                                icon={<FaFacebook />}
                                _hover={{ color: 'orange.400' }}
                            />
                        </Link>
                        <Link href="https://www.instagram.com/orange_tunisie/?hl=ar" >
                            <IconButton
                                variant="ghost"
                                color="white"
                                aria-label="Instagram"
                                icon={<FaInstagram />}
                                _hover={{ color: 'orange.400' }}
                            />
                        </Link>
                        <Link href="https://www.linkedin.com/company/orange-tunisie/" >
                            <IconButton
                                variant="ghost"
                                color="white"
                                aria-label="LinkedIn"
                                icon={<FaLinkedin />}
                                _hover={{ color: 'orange.400' }}
                            />
                        </Link>
                        <Link href="https://www.youtube.com/@OrangeFrance" >
                            <IconButton
                                variant="ghost"
                                color="white"
                                aria-label="YouTube"
                                icon={<FaYoutube />}
                                _hover={{ color: 'orange.400' }}
                            />
                        </Link>
                    </Stack>

                    <Flex>
                        <Button
                            as="a"
                            href="https://www.apple.com/app-store/"
                            variant="ghost"
                            color="white"
                            leftIcon={<SiAppstore />}
                            _hover={{ color: 'orange.400' }}
                        >
                            App Store
                        </Button>
                        <Button
                            as="a"
                            href="https://play.google.com/store/games?device=windows&pli=1"
                            variant="ghost"
                            color="white"
                            leftIcon={<SiGoogleplay />}
                            _hover={{ color: 'orange.400' }}
                        >
                            Google Play
                        </Button>
                    </Flex>
                </Stack>

                <Divider my={6} borderColor="gray.600" />

                <Flex direction={{ base: 'column', md: 'row' }} justify="space-between">

                <Stack spacing={6}>
                        <Link href="http://localhost:3000/acheter-numero">SIM</Link>
                        <Link href="http://localhost:3000/acheter-numero">eSIM</Link>
                        <Link href="http://localhost:3000/convertir-sim/esim">Changer SIM vers eSim </Link>
                        <Link href="http://localhost:3000/convertir-esim/sim">Changer eSIM vers Sim </Link>
                    </Stack>

                    <Stack spacing={6}>
                        <Link href="http://localhost:3000/PROFILE">Profil</Link>
                        <Link href="http://localhost:3000/RECLAMATION">Reclamamtion</Link>
                        
                       
                    </Stack>

                    <Stack spacing={6}>
                        <Link href="http://localhost:3000/OFFRES">offres</Link>
                        <Link href="http://localhost:3000/CONTRAT">contrats</Link>
                    </Stack>

                  

                    <Stack spacing={6}>
                        <Link href="http://localhost:3000/APROPOS">Apropos</Link>
                        <Link href="https://www.google.fr/maps/search/Orange/@44.119139,4.8254913,15z?entry=ttu">boutique</Link>
                        
                       
                    </Stack>
                </Flex>

                <Divider my={6} borderColor="gray.600" />

                <Stack direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
                    <Text>© Orange 2024</Text>
                    <Stack direction="row" spacing={4}>
                        <Link href="#">Informations légales</Link>
                        <Link href="#">Conditions générales</Link>
                        <Link href="#">Fondation Orange</Link>
                        <Link href="#">Carrières</Link>
                        <Link href="#">Actualités</Link>
                        <Link href="#">Orange Developer Center</Link>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
