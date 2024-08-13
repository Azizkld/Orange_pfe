import React from 'react';
import { HStack, Input, Select } from '@chakra-ui/react';

const ReclamationFilters = ({ searchTerm, setSearchTerm, filterDate, setFilterDate, filterStatus, setFilterStatus }) => {
  return (
    <HStack spacing={4} mb={4}>
      <Input
        placeholder="Rechercher par nom..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Input
        type="date"
        placeholder="Filtrer par date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
        w="200px"
      />
      <Select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        w="200px"
      >
        <option value="Toutes">Toutes</option>
        <option value="En attente">En attente</option>
        <option value="Résolu">Résolu</option>
      </Select>
    </HStack>
  );
};

export default ReclamationFilters;
