import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Tag, HStack, Button } from '@chakra-ui/react';

const ReclamationTable = ({ reclamations, handleShowMoreToggle, showMore, handleOpenReplyModal, handleOpenDeleteModal }) => {
  return (
    <Box bg="white" boxShadow="sm" borderRadius="md" overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Description</Th>
            <Th>Nom</Th>
            <Th>Prénom</Th>
            <Th>CIN</Th>
            <Th>Statut</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reclamations.map(reclamation => (
            <Tr key={reclamation.id}>
              <Td>{reclamation.date}</Td>
              <Td>
                {showMore[reclamation.id] || reclamation.description.length <= 30
                  ? reclamation.description
                  : `${reclamation.description.substring(0, 30)}...`}
                {reclamation.description.length > 30 && (
                  <Button
                    variant="link"
                    colorScheme="orange"
                    size="sm"
                    onClick={() => handleShowMoreToggle(reclamation.id)}
                  >
                    {showMore[reclamation.id] ? "Afficher moins" : "Afficher plus"}
                  </Button>
                )}
              </Td>
              <Td>{reclamation.user.nom}</Td>
              <Td>{reclamation.user.prenom}</Td>
              <Td>{reclamation.user.cin}</Td>
              <Td>
                <Tag colorScheme={reclamation.statut === "Résolu" ? "green" : "orange"}>
                  {reclamation.statut}
                </Tag>
              </Td>
              <Td>
                <HStack>
                  <Button onClick={() => handleOpenReplyModal(reclamation)} colorScheme="blue">Répondre</Button>
                  <Button onClick={() => handleOpenDeleteModal(reclamation)} colorScheme="red">Supprimer</Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ReclamationTable;
