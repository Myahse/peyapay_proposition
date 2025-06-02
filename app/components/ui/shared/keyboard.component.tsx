import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface KeyboardComponentProps {
  keypad?: string[][];
  onKeyPress: (num: string) => void;
  onDelete: () => void;
}

const defaultKeypad = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', 'del'],
];

const KeyboardComponent: React.FC<KeyboardComponentProps> = ({ keypad = defaultKeypad, onKeyPress, onDelete }) => {
  return (
    <View className="items-center mb-4">
      {keypad.map((row, i) => (
        <View key={i} className="flex-row ">
          {row.map((key, j) => (
            key === '' ? (
              <View key={`empty-${i}-${j}`} className="w-14 h-14 mx-2" />
            ) : (
              <TouchableOpacity
                key={`keypad-${i}-${j}`}
                className="w-14 h-14 mx-2 justify-center items-center"
                onPress={() => key === 'del' ? onDelete() : onKeyPress(key)}
                activeOpacity={0.6}
              >
                {key === 'finger' ? (
                  <MaterialIcons name="fingerprint" size={28} color="#888" />
                ) : key === 'del' ? (
                  <MaterialIcons name="backspace" size={24} color="#000" />
                ) : (
                  <Text className="text-2xl font-bold text-black">{key}</Text>
                )}
              </TouchableOpacity>
            )
          ))}
        </View>
      ))}
    </View>
  );
};

export default KeyboardComponent; 