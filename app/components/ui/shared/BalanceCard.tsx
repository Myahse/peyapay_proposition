import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import QrCard from './QrCard';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'app/navigation/stack.navigator';

// Reusable Balance Display Component
const BalanceDisplay: React.FC<{ balance: string; showBalance: boolean; toggleBalance: () => void }> = ({ balance, showBalance, toggleBalance }) => (
  <TouchableOpacity onPress={toggleBalance}>
    <Text className="text-4xl font-heavy tracking-widest mb-2">
      {showBalance ? (
        <>
          {balance}
          <Text className="text-xs align-super"> Fcfa</Text>
        </>
      ) : (
        '----'
      )}
    </Text>
  </TouchableOpacity>
);

const BalanceCard: React.FC = () => {
  // State to control balance visibility
  const [showBalance, setShowBalance] = useState(false);
  const balance = '12 000.00';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Handler to toggle balance visibility
  const toggleBalance = () => setShowBalance(v => !v);

  return (
    <View className="bg-card rounded-3xl h-36 p-2 flex-row items-center mb-4 overflow-hidden">
      {/* QR code section */}
      <View className="items-center ml-0 mr-2 z-10">
        <Pressable onPress={() => navigation.navigate('MyCard')} android_ripple={null} style={{ borderRadius: 16 }}>
          <QrCard />
        </Pressable>
      </View>
      {/* Balance section */}
      <View className="items-center z-10">
        {/* Total balance label */}
        <View className="flex-row ml-5 items-center mb-1 w-full">
          <Text className="text-2xl text-black mr-1 font-bold">Total balance</Text>
          <TouchableOpacity onPress={toggleBalance}>
            <MaterialIcons name={showBalance ? 'visibility' : 'visibility-off'} size={16} color="#222" />
          </TouchableOpacity>
        </View>
        {/* Balance value, hidden or shown based on state */}
        <BalanceDisplay balance={balance} showBalance={showBalance} toggleBalance={toggleBalance} />
        {/* Deposit button */}
        <TouchableOpacity className="bg-black rounded-full h-8 w-40 px-3 flex-row items-center justify-between self-start">
          <Text className="text-white font-bold flex-shrink">Make a deposit</Text>
          <Text className="text-white text-3xl font-bold leading-none self-center">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BalanceCard; 