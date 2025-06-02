import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { UIButton } from 'app/components/ui';
import UIText from 'app/components/ui/shared/text.component';
import Logo from 'app/components/ui/shared/logo.component';
import { MaterialIcons } from '@expo/vector-icons';
import { ModalComponent } from 'app/components/modals';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import KeyboardComponent from 'app/components/ui/shared/keyboard.component';
import { RootStackParamList } from 'app/navigation/stack.navigator';

const logo = require('assets/icon.png'); // Logo for the screen

// PinRow: renders a row of 4 PIN holders inside a bordered container
const PinRow = ({ value }: { value: string }) => (
  <View className="flex-row justify-center mb-4 border-2 border-gray-400 rounded-xl bg-white px-2 py-2 w-64 mx-auto">    
    {[0, 1, 2, 3].map(i => (
      <View
        key={i}
        className={`w-12 h-12 mx-1 rounded-lg bg-gray-100 justify-center items-center`}
      >
        {/* Show a dot if the digit is present */}
        <Text className="text-3xl font-bold text-gray-700">{value[i] ? '•' : ''}</Text>
      </View>
    ))}
  </View>
);

// Utility to shuffle an array
function shuffle(array: string[]): string[] {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const PinScreen = () => {
  // State for the first and confirmation PINs
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isConfirm, setIsConfirm] = useState(false); // Whether user is entering confirmation PIN
  const [keypad, setKeypad] = useState<string[][]>([['', '', '', ''], ['', '', '', ''], ['', '', '', '']]);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Check if PINs match when both are filled
  const pinsMatch = pin.length === 4 && confirmPin.length === 4 && pin === confirmPin;

  // Generate a randomized keypad layout
  const generateKeypad = (): string[][] => {
    const numbers = shuffle(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
    return [
      numbers.slice(0, 4),
      numbers.slice(4, 8),
      ['', ...numbers.slice(8, 10), 'del'],
    ];
  };

  // Shuffle keypad on mount
  useEffect(() => {
    setKeypad(generateKeypad());
  }, []);

  // Handle number press on keypad
  const handleKeyPress = (num: string): void => {
    if (!isConfirm) {
      if (pin.length < 4) {
        setPin(pin + num);
        if (pin.length + 1 === 4) setIsConfirm(true); // Move to confirm after 4 digits
      }
    } else {
      if (confirmPin.length < 4) {
        setConfirmPin(confirmPin + num);
      }
    }
  };

  // Handle delete key on keypad
  const handleDelete = (): void => {
    if (isConfirm) {
      if (confirmPin.length > 0) {
        setConfirmPin(confirmPin.slice(0, -1));
      } else {
        // If we're in confirm mode and the confirm PIN is empty, go back to first PIN
        setIsConfirm(false);
      }
    } else {
      setPin(pin.slice(0, -1));
    }
  };

  // Enable button only if both PINs are 4 digits
  const isButtonEnabled = pin.length === 4 && confirmPin.length === 4;

  // Handle Suivant button press
  const handleSuivant = () => {
    if (!pinsMatch) {
      setShowModal(true);
    } else {
      // Navigate to OTP screen
      navigation.navigate('Otp');
    }
  };

  return (
    <View className="flex-1 bg-white px-6 pt-12 pb-4">
      {/* Main content: logo, title, PIN rows */}
      <View className="flex-1 justify-center">
        <View className="items-center mb-16">
          <Logo />
        </View>
        <UIText
          title="Code Pin à 4 chiffres"
          subtitle="Veuillez saisir votre code PIN PeYa Pay à 4 chiffres pour continuer."
        />
        {/* First PIN row */}
        <PinRow value={pin} />
        <UIText
          title=""
          subtitle="Saisissez à nouveau le code PIN"
        />
        {/* Confirmation PIN row */}
        <PinRow value={confirmPin} />
      </View>
      {/* Keypad */}
      <KeyboardComponent keypad={keypad} onKeyPress={handleKeyPress} onDelete={handleDelete} />
      {/* Suivant button */}
      <View className="mb-8">
        <UIButton 
          title="Suivant" 
          onPress={handleSuivant} 
          variant="primary" 
          size="lg" 
          disabled={!isButtonEnabled} 
        />
      </View>

      {/* Error Modal */}
      <ModalComponent
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <UIText
          title="Code PIN INVALIDE"
          subtitle="Le code pin est invalide. Réessayez une fois de plus"
        />
        <TouchableOpacity
          onPress={() => {
            setShowModal(false);
            setConfirmPin('');
            setIsConfirm(false);
          }}
          className="mt-4"
        >
          <Text className="text-black font-bold text-base">Réessayer</Text>
        </TouchableOpacity>
      </ModalComponent>
    </View>
  );
};

export default PinScreen; 