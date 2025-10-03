import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { UIButton } from 'app/components/ui';
import UIText from 'app/components/ui/shared/text.component';
import Logo from 'app/components/ui/shared/logo.component';
import { ModalComponent } from 'app/components/modals';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import KeyboardComponent from 'app/components/ui/shared/keyboard.component';
import { RootStackParamList } from 'app/navigation/stack.navigator';
import { generateKeypad } from 'app/utils/keypad.utils';
import BiometricsOptions from 'app/components/ui/shared/BiometricsOptions';
import BottomSheetModal from 'app/components/ui/shared/BottomSheetModal';
import * as LocalAuthentication from 'expo-local-authentication';

const PinRow = ({ value, isError }: { value: string; isError?: boolean }) => (
  <View className={`flex-row justify-center mb-4 border-2 ${isError ? 'border-red-500' : 'border-gray-400'} rounded-xl bg-white px-2 py-2 w-64 mx-auto`}>    
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

const PinScreen = () => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isConfirm, setIsConfirm] = useState(false);
  const [keypad, setKeypad] = useState<string[][]>([['', '', '', ''], ['', '', '', ''], ['', '', '', '']]);
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showBiometricsOptions, setShowBiometricsOptions] = useState(false);
  const [showFingerprintSheet, setShowFingerprintSheet] = useState(false);
  const [isFingerprintLoading, setIsFingerprintLoading] = useState(false);
  const [availableBiometrics, setAvailableBiometrics] = useState<number[]>([]);
  const [pendingBiometricsOptions, setPendingBiometricsOptions] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const pinsMatch = pin.length === 4 && confirmPin.length === 4 && pin === confirmPin;

  useEffect(() => {
    setKeypad(generateKeypad());
  }, []);

  useEffect(() => {
    if (showBiometricsOptions) {
      LocalAuthentication.supportedAuthenticationTypesAsync().then(setAvailableBiometrics);
    }
  }, [showBiometricsOptions]);

  const handleKeyPress = (num: string): void => {
    if (!isConfirm) {
      if (pin.length < 4) {
        setPin(pin + num);
        if (pin.length + 1 === 4) setIsConfirm(true);
      }
    } else {
      if (confirmPin.length < 4) {
        setConfirmPin(confirmPin + num);
        if (showError) setShowError(false);
      }
    }
  };

  const handleDelete = (): void => {
    if (isConfirm) {
      if (confirmPin.length > 0) {
        setConfirmPin(confirmPin.slice(0, -1));
        if (showError) setShowError(false);
      } else {
        setIsConfirm(false);
      }
    } else {
      setPin(pin.slice(0, -1));
    }
  };

  const isButtonEnabled = pin.length === 4 && confirmPin.length === 4;

  const handleNext = () => {
    if (!pinsMatch) {
      setShowError(true);
    } else {
      setShowModal(true);
    }
  };

  const handleBiometricsResponse = (useBiometrics: boolean) => {
    setShowModal(false);
    if (useBiometrics) {
      setPendingBiometricsOptions(true);
    } else {
      navigation.navigate('RegisterConditions');
    }
  };

  useEffect(() => {
    if (!showModal && pendingBiometricsOptions) {
      setShowBiometricsOptions(true);
      setPendingBiometricsOptions(false);
    }
  }, [showModal, pendingBiometricsOptions]);

  const handleSelectFingerprint = async () => {
    setShowBiometricsOptions(false);
    setTimeout(() => setShowFingerprintSheet(true), 300);
    setIsFingerprintLoading(true);
    setTimeout(async () => {
      try {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate with your fingerprint',
          fallbackLabel: 'Enter PIN',
        });
        setIsFingerprintLoading(false);
        setShowFingerprintSheet(false);
        if (result.success) {
          navigation.navigate('RegisterConditions');
        } else {
          setTimeout(() => setShowBiometricsOptions(true), 300);
        }
      } catch (e) {
        setIsFingerprintLoading(false);
        setShowFingerprintSheet(false);
        setTimeout(() => setShowBiometricsOptions(true), 300);
      }
    }, 500);
  };
  const handleSelectFace = async () => {
    setShowBiometricsOptions(false);
    setTimeout(() => setShowFingerprintSheet(true), 300); // reuse the loading sheet for face unlock
    setIsFingerprintLoading(true);
    setTimeout(async () => {
      try {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate with your face',
          fallbackLabel: 'Enter PIN',
        });
        setIsFingerprintLoading(false);
        setShowFingerprintSheet(false);
        if (result.success) {
          navigation.navigate('RegisterConditions');
        } else {
          setTimeout(() => setShowBiometricsOptions(true), 300);
        }
      } catch (e) {
        setIsFingerprintLoading(false);
        setShowFingerprintSheet(false);
        setTimeout(() => setShowBiometricsOptions(true), 300);
      }
    }, 500);
  };
  const handleCancelFingerprint = () => {
    setShowFingerprintSheet(false);
    setTimeout(() => setShowBiometricsOptions(true), 300); // return to biometrics options
  };

  return (
    <View className="flex-1 bg-white px-6 pt-12 pb-4">
      {/* Main content: logo, title, PIN rows */}
      <View className="flex-1 justify-center">
        <View className="items-center mb-16">
          <Logo />
        </View>
        <UIText
          title="4-digit PIN Code"
          subtitle="Please enter your 4-digit PIN code to continue."
        />
        {/* First PIN row */}
        <PinRow value={pin} />
        <UIText
          title=""
          subtitle="Enter the PIN code again"
        />
        {/* Confirmation PIN row */}
        <PinRow value={confirmPin} isError={showError} />
        {showError && (
          <Text className="text-red-500 text-center mt-2">
            PIN codes do not match. Please try again.
          </Text>
        )}
      </View>
      {/* Keypad */}
      <KeyboardComponent keypad={keypad} onKeyPress={handleKeyPress} onDelete={handleDelete} />
      {/* Next button */}
      <View className="mb-8">
        <UIButton 
          title="Next" 
          onPress={handleNext} 
          variant="primary" 
          size="lg" 
          disabled={!isButtonEnabled} 
        />
      </View>

      {/* Biometrics Modal */}
      <ModalComponent
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View className="items-center">
          <UIText
            title="Enable Biometrics"
            subtitle="Would you like to use biometric authentication (fingerprint/face ID) for faster login?"
          />
          <View className="items-center mt-8 space-y-4">
            <View className="w-40">
              <UIButton 
                title="Enable Biometrics" 
                onPress={() => handleBiometricsResponse(true)} 
                variant="primary" 
                size="md"
                fullWidth
              />
            </View>
            <TouchableOpacity
              onPress={() => handleBiometricsResponse(false)}
              className="items-center py-2"
            >
              <Text className="text-gray-600 text-base">No, thanks</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalComponent>
      {/* Biometrics Options Bottom Sheet */}
      <BottomSheetModal
        visible={showBiometricsOptions}
        onRequestClose={() => setShowBiometricsOptions(false)}
      >
        <BiometricsOptions
          onSelectFingerprint={handleSelectFingerprint}
          onSelectFace={handleSelectFace}
          showFingerprint={availableBiometrics.includes(1)}
          showFace={availableBiometrics.includes(2)}
        />
      </BottomSheetModal>
      {/* Fingerprint/Face Loading Bottom Sheet */}
      <BottomSheetModal
        visible={showFingerprintSheet}
        onRequestClose={handleCancelFingerprint}
      >
        <View className="w-full items-center px-4 pb-8 pt-6">
          <Text className="text-lg font-bold text-center mb-8">
            {isFingerprintLoading ? 'Authenticating...' : ''}
          </Text>
          <View className="mb-8">
            <ActivityIndicator size="large" color="#222" />
          </View>
          <TouchableOpacity onPress={handleCancelFingerprint}>
            <Text className="text-base font-bold text-black">Cancel</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    </View>
  );
};

export default PinScreen; 