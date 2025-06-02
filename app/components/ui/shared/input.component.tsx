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
const formatPhoneNumber = (input: string) => {
  const digits = input.replace(/\D/g, '');
  if (digits.length < 10) {
    return input; // For live input, don't throw, just return as is
  }
  let formatted = '';
  let mainNumber = digits.slice(-10); // last 10 digits
  let countryCode = digits.length > 10 ? digits.slice(0, digits.length - 10) : '';

  for (let i = 0; i < mainNumber.length && i < 10; i++) {
    if (i === 2 || i === 4 || i === 6 || i === 8) formatted += ' ';
    formatted += mainNumber[i];
  }

  if (countryCode) {
    formatted = `+${countryCode} ${formatted}`;
  }
  return formatted;
};

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
        onChangeText={text => onChange(formatPhoneNumber(text))}
        placeholder={placeholder}
        keyboardType="phone-pad"
        editable={editable}
        placeholderTextColor="#A0AEC0"
        maxLength={14} // 10 digits + 4 spaces
      />
    </View>
  );
};

export default PhoneInput;
