import React from 'react';
import { View, TextInput, Text } from 'react-native';

// Props for the PhoneInput component
interface PhoneInputProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  editable?: boolean;
}

// PhoneInput component
const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  placeholder = '07 XX XX XX XX',
  editable = true,
}) => {
  return (
    <View className="flex-row items-center bg-gray-300 rounded-lg w-full overflow-hidden">
      {/* Flag section */}
      <View className="bg-gray-300 px-3 h-10 justify-center items-center">
        {/* Ivory Coast flag */}
        <Text style={{ fontSize: 18 }}>🇨🇮</Text>
      </View>
      {/* Input section */}
      <TextInput
        className="flex-1 px-3 h-15 bg-gray-200 text-base"
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType="phone-pad"
        editable={editable}
        placeholderTextColor="#A0AEC0"
        maxLength={12}
      />
    </View>
  );
};

export default PhoneInput;
