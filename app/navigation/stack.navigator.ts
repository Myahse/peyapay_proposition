import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from 'app/screens/auth/login';
import { RegisterScreen } from 'app/screens/auth/register';
import { SplashScreen } from 'app/screens/splash';

const RootStack = createStackNavigator({
  initialRouteName: 'splash',
  screenOptions: {
    headerShown: false
  },
  screens: {
    splash: {
      screen: SplashScreen,
    },
  },
  groups: {
    auth: {
      if: () => true,
      screenOptions: {
        headerShown: true
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
