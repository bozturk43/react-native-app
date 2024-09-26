import React from 'react';
import { Button, Modal, Text, VStack } from 'native-base';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void; // Modal kapatma fonksiyonu
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onConfirm,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.Header>Onay Gerekli</Modal.Header>
        <Modal.Body>
          <Text>Bu işlemi onaylıyor musunuz?</Text>
        </Modal.Body>
        <Modal.Footer>
          <VStack space={2} width="100%" alignItems="center">
            <Button onPress={() => { onConfirm(); onClose(); }} colorScheme="success">
              Evet
            </Button>
            <Button onPress={() => { onClose(); }} colorScheme="danger">
              Hayır
            </Button>
          </VStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ConfirmationDialog;
