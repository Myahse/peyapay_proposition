import * as React from 'react';
import { View, Text } from 'react-native';

interface CodeHolderProps {
  value: string;
  length?: number;
  currentIndex?: number;
  dotChar?: string;
}

const CodeHolder: React.FC<CodeHolderProps> = ({ value, length = 4, currentIndex = -1, dotChar = '•' }) => {
  return (
    <View className="flex-row justify-center items-center bg-white rounded-xl border-2 border-gray-200 px-2 py-2 w-64 mx-auto mb-10">
      {Array.from({ length }).map((_, i) => {
        let bg = 'bg-gray-100';
        let border = '#E5E7EB';
        if (currentIndex === i) {
          bg = 'bg-green-500';
          border = '#22C55E';
        }
        return (
          <View
            key={i}
            className={`w-12 h-12 mx-1 rounded-lg justify-center items-center ${bg}`}
            style={{ borderWidth: 2, borderColor: border }}
          >
            <Text className="text-2xl font-bold text-black">{value[i] ? dotChar : '—'}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default CodeHolder; 