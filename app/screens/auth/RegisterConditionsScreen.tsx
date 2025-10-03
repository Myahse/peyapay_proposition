import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from 'app/navigation';
import { UIButton } from 'app/components/ui';

const RegisterConditionsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedNewsletter, setAcceptedNewsletter] = useState(false);

  return (
    <View className="flex-1 bg-white px-6 pt-12 pb-4">
      <Text className="text-xl font-bold mb-6 mt-10">
        Last step before joining the PeYaPay Community.
      </Text>
      <View className="flex-row items-center mb-6">
        <View className="flex-1">
          <Text className="text-sm text-black">
            I confirm to have more than 18 years old and having submitted all the information related to my identity. I read and have approved the general conditions and the the charter on respect for private life
          </Text>
        </View>
        <Switch
          value={acceptedTerms}
          onValueChange={setAcceptedTerms}
          thumbColor={acceptedTerms ? '#FAAF05' : '#ccc'}
          trackColor={{ true: '#FAAF05', false: '#ccc' }}
        />
      </View>
      <View className="flex-row items-center mb-6">
        <View className="flex-1">
          <Text className="text-sm text-black">
            I accept to subscribe to the PeYaPay newsletter
          </Text>
        </View>
        <Switch
          value={acceptedNewsletter}
          onValueChange={setAcceptedNewsletter}
          thumbColor={acceptedNewsletter ? '#FAAF05' : '#ccc'}
          trackColor={{ true: '#FAAF05', false: '#ccc' }}
        />
      </View>
      <View className="flex-1" />
      <UIButton
        title="Finalize my registration"
        variant="primary"
        size="lg"
        disabled={!acceptedTerms}
        onPress={() => {
          // Navigate to Home screen after successful registration
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

export default RegisterConditionsScreen; 