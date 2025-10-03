import React from 'react';
import { View } from 'react-native';
import QrCard from 'app/components/ui/shared/QrCard';

const MyCardScreen = () => {
  return (
    <View className="flex-1 bg-white justify-center items-center">
      {/* QR Code Card */}
      <View className="bg-[#FAAF05] rounded-2xl p-4 mt-8" style={{ shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, minHeight: 320, minWidth: 280, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ transform: [{ scale: 1.7 }] }}>
          <QrCard />
        </View>
      </View>
    </View>
  );
};

export default MyCardScreen; 