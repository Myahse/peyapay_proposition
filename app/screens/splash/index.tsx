import { View, Modal, Text, TouchableOpacity } from 'react-native';
import { Layout } from 'app/components/global/container.component';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from 'app/navigation';
import Logo from 'app/components/ui/shared/logo.component';
import UIText from 'app/components/ui/shared/text.component';
import UIButton from 'app/components/ui/shared/button.component';
import React, { useState } from 'react';
import PhoneInput from 'app/components/ui/shared/input.component';
import { BlurView } from 'expo-blur';
import { ModalComponent } from 'app/components/modals';

export const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [phone, setPhone] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Simple validation: must be 10 digits and start with '07'
  const isPhoneValid = (num: string) => {
    const digits = num.replace(/\D/g, '');
    return /^07\d{8}$/.test(digits);
  };

  const handleNext = () => {
    if (!isPhoneValid(phone)) {
      setModalVisible(true);
    } else {
      navigation.navigate('login');
    }
  };

  return (
    <Layout>
      <View className={styles.container}>
        <View className={styles.blockHeader}>
          <Logo />
        </View>
        <View className={styles.blockCenter}>
          <UIText
            title="Entrer votre numéro de téléphone"
            subtitle="Utilisez le numéro de téléphone pour vous inscrire ou vous connecter."
          />
          <PhoneInput value={phone} onChange={setPhone} />
        </View>
        <View className={styles.blockBottom}>
          <UIButton size='lg' variant='primary' title={'Suivant'} onPress={handleNext} />
        </View>
        <ModalComponent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <Text className="text-base font-bold text-center mb-2">Saisis numéro de téléphone</Text>
          <Text className="text-xs text-center text-black mb-1">Votre numéro de téléphone n&apos;est pas correct.</Text>
          <Text className="text-xs text-center text-black mb-4">Veuillez réessayer.</Text>
          <TouchableOpacity className="mt-1" onPress={() => setModalVisible(false)}>
            <Text className="text-black font-bold text-sm pt-6 text-center">Réessayer</Text>
          </TouchableOpacity>
        </ModalComponent>
      </View>
    </Layout>
  );
};

const styles = {
  container: `flex-1 justify-between m-6`,
  blockHeader: `w-full justify-center items-center mt-8`,
  blockCenter: `w-full justify-center items-center`,
  blockBottom: `w-full justify-center items-center`,
};