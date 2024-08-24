import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:8050/api/v1/auth/authenticate";

const Login = () => {
    const [cin, setCin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cin: cin,
                password: password,
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            console.log('API Response:', data);
            
            // Check if the user_id is 2
            if (data.user_id === 2) {
                // Set the cookies
                Cookies.set('accessToken', data.access_token, { expires: 222222 });
                Cookies.set('userID', data.user_id, { expires: 22222 });
                
                console.log('Admin logged in:', data.user_id);
                
                // Redirect to the admin dashboard
                navigate('/admindashboard');
            } else {
                console.error('Unauthorized: Only user with ID 2 can access the admin dashboard.');
                alert('Unauthorized: Only admin can access this page.');
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    };

    return (
        <Flex minH="100vh" bg="gray.50">
            {/* Left Side - Brand Section */}
            <Box w={{ base: '100%', md: '50%' }} bg="orange.600" color="white" p={10} display="flex" alignItems="center" justifyContent="center">
                <VStack spacing={6} align="flex-start">
                    <Text fontSize="4xl" fontWeight="bold">Orange TN Admin</Text>
                    <Text fontSize="lg">Interface Admin Sécurisée</Text>
                </VStack>
            </Box>

            {/* Right Side - Login Form */}
            <Box w={{ base: '100%', md: '50%' }} p={10} display="flex" alignItems="center" justifyContent="center" bg="white">
                <Container maxW="md">
                    <VStack spacing={6} align="flex-start">
                        <Text fontSize="2xl" fontWeight="bold" color="orange.600">Log in</Text>
                        <FormControl>
                            <FormLabel color="orange.600">CIN</FormLabel>
                            <Input
                                type="text"
                                placeholder="Saisir votre CIN"
                                value={cin}
                                onChange={(e) => setCin(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel color="orange.600">Mot de passe</FormLabel>
                            <Input
                                type="password"
                                placeholder="Saisir votre mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button colorScheme="orange" onClick={handleSubmit} w="full">Se Connecter</Button>
                    </VStack>
                </Container>
            </Box>
        </Flex>
    );
};

export default Login;
