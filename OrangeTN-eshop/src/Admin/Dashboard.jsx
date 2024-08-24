import React, { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import GererClients from './ManageClients';
import GestionContrats from './GestionContrats';
import GestionOffres from './GestionOffres';
import GestionReclamations from './Reclamation/rec';
import TopNavBar from './TopNavBar';
import { initialReclamations } from './Reclamation/GestionReclamations'; // Import your initialReclamations array

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('clients');
  const [pendingReclamations, setPendingReclamations] = useState(0);

  useEffect(() => {
    setActiveComponent('clients'); // Render GererClients by default
    // Calculate the number of pending réclamations
    const pendingCount = initialReclamations.filter(
      reclamation => reclamation.statut === 'En attente'
    ).length;
    setPendingReclamations(pendingCount);
  }, []);

  const renderContent = () => {
    switch (activeComponent) {
      case 'clients':
        return <GererClients />;
      case 'offres':
        return <GestionOffres />;
      case 'contrats':
        return <GestionContrats />;
      case 'reclamations':
        return <GestionReclamations />;
      default:
        return <Box p={4}><p>Sélectionnez une option du menu</p></Box>;
    }
  };

  return (
    <Flex direction="column" minH="100vh">
      <TopNavBar 
        pendingReclamations={pendingReclamations} 
        setActiveComponent={setActiveComponent} // Pass down the setter
      />
      <Flex flex="1">
        <Sidebar setActiveComponent={setActiveComponent} />
        <Box flex="1" p={4} bg="gray.100">
          {renderContent()}
        </Box>
      </Flex>
    </Flex>
  );
};

export default AdminDashboard;
