import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import ModalComponent from 'app/components/modals/modal.component';

const ModalScreen = () => {
  // Void function to close the modal (does nothing)
  const handleClose = () => {};

  return (
    <ModalComponent visible={true} onRequestClose={handleClose}>
      <Text className="text-base font-bold text-center mb-2">Modal Title</Text>
      <Text className="text-xs text-center text-black mb-1">Your message here.</Text>
      <TouchableOpacity className="mt-4" onPress={handleClose}>
        <Text className="text-black font-bold text-base">Close</Text>
      </TouchableOpacity>
    </ModalComponent>
  );
};

export default ModalScreen; 