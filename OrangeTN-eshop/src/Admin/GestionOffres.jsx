import React, { useState, useEffect } from 'react';
import {
  Box,
  HStack,
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
  VStack,
  Checkbox,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import Cookies from 'js-cookie';

const GestionOffres = () => {
  const [offres, setOffres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOffre, setSelectedOffre] = useState(null);
  const [expandedDescription, setExpandedDescription] = useState({});
  const [formData, setFormData] = useState({
    rpName: '',
    rpDesc: '',
    rpPrice: '',
    rpValidationDays: '',
    serviceNames: [],
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const toast = useToast();

  const servicesList = [
    { id: 1, name: 'Appels Illimités' },
    { id: 2, name: 'Appels Internationaux' },
    { id: 4, name: 'SMS Illimités' },
    { id: 5, name: 'SMS International' },
    { id: 6, name: 'Internet Illimités' },
  ];

  // Fetch offers when the component mounts
  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const token = Cookies.get('accessToken'); // Get the token from cookies

        if (!token) {
          throw new Error('Token manquant. Veuillez vous reconnecter.');
        }

        const response = await fetch('http://localhost:8050/api/RatePlan/afficherTousOffres', {
          headers: {
            'Authorization': `Bearer ${token}`, // Send token in headers
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors du fetch des offres');
        }

        const data = await response.json();
        
        if (data.isSuccessfull) {
          setOffres(data.rateplans || []); // Set offres
        } else {
          throw new Error('Erreur dans la réponse du serveur');
        }
      } catch (error) {
        console.error(error);
        toast({
          title: 'Erreur',
          description: "Impossible de récupérer les offres",
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchOffres();
  }, [toast]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle service checkbox changes
  const handleServiceChange = (serviceId) => {
    setFormData((prevData) => ({
      ...prevData,
      serviceNames: prevData.serviceNames.includes(serviceId)
        ? prevData.serviceNames.filter((id) => id !== serviceId)
        : [...prevData.serviceNames, serviceId],
    }));
  };

  // Toggle description expansion
  const toggleDescription = (id) => {
    setExpandedDescription((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Handle form submission for creating a new offer
  const handleCreateOffre = async () => {
    if (!formData.rpName || !formData.rpDesc || !formData.rpPrice || !formData.rpValidationDays) {
      toast({
        title: 'Erreur',
        description: 'Tous les champs doivent être remplis.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (isNaN(formData.rpPrice) || isNaN(formData.rpValidationDays)) {
      toast({
        title: 'Erreur',
        description: 'Le prix et la durée doivent être des nombres.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const token = Cookies.get('accessToken'); // Get the token from cookies

      if (!token) {
        throw new Error('Token manquant. Veuillez vous reconnecter.');
      }

      const response = await fetch('http://localhost:8050/api/RatePlan/ajouterOffre', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rpName: formData.rpName,
          rpDesc: formData.rpDesc,
          rpPrice: formData.rpPrice,
          rpValidationDays: formData.rpValidationDays,
          serviceIds: formData.serviceNames,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'offre');
      }

      const newOffre = await response.json();
      setOffres([...offres, newOffre]); // Add the new offer to the state
      onCreateClose();
      setFormData({
        rpName: '',
        rpDesc: '',
        rpPrice: '',
        rpValidationDays: '',
        serviceNames: [],
      });
      toast({
        title: 'Succès',
        description: "Offre créée avec succès",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Erreur',
        description: "Impossible de créer l'offre",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle form submission for editing an existing offer
  const handleEditOffre = async () => {
    if (!formData.rpName || !formData.rpDesc || !formData.rpPrice || !formData.rpValidationDays) {
      toast({
        title: 'Erreur',
        description: 'Tous les champs doivent être remplis.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (isNaN(formData.rpPrice) || isNaN(formData.rpValidationDays)) {
      toast({
        title: 'Erreur',
        description: 'Le prix et la durée doivent être des nombres.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const token = Cookies.get('accessToken'); // Get the token from cookies

      if (!token) {
        throw new Error('Token manquant. Veuillez vous reconnecter.');
      }

      const response = await fetch(`http://localhost:8050/api/RatePlan/modifierOffre/${selectedOffre.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rpName: formData.rpName,
          rpDesc: formData.rpDesc,
          rpPrice: formData.rpPrice,
          rpValidationDays: formData.rpValidationDays,
          serviceIds: formData.serviceNames,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la modification de l\'offre');
      }

      const updatedOffre = await response.json();

      setOffres(
        offres.map((offre) =>
          offre.id === selectedOffre.id ? updatedOffre : offre
        )
      );
      onEditClose();
      toast({
        title: 'Succès',
        description: "Offre mise à jour avec succès",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Erreur',
        description: "Impossible de modifier l'offre",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle deletion of an offer by consuming the API
  const handleDeleteOffre = async () => {
    try {
      const token = Cookies.get('accessToken'); // Get the token from cookies
      if (!token) {
        throw new Error('Token manquant. Veuillez vous reconnecter.');
      }

      const response = await fetch(`http://localhost:8050/api/RatePlan/supprimerOffre/${selectedOffre.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Send token in headers
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'offre');
      }

      // Remove the deleted offer from the state
      setOffres(offres.filter((offre) => offre.id !== selectedOffre.id));
      onClose(); // Close the modal

      toast({
        title: 'Succès',
        description: "Offre supprimée avec succès",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Erreur',
        description: "Impossible de supprimer l'offre",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Search filter
  const filteredOffres = offres.filter((offre) =>
    offre.rpDesc && offre.rpDesc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={5}>
      <HStack spacing={4} mb={4}>
        <Input
          placeholder="Rechercher une offre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={onCreateOpen}>
          Ajouter Offre
        </Button>
      </HStack>

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
          {filteredOffres.map((offre) => (
            <Tr key={offre.id}>
              <Td>{offre.rpName}</Td>
              <Td>
                {expandedDescription[offre.id] || offre.rpDesc.length <= 30
                  ? offre.rpDesc
                  : `${offre.rpDesc.substring(0, 30)}...`}
                {offre.rpDesc.length > 30 && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => toggleDescription(offre.id)}
                  >
                    {expandedDescription[offre.id] ? 'Voir moins' : 'Voir plus'}
                  </Button>
                )}
              </Td>
              <Td>{offre.rpPrice} DT</Td>
              <Td>{offre.rpValidationDays} jours</Td>
              <Td>{offre.serviceNames.join(', ')}</Td>
              <Td>
                <IconButton
                  icon={<FaEdit />}
                  colorScheme="blue"
                  onClick={() => {
                    setSelectedOffre(offre);
                    setFormData({
                      rpName: offre.rpName,
                      rpDesc: offre.rpDesc,
                      rpPrice: offre.rpPrice,
                      rpValidationDays: offre.rpValidationDays,
                      serviceNames: offre.serviceNames.map(serviceName =>
                        servicesList.find(service => service.name === serviceName)?.id || null
                      ).filter(id => id !== null),
                    });
                    onEditOpen();
                  }}
                  mr={2}
                />
                <IconButton
                  icon={<FaTrash />}
                  colorScheme="red"
                  onClick={() => {
                    setSelectedOffre(offre);
                    onOpen();
                  }}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modals for editing and creating offers */}
      <Modal isOpen={isCreateOpen} onClose={onCreateClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ajouter une Offre</ModalHeader>
          <ModalBody>
            <VStack spacing={4}>
              <Input
                name="rpName"
                placeholder="Nom de l'offre"
                value={formData.rpName}
                onChange={handleChange}
              />
              <Input
                name="rpDesc"
                placeholder="Description de l'offre"
                value={formData.rpDesc}
                onChange={handleChange}
              />
              <Input
                name="rpPrice"
                placeholder="Prix de l'offre (DT)"
                value={formData.rpPrice}
                onChange={handleChange}
              />
              <Input
                name="rpValidationDays"
                placeholder="Durée de l'offre (jours)"
                value={formData.rpValidationDays}
                onChange={handleChange}
              />
              <VStack align="start">
                {servicesList.map((service) => (
                  <Checkbox
                    key={service.id}
                    isChecked={formData.serviceNames.includes(service.id)}
                    onChange={() => handleServiceChange(service.id)}
                  >
                    {service.name}
                  </Checkbox>
                ))}
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCreateOffre}>
              Enregistrer
            </Button>
            <Button variant="ghost" onClick={onCreateClose} ml={3}>
              Annuler
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modifier l'Offre</ModalHeader>
          <ModalBody>
            <VStack spacing={4}>
              <Input
                name="rpName"
                placeholder="Nom de l'offre"
                value={formData.rpName}
                onChange={handleChange}
              />
              <Input
                name="rpDesc"
                placeholder="Description de l'offre"
                value={formData.rpDesc}
                onChange={handleChange}
              />
              <Input
                name="rpPrice"
                placeholder="Prix de l'offre (DT)"
                value={formData.rpPrice}
                onChange={handleChange}
              />
              <Input
                name="rpValidationDays"
                placeholder="Durée de l'offre (jours)"
                value={formData.rpValidationDays}
                onChange={handleChange}
              />
              <VStack align="start">
                {servicesList.map((service) => (
                  <Checkbox
                    key={service.id}
                    isChecked={formData.serviceNames.includes(service.id)}
                    onChange={() => handleServiceChange(service.id)}
                  >
                    {service.name}
                  </Checkbox>
                ))}
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleEditOffre}>
              Enregistrer
            </Button>
            <Button variant="ghost" onClick={onEditClose} ml={3}>
              Annuler
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Supprimer l'Offre</ModalHeader>
          <ModalBody>
            <Text>Êtes-vous sûr de vouloir supprimer cette offre ?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={handleDeleteOffre} // Using the handleDeleteOffre function
              mr={3}
            >
              Supprimer
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Annuler
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GestionOffres;
