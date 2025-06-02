import { View } from 'react-native';
import { Layout } from 'app/components/global/container.component';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from 'app/navigation';
import Logo from 'app/components/ui/shared/logo.component';
import UIText from 'app/components/ui/shared/text.component';
import UIButton from 'app/components/ui/shared/button.component';
import React, { useState } from 'react';
import PhoneInput from 'app/components/ui/shared/input.component';

export const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [phone, setPhone] = useState('');

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
          <UIButton size='lg' variant='primary' title={'Suivant'} onPress={() => navigation.navigate('login')} />
        </View>
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
