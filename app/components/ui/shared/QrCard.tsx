import React from 'react';
import { View, Text, Image } from 'react-native';

const qrImage = require('assets/images/qr_code.png');

const QrCard: React.FC = () => (
  <View className="bg-white rounded-2xl mb-1 items-center justify-center overflow-hidden relative w-32 h-32">
    <Image
      source={qrImage}
      style={{ position: 'absolute', left: 8, top: 5, width: '85%', height: '85%', zIndex: 0 }}
      resizeMode="cover"
    />
    <Text className="text-xs mt-28 text-gray-700 font-bold z-10">scan here</Text>
  </View>
);

export default QrCard; 