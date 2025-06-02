import React from 'react';
import { View, Modal } from 'react-native';

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
    <View className="flex-1 justify-center items-center bg-black/30">
      <View className="bg-white rounded-2xl px-4 pt-8 pb-3 w-72 items-center shadow-lg">
        {children}
      </View>
    </View>
  </Modal>
);

export default ModalComponent; 