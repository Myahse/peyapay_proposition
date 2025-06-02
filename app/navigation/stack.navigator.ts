import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from 'app/screens/auth/login';
import { RegisterScreen } from 'app/screens/auth/register';
import { SplashScreen } from 'app/screens/splash';
import OtpScreen from 'app/screens/auth/otp';
import DailyCodeScreen from 'app/screens/auth/dailycode';
// If you have a PinScreen, import it as well
// import { PinScreen } from 'app/screens/auth/pin';

export type RootStackParamList = {
  splash: undefined;
  login: undefined;
  register: undefined;
  Otp: undefined;
  DailyCode: undefined;
  // Add other routes as needed
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
    Otp: {
      screen: OtpScreen,
    },
    DailyCode: {
      screen: DailyCodeScreen,
    },
    // If you want to add PinScreen:
    // Pin: {
    //   screen: PinScreen,
    // },
  },
  groups: {
    auth: {
      if: () => true,
      screenOptions: {
        headerShown: false
      },
      screens: {
        login: {
          screen: LoginScreen
        },
        register: {
          screen: RegisterScreen
        }
      },
    },
    app: {
      if: () => true,
      screens: {
        // ...
      },
    },
  },
});

export default RootStack;
