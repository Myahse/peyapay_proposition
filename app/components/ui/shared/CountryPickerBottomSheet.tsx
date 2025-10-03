/**
 * CountryPickerBottomSheet Component
 * 
 * A bottom sheet modal that displays a list of countries with their flags and dialing codes.
 * Users can search for countries by name or dialing code.
 * 
 * Features:
 * - Searchable country list
 * - Country flags display
 * - Dialing codes
 * - Smooth animations
 * - Touch feedback
 */

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';

// List of supported countries with their dialing codes and flag images
const countries = [
  { code: '+237', name: 'Cameroun', flag: require('assets/flags/cameroun.jpg') },
  { code: '+226', name: 'Burkina faso', flag: require('assets/flags/burkina.jpg') },
  { code: '+241', name: 'Gabon', flag: require('assets/flags/gabon.png') },
  { code: '+229', name: 'Bénin', flag: require('assets/flags/benin.png') },
  { code: '+223', name: 'Mali', flag: require('assets/flags/mali.png') },
  { code: '+225', name: 'Côte d\'Ivoire', flag: require('assets/flags/civ.png') },
  // Add more countries as needed
];

// Props interface for the component
interface CountryPickerBottomSheetProps {
  onSelect: (country: { code: string; name: string; flag: any }) => void;
}

/**
 * CountryPickerBottomSheet Component
 * @param onSelect - Callback function when a country is selected
 */
const CountryPickerBottomSheet: React.FC<CountryPickerBottomSheetProps> = ({ onSelect }) => {
  // State for search input
  const [search, setSearch] = useState('');
  
  // Filter countries based on search input
  const filtered = countries.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.includes(search)
  );

  return (
    <View className="w-full max-w-[420px] min-h-[200px] max-h-[420px] bg-white rounded-t-3xl px-4 pt-4 pb-2">
      {/* Search input field */}
      <TextInput
        className="border border-gray-300 rounded-xl px-4 py-2 mb-4 text-base"
        placeholder="Search country"
        value={search}
        onChangeText={setSearch}
      />
      
      {/* Scrollable list of countries */}
      <ScrollView className="w-full" style={{ maxHeight: 320 }}>
        {filtered.map((country, idx) => (
          <TouchableOpacity
            key={country.code}
            className="flex-row items-center py-3 border-b border-gray-100"
            onPress={() => onSelect(country)}
            activeOpacity={0.7}
          >
            {/* Country flag */}
            <Image source={country.flag} className="w-8 h-8 rounded-full mr-3" />
            
            {/* Country name */}
            <View className="flex-1">
              <Text className="text-base font-semibold text-black">{country.name}</Text>
            </View>
            
            {/* Country dialing code */}
            <Text className="text-base font-semibold text-gray-600">{country.code}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CountryPickerBottomSheet; 