import React from 'react';
import { View, Text } from 'react-native';

interface EventCardProps {
  title: string;
  subtitle: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, subtitle }) => {
  return (
    <View className="bg-slate-50 p-4 rounded-xl shadow-md mb-2 mr-2 w-80 h-48">
      <Text className="text-lg font-bold">{title}</Text>
      <Text className="text-sm text-gray-600">{subtitle}</Text>
    </View>
  );
};

export default EventCard; 