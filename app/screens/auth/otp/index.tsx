// OTP Screen for entering and validating a 4-digit code
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { UIButton } from 'app/components/ui';
import UIText from 'app/components/ui/shared/text.component';
import Logo from 'app/components/ui/shared/logo.component';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import KeyboardComponent from 'app/components/ui/shared/keyboard.component';
import OtpGroupIcon from 'app/components/ui/shared/OtpGroupIcon';
import { ModalComponent } from 'app/components/modals';
import CodeHolder from 'app/components/ui/shared/codeholder.component';
import { RootStackParamList } from 'app/navigation/stack.navigator';

const OTP_LENGTH = 4;

// Utility to shuffle an array (used for keypad randomization)
function shuffle(array: string[]): string[] {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const OtpScreen = () => {
  // State for OTP value, current input index, timer, and modal
  const [otp, setOtp] = useState('');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [timer, setTimer] = useState(60);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [keypad, setKeypad] = useState<string[][]>([['', '', '', ''], ['', '', '', ''], ['', '', '', '']]);
  const [showModal, setShowModal] = useState(false);

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

  // Timer countdown for resend
  useEffect(() => {
    if (timer > 0) {
      intervalRef.current = setTimeout(() => setTimer(timer - 1), 1000);
    }
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [timer]);

  // Demo: Simulate receiving OTP from backend after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setOtp('1234');
      setCurrentIndex(3);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle OTP input from keypad
  const handleKeyPress = (num: string) => {
    if (otp.length < OTP_LENGTH) {
      const newOtp = otp + num;
      setOtp(newOtp);
      setCurrentIndex(newOtp.length - 1);
    }
  };
  // Handle delete key from keypad
  const handleDelete = () => {
    if (otp.length > 0) {
      const newOtp = otp.slice(0, -1);
      setOtp(newOtp);
      setCurrentIndex(newOtp.length - 1);
    }
  };

  // Handle resend code (resets timer)
  const handleResend = () => {
    if (timer === 0) setTimer(60);
    // Add resend logic here
  };

  // Handle continue button: validate OTP and navigate or show error modal
  const handleContinue = () => {
    if (otp !== '1234') {
      setShowModal(true);
    } else {
      navigation.navigate('DailyCode');
    }
  };

  return (
    <View className="flex-1 bg-white px-6 pt-8 pb-4">
      {/* Logo */}
      <View className="items-center mt-8 mb-4">
        <Logo />
      </View>
      {/* Title and subtitle */}
      <UIText
        title="Code de validation"
        subtitle={
          'Votre code OTP est en cours de vérification automatique.\nSi cela ne fonctionne pas, veuillez saisir le code reçu par SMS.'
        }
      />
      {/* OtpGroupIcon above the input row */}
      <OtpGroupIcon style={{ alignSelf: 'center', marginVertical: 12 }} />
      {/* OTP input row (uses shared CodeHolder) */}
      <CodeHolder value={otp} currentIndex={currentIndex} length={OTP_LENGTH} />
      {/* Keypad (randomized) */}
      <KeyboardComponent keypad={keypad} onKeyPress={handleKeyPress} onDelete={handleDelete} />
      {/* Resend and change number */}
      <View className="items-center mb-4">
        <UIText
          subtitle={`Renvoyer le code dans : ${timer < 10 ? `00:0${timer}` : `00:${timer}`}`}
        />
        <TouchableOpacity>
          <Text className="text-sm font-bold underline text-blue-800">Changer de numéro de téléphone</Text>
        </TouchableOpacity>
      </View>
      {/* Continue button */}
      <View className="mb-4">
        <UIButton
          title="Suivant"
          onPress={handleContinue}
          variant="primary"
          size="lg"
          disabled={otp.length !== OTP_LENGTH}
        />
      </View>
      {/* Error Modal for invalid OTP */}
      <ModalComponent
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <UIText
          title="Code OTP invalide"
          subtitle="Le code OTP saisi est incorrect. Veuillez réessayer."
        />
        <TouchableOpacity
          onPress={() => setShowModal(false)}
          className="mt-4"
        >
          <Text className="text-black font-bold text-base">Réessayer</Text>
        </TouchableOpacity>
      </ModalComponent>
    </View>
  );
};

export default OtpScreen; 