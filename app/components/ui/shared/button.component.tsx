import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import React from 'react';

interface UIButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const UIButton = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
}: UIButtonProps) => {
  // Définition des largeurs en fonction de la taille
  const getWidthClass = () => {
    if (fullWidth) return 'w-full';
    
    switch (size) {
      case 'sm': return 'w-32';  // 128px
      case 'md': return 'w-40';  // 160px
      case 'lg': return 'w-48';  // 192px
      case 'xl': return 'w-64';  // 256px
      default: return 'w-40';    // md par défaut
    }
  };

  // Couleurs de texte
  const getTextColor = () => {
    return variant === 'secondary' || variant === 'light' 
      ? 'text-blue-500' 
      : 'text-white';
  };

  // Style de base + variantes
  const getButtonClass = () => {
    const base = `rounded-full justify-center items-center flex-row h-12 ${getWidthClass()}`;
    
    switch (variant) {
      case 'primary': return `${base} bg-gray-500`;
      case 'secondary': return `${base} bg-blue-50`;
      case 'danger': return `${base} bg-red-500`;
      case 'success': return `${base} bg-green-500`;
      case 'light': return `${base} bg-white border border-blue-500`;
      default: return `${base} bg-blue-500`;
    }
  };

  return (
    <TouchableOpacity
      className={`${getButtonClass()} ${disabled ? 'opacity-60' : ''}`}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor().includes('white') ? '#fff' : '#007AFF'} />
      ) : (
        <View className="flex-row items-center">
          {icon && <View className="mr-2">{icon}</View>}
          <Text className={`font-semibold ${getTextColor()} ${
            size === 'sm' ? 'text-sm' : 
            size === 'xl' ? 'text-lg' : 'text-base'
          }`}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default UIButton;