import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/login';
import { SplashScreen } from 'app/screens/splash/index';
import { HomeScreen } from 'app/screens/app/home';  
import PinScreen from 'app/screens/auth/pin';
import MyCardScreen from 'app/screens/app/qr/MyCardScreen';
import RegisterConditionsScreen from '../screens/auth/RegisterConditionsScreen';

export type RootStackParamList = {
  splash: undefined;
  login: undefined;
  Home: undefined;
  Pin: undefined;
  MyCard: undefined;
  RegisterConditions: undefined;
};

const RootStack = createStackNavigator({
  initialRouteName: 'splash',
  screenOptions: {
    headerShown: false
  },
  screens: {
    splash: {
      screen: SplashScreen,
    },
    login: {
      screen: LoginScreen,
    },
    Home: {
      screen: HomeScreen,
    },
    Pin: {
      screen: PinScreen,
    },
    MyCard: {
      screen: MyCardScreen,
    },
    RegisterConditions: {
      screen: RegisterConditionsScreen,
    },
  },
});

export default RootStack;
