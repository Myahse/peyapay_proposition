/**
 * SplashScreen Component
 * 
 * The initial screen of the application that handles:
 * - Phone number input with country code selection
 * - Language selection
 * - Initial app setup
 * 
 * Features:
 * - Country code picker with flags
 * - Phone number validation
 * - Language selection modal
 * - Biometric authentication options
 */

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, PanResponder, Dimensions, Pressable, Image, SafeAreaView, Platform } from 'react-native';
import { Layout } from 'app/components/global/container.component';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from 'app/navigation';
import Logo from 'app/components/ui/shared/logo.component';
import UIText from 'app/components/ui/shared/text.component';
import UIButton from 'app/components/ui/shared/button.component';
import PhoneInput from 'app/components/ui/shared/input.component';
import { ModalComponent } from 'app/components/modals';
import { isValidPhoneNumber } from 'app/utils/validation.utils';
import { usePhone } from 'app/components/ui/shared/phone.context';
import LanguageSelection from 'app/components/ui/shared/LanguageSelection';
import CountryPickerBottomSheet from 'app/components/ui/shared/CountryPickerBottomSheet';
import BottomSheetModal from 'app/components/ui/shared/BottomSheetModal';
import OtpBottomSheet from 'app/components/ui/shared/OtpBottomSheet';

// Get screen height for animations
const SCREEN_HEIGHT = Dimensions.get('window').height;

export const SplashScreen = () => {
  // Navigation hook
  const navigation = useNavigation<NavigationProp>();
  
  // State management
  const [phone, setPhone] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { setPhone: setGlobalPhone } = usePhone();
  const [showLanguageModal, setShowLanguageModal] = useState(true);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({ 
    code: '+225', 
    name: 'Ivory Coast', 
    flag: require('assets/flags/civ.png') 
  });
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [pendingPinNavigation, setPendingPinNavigation] = useState(false);

  // Animation value for modal
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  // Handle language modal animation
  React.useEffect(() => {
    if (showLanguageModal) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 8,
        speed: 12,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [showLanguageModal]);

  // Pan responder for drag-to-dismiss functionality
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 10,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          closeModalWithAnimation();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 8,
            speed: 12,
          }).start();
        }
      },
    })
  ).current;

  // Close modal with animation
  const closeModalWithAnimation = () => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setShowLanguageModal(false));
  };

  // Handle next button press
  const handleNext = () => {
    if (isValidPhoneNumber(phone)) {
      setGlobalPhone(phone);
      setShowOtpModal(true);
    } else {
      setModalVisible(true);
    }
  };

  // Navigate to PIN screen after OTP modal is closed
  useEffect(() => {
    if (!showOtpModal && pendingPinNavigation) {
      setPendingPinNavigation(false);
      setTimeout(() => {
        navigation.navigate('Pin');
      }, 800); // Increased delay for slower closing animation
    }
  }, [showOtpModal, pendingPinNavigation, navigation]);

  return (
    <Layout>
      <View className={styles.container}>
        {/* Header with logo */}
        <View className={styles.blockHeader}>
          <Logo />
        </View>

        {/* Main content */}
        <View className={styles.blockCenter}>
          <UIText
            title="Enter your phone number"
            subtitle="Use your phone number to sign up or log in."
          />
          <View className="flex-row items-center bg-gray-300 rounded-lg w-full overflow-hidden mb-4">
            {/* Country picker trigger */}
            <TouchableOpacity 
              onPress={() => setShowCountryPicker(true)} 
              className="flex-row items-center bg-gray-300 px-3 h-10 justify-center"
            >
              <Image source={selectedCountry.flag} className="w-6 h-6 rounded-full mr-2" />
              <Text className="text-base font-bold">{selectedCountry.code}</Text>
            </TouchableOpacity>
            {/* Phone input */}
            <PhoneInput value={phone} onChange={setPhone} />
          </View>
        </View>

        {/* Bottom button */}
        <View className={styles.blockBottom}>
          <UIButton 
            size='lg' 
            variant='primary' 
            title={'Next'} 
            onPress={handleNext} 
            disabled={!isValidPhoneNumber(phone)} 
          />
        </View>

        {/* Error modal */}
        <ModalComponent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <Text className="text-base font-bold text-center mb-2">Enter your phone number</Text>
          <Text className="text-xs text-center text-black mb-1">Your phone number is not correct.</Text>
          <Text className="text-xs text-center text-black mb-4">Please try again.</Text>
          <TouchableOpacity className="mt-1" onPress={() => setModalVisible(false)}>
            <Text className="text-black font-bold text-sm pt-6 text-center">Try again</Text>
          </TouchableOpacity>
        </ModalComponent>

        {/* Country picker bottom sheet */}
        <BottomSheetModal
          visible={showCountryPicker}
          onRequestClose={() => setShowCountryPicker(false)}
        >
          <CountryPickerBottomSheet
            onSelect={country => {
              setSelectedCountry(country);
              setShowCountryPicker(false);
            }}
          />
        </BottomSheetModal>

        {/* OTP Bottom Sheet Modal */}
        <BottomSheetModal
          visible={showOtpModal}
          onRequestClose={() => setShowOtpModal(false)}
        >
          <OtpBottomSheet 
            onSubmit={code => {
              if (code === '1234') {
                setTimeout(() => {
                  setShowOtpModal(false);
                  setPendingPinNavigation(true);
                }, 500); // Show filled fields for 500ms before closing
                return true;
              }
              return false;
            }}
          />
        </BottomSheetModal>
      </View>
    </Layout>
  );
};

// Styles for the component
const styles = {
  container: `flex-1 justify-between m-6`,
  blockHeader: `w-full justify-center items-center mt-8`,
  blockCenter: `w-full justify-center items-center`,
  blockBottom: `w-full justify-center items-center`,
};