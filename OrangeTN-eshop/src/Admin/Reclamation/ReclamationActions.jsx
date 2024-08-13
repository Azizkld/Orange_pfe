import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea } from '@chakra-ui/react';

export const ReplyModal = ({ isOpen, onClose, handleSendResponse, response, setResponse }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Répondre à la réclamation</ModalHeader>
      <ModalBody>
        <Textarea
          placeholder="Écrire une réponse..."
          value={response}
          onChange={(e) => setResponse(e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" onClick={handleSendResponse}>
          Envoyer la réponse
        </Button>
        <Button variant="ghost" onClick={onClose} ml={3}>
          Annuler
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export const DeleteModal = ({ isOpen, onClose, handleDeleteReclamation, selectedReclamation }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Confirmer la suppression</ModalHeader>
      <ModalBody>
        Êtes-vous sûr de vouloir supprimer cette réclamation ?
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="red" onClick={() => handleDeleteReclamation(selectedReclamation?.id)}>
          Supprimer
        </Button>
        <Button variant="ghost" onClick={onClose} ml={3}>
          Annuler
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
