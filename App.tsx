import React from 'react';
import { useFonts } from 'expo-font';
import './global.css';
import { PhoneProvider } from 'app/components/ui/shared/phone.context';
import { RootNavigation } from 'app/navigation';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Kamerik205-Bold': require('./assets/fonts/Kamerik 205 Bold.ttf'),
    'Kamerik205-Book': require('./assets/fonts/Kamerik 205 Book.ttf'),
    'Kamerik205-Heavy': require('./assets/fonts/Kamerik 205 Heavy.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Or a loading spinner
  }

  return (
    <PhoneProvider>
      <RootNavigation />
    </PhoneProvider>
  );
}
