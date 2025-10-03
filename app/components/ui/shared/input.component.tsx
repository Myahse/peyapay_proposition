/**
 * PhoneInput Component
 * 
 * A specialized input component for phone number entry with formatting.
 * Features:
 * - Automatic phone number formatting
 * - Phone pad keyboard
 * - Placeholder support
 * - Editable state control
 * - Maximum length enforcement
 */

import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { formatPhoneNumber } from 'app/utils/format.utils';

/**
 * Props interface for PhoneInput component
 * @property value - Current phone number value
 * @property onChange - Callback function when phone number changes
 * @property placeholder - Placeholder text for the input
 * @property editable - Whether the input is editable
 */
interface PhoneInputProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  editable?: boolean;
}

/**
 * PhoneInput Component
 * Renders a formatted phone number input field with automatic formatting
 */
const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  placeholder = '07 XX XX XX XX',
  editable = true,
}) => {
  return (
    <View className="flex-row items-center bg-gray-300 rounded-lg w-full overflow-hidden">
      {/* Input section with phone number formatting */}
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
