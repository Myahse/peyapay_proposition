import { Text, View } from 'react-native';
import PinScreen from '../pin';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const LoginScreen = ({ title, path, children }: ScreenContentProps) => {
  return (
    <View className={styles.container}>
      
    
      <PinScreen />
      {children}
    </View>
  );
};
const styles = {
  container: `flex-1 justify-center`,
  
  
};
