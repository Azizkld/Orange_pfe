import React, { useState } from 'react';
import { Box, Flex, Text, Avatar, HStack, IconButton, Badge, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { FaBell } from 'react-icons/fa';
import Logout from './Logout'; // Import the Logout component

const TopNavBar = ({ pendingReclamations, setActiveComponent }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Box bg="white" boxShadow="md" px={4} py={2}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl" fontWeight="bold" color="orange.500">
          Admin Dashboard
        </Text>
        <HStack spacing={4}>
          <Box position="relative">
            <IconButton
              icon={<FaBell />}
              variant="ghost"
              aria-label="Notifications"
              onClick={() => setActiveComponent('reclamations')}
            />
            {pendingReclamations > 0 && (
              <Badge
                colorScheme="red"
                borderRadius="full"
                position="absolute"
                top="0"
                right="0"
                fontSize="0.8em"
                px={2}
              >
                {pendingReclamations}
              </Badge>
            )}
          </Box>
          <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
            <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Avatar name="Admin" src="https://bit.ly/broken-link" cursor="pointer" />
            </MenuButton>
            <MenuList>
              <Logout /> {/* Use the Logout component */}
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};

export default TopNavBar;
