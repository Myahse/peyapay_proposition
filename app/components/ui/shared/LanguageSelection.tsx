import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

const languages = [
  { key: 'fr', label: 'French', icon: require('../../../../assets/flags/france.png') },
  { key: 'en', label: 'English', icon: require('../../../../assets/flags/usa.png') },
  { key: 'ma', label: 'Mandingo', icon: require('../../../../assets/flags/civ.png') },
  { key: 'no', label: 'Noussi', icon: null },
  { key: 'ba', label: 'Baoule', icon: null },
  { key: 'be', label: 'Bete', icon: null },
];

interface LanguageSelectionProps {
  onSelect?: (key: string) => void;
  initialSelected?: string;
  showTitle?: boolean;
}

const LanguageSelection: React.FC<LanguageSelectionProps> = ({ onSelect, initialSelected = 'fr', showTitle = true }) => {
  const [selected, setSelected] = useState(initialSelected);

  const handleSelect = (key: string) => {
    setSelected(key);
    setTimeout(() => {
      if (onSelect) onSelect(key);
    }, 300);
  };

  return (
    <View className="bg-white rounded-t-3xl pb-4 pt-2 px-4 w-full max-w-[420px] min-h-[140px] shadow-2xl items-center">
      {showTitle && (
        <>
          <Text className="text-2xl font-bold mb-1 text-black text-center">What is your language?</Text>
          <Text className="text-sm text-gray-700 mb-4 text-center">Please select what language do you speak</Text>
        </>
      )}
      <ScrollView className="w-full" style={{ maxHeight: 320 }} showsVerticalScrollIndicator={false}>
        <View className="flex-col justify-center items-center w-full">
          {languages.map((lang, idx) => (
            <TouchableOpacity
              key={lang.key}
              className={`flex-row items-center w-full${idx !== languages.length - 1 ? ' mb-3' : ''}`}
              onPress={() => handleSelect(lang.key)}
              activeOpacity={0.7}
            >
              <View className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center mr-4 ${selected === lang.key ? 'border-yellow-500' : 'border-gray-200'} bg-white`}>
                {lang.icon ? (
                  <Image source={lang.icon} className="w-16 h-16 rounded-xl" resizeMode="contain" />
                ) : (
                  <View className="w-16 h-16 rounded-xl bg-gray-200" />
                )}
              </View>
              <Text className={`text-lg font-semibold ${selected === lang.key ? 'text-yellow-500' : 'text-black'}`}>{lang.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default LanguageSelection; 