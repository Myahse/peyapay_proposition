import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface BiometricsOptionsProps {
  onSelectFingerprint: () => void;
  onSelectFace: () => void;
  showFingerprint?: boolean;
  showFace?: boolean;
}

const BiometricsOptions: React.FC<BiometricsOptionsProps> = ({ onSelectFingerprint, onSelectFace, showFingerprint = true, showFace = true }) => {
  return (
    <View className="bg-white rounded-t-3xl pb-4 pt-2 px-4 w-full max-w-[420px] min-h-[140px] shadow-2xl">
      {/* Fingerprint Option */}
      {showFingerprint && (
        <TouchableOpacity
          className="flex-row items-center py-4 border-b border-gray-200"
          onPress={onSelectFingerprint}
          activeOpacity={0.7}
        >
          <View className="bg-gray-100 rounded-xl p-3 mr-4">
            <MaterialIcons name="fingerprint" size={32} color="#222" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-bold text-black">Fingerprint</Text>
            <Text className="text-xs text-gray-600">Use the fingerprint sensor to add your fingerprint.</Text>
          </View>
          <MaterialIcons name="chevron-right" size={28} color="#888" />
        </TouchableOpacity>
      )}
      {/* Face Unlock Option */}
      {showFace && (
        <TouchableOpacity
          className="flex-row items-center py-4"
          onPress={onSelectFace}
          activeOpacity={0.7}
        >
          <View className="bg-gray-100 rounded-xl p-3 mr-4">
            <MaterialIcons name="face" size={32} color="#222" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-bold text-black">Face unlock</Text>
            <Text className="text-xs text-gray-600">Use your phone&apos;s front camera to add your face.</Text>
          </View>
          <MaterialIcons name="chevron-right" size={28} color="#888" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BiometricsOptions; 