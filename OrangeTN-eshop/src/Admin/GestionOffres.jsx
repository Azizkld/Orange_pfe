import React, { useState } from 'react';
import {
  Box,
  HStack,
  Text,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Input,
  Checkbox,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const initialOffres = [
  { id: 1, nom: 'Offre 100 Go', description: 'Accès Internet 100 Go', prix: '72 DT', duree: '30 jours', services: ['SMS Illimités'] },
  { id: 2, nom: 'Offre 75 Go', description: 'Accès Internet 75 Go', prix: '55 DT', duree: '30 jours', services: ['Appels Illimités'] },
  // Add more offers here
];

const GestionOffres = () => {
  const [offres, setOffres] = useState(initialOffres);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMore, setShowMore] = useState({});
  const [selectedOffre, setSelectedOffre] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const toast = useToast();

  const handleOpenDeleteModal = (offre) => {
    setSelectedOffre(offre);
    onOpen();
  };

  const handleDeleteOffre = () => {
    setOffres(offres.filter(offre => offre.id !== selectedOffre.id));
    onClose();
    toast({
      title: 'Offre supprimée.',
      description: 'L\'offre a été supprimée avec succès.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleShowMoreToggle = (id) => {
    setShowMore((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleCreateOffre = (newOffre) => {
    setOffres([...offres, { ...newOffre, id: offres.length + 1 }]);
    onCreateClose();
    toast({
      title: 'Offre créée.',
      description: 'La nouvelle offre a été créée avec succès.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleEditOffre = (updatedOffre) => {
    setOffres(offres.map(offre => (offre.id === updatedOffre.id ? updatedOffre : offre)));
    onEditClose();
    toast({
      title: 'Offre mise à jour.',
      description: 'L\'offre a été mise à jour avec succès.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const filteredOffres = offres.filter(offre =>
    offre.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={4}>
      <HStack spacing={4} mb={6}>
        <Input
          placeholder="Rechercher par nom d'offre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button leftIcon={<FaPlus />} colorScheme="green" onClick={onCreateOpen}>
          Ajouter une offre
        </Button>
      </HStack>

      <Box bg="white" boxShadow="sm" borderRadius="md" overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nom</Th>
              <Th>Description</Th>
              <Th>Prix</Th>
              <Th>Durée</Th>
              <Th>Services</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredOffres.map(offre => (
              <Tr key={offre.id}>
                <Td>{offre.nom}</Td>
                <Td>
                  {showMore[offre.id] || offre.description.length <= 30
                    ? offre.description
                    : `${offre.description.substring(0, 30)}...`}
                  {offre.description.length > 30 && (
                    <Button
                      variant="link"
                      colorScheme="orange"
                      size="sm"
                      onClick={() => handleShowMoreToggle(offre.id)}
                    >
                      {showMore[offre.id] ? "Afficher moins" : "Afficher plus"}
                    </Button>
                  )}
                </Td>
                <Td>{offre.prix}</Td>
                <Td>{offre.duree}</Td>
                <Td>
                  <VStack align="start">
                    {offre.services.map((service, index) => (
                      <Text key={index}>{service}</Text>
                    ))}
                  </VStack>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton
                      icon={<FaEdit />}
                      colorScheme="blue"
                      aria-label="Modifier l'offre"
                      onClick={() => {
                        setSelectedOffre(offre);
                        onEditOpen();
                      }}
                    />
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme="red"
                      aria-label="Supprimer l'offre"
                      onClick={() => handleOpenDeleteModal(offre)}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Modal for Deletion */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmer la suppression</ModalHeader>
          <ModalBody>
            Êtes-vous sûr de vouloir supprimer l'offre {selectedOffre?.nom} ?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleDeleteOffre}>
              Supprimer
            </Button>
            <Button variant="ghost" onClick={onClose} ml={3}>
              Annuler
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for Creating/Editing Offer */}
      <CreateEditOffreModal
        isOpen={isCreateOpen}
        onClose={onCreateClose}
        onSubmit={handleCreateOffre}
        initialData={{ nom: '', description: '', prix: '', duree: '', services: [] }}
        title="Créer une nouvelle offre"
      />

      <CreateEditOffreModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        onSubmit={handleEditOffre}
        initialData={selectedOffre || { nom: '', description: '', prix: '', duree: '', services: [] }}
        title="Modifier l'offre"
      />
    </Box>
  );
};

const CreateEditOffreModal = ({ isOpen, onClose, onSubmit, initialData, title }) => {
  const [formData, setFormData] = useState(initialData);
  const [selectedServices, setSelectedServices] = useState(initialData.services || []);
  const toast = useToast();

  const servicesList = [
    'SMS Illimités',
    'Appels Illimités',
    'Internet 100 Go',
    'Service Client Prioritaire'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleServiceChange = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmit = () => {
    // Validation: Ensure all fields are filled and price is a number
    if (!formData.nom || !formData.description || !formData.prix || !formData.duree) {
      toast({
        title: 'Erreur',
        description: 'Tous les champs doivent être remplis.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (isNaN(formData.prix)) {
      toast({
        title: 'Erreur',
        description: 'Le prix doit être un nombre.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onSubmit({ ...formData, prix: `${formData.prix} DT`, services: selectedServices });
    onClose();
  };

  // Update the form data when initialData changes
  React.useEffect(() => {
    setFormData(initialData);
    setSelectedServices(initialData.services || []);
  }, [initialData]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Input
            name="nom"
            placeholder="Nom de l'offre"
            value={formData.nom}
            onChange={handleChange}
            mb={3}
          />
          <Input
            name="description"
            placeholder="Description de l'offre"
            value={formData.description}
            onChange={handleChange}
            mb={3}
          />
          <Input
            name="prix"
            placeholder="Prix de l'offre"
            value={formData.prix}
            onChange={handleChange}
            mb={3}
          />
          <Input
            name="duree"
            placeholder="Durée de l'offre"
            value={formData.duree}
            onChange={handleChange}
            mb={3}
          />

          <Text mt={3} mb={1}>Sélectionnez les services :</Text>
          <VStack align="start">
            {servicesList.map((service) => (
              <Checkbox
                key={service}
                isChecked={selectedServices.includes(service)}
                onChange={() => handleServiceChange(service)}
              >
                {service}
              </Checkbox>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Sauvegarder
          </Button>
          <Button variant="ghost" onClick={onClose} ml={3}>
            Annuler
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GestionOffres;