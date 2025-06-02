import * as React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Logo from 'app/components/ui/shared/logo.component';
import CodeHolder from 'app/components/ui/shared/codeholder.component';
import KeyboardComponent from 'app/components/ui/shared/keyboard.component';

const DailyCodeScreen = () => {
  const [code, setCode] = useState('');
  const CODE_LENGTH = 4;

  const handleKeyPress = (num: string) => {
    if (code.length < CODE_LENGTH) setCode(code + num);
  };
  const handleDelete = () => {
    if (code.length > 0) setCode(code.slice(0, -1));
  };

  return (
    <View className="flex-1 bg-white px-6 pt-8 pb-4">
      <View className="items-center mt-8 mb-4">
        <Logo />
      </View>
      <Text className="text-xl font-bold text-center mb-2">Code du jour</Text>
      <Text className="text-sm text-center text-gray-600 mb-6">
        Veuillez saisir votre code du jour{"\n"}à 4 chiffres pour continuer.
      </Text>
      <CodeHolder value={code} length={CODE_LENGTH} />
      <KeyboardComponent onKeyPress={handleKeyPress} onDelete={handleDelete} />
      <View className="items-center mt-8">
        <TouchableOpacity>
          <Text className="text-gray-400 text-base font-bold">
            <Text style={{ fontSize: 32 }}>🔒</Text> Utiliser une empreinte digitale
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DailyCodeScreen; 