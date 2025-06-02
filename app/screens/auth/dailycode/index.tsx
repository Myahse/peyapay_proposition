// Daily Code Screen for entering the daily 4-digit code
import * as React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Logo from 'app/components/ui/shared/logo.component';
import CodeHolder from 'app/components/ui/shared/codeholder.component';
import KeyboardComponent from 'app/components/ui/shared/keyboard.component';

const DailyCodeScreen = () => {
  // State for the daily code value
  const [code, setCode] = useState('');
  const CODE_LENGTH = 4;

  // Keypad layout (matches OTP page)
  const keypad = [
    ['', '', '', ''],
    ['9', '3', '2', '6'],
    ['0', '4', '7', '1'],
    ['5', '8', 'finger', 'del'],
  ];

  // Handle number key press
  const handleKeyPress = (num: string) => {
    if (num === 'finger') {
      // No action for fingerprint key (not implemented)
      return;
    }
    if (code.length < CODE_LENGTH) setCode(code + num);
  };
  // Handle delete key press
  const handleDelete = () => {
    if (code.length > 0) setCode(code.slice(0, -1));
  };

  return (
    <View className="flex-1 bg-white px-6 pt-24 pb-4">
      {/* Logo */}
      <View className="items-center mt-12 mb-12">
        <Logo />
      </View>
      {/* Title and subtitle */}
      <Text className="text-xl font-bold text-center mb-4">Code du jour</Text>
      <Text className="text-sm text-center text-gray-600 mb-6">
        Veuillez saisir votre code du jour{"\n"}à 4 chiffres pour continuer.
      </Text>
      {/* Code input row (uses shared CodeHolder) */}
      <CodeHolder value={code} length={CODE_LENGTH} />
      {/* Keypad */}
      <KeyboardComponent keypad={keypad} onKeyPress={handleKeyPress} onDelete={handleDelete} />
    </View>
  );
};

export default DailyCodeScreen; 