import React from 'react';
import { View, Modal, TouchableWithoutFeedback } from 'react-native';

interface GlassModalProps {
  visible: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

const ModalComponent: React.FC<GlassModalProps> = ({ visible, onRequestClose, children }) => (
  <Modal
    animationType="fade"
    transparent
    visible={visible}
    onRequestClose={onRequestClose}
  >
    <TouchableWithoutFeedback onPress={onRequestClose}>
      <View className="flex-1 justify-center items-center bg-black/30">
        <TouchableWithoutFeedback>
          <View className="bg-white rounded-2xl px-4 pt-8 pb-3 w-72 items-center shadow-lg">
            {children}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

export default ModalComponent; 