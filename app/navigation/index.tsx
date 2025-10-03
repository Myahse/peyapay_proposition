import { createStaticNavigation } from '@react-navigation/native';
import RootStack from './stack.navigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  splash: undefined;
  Home: undefined;
  Pin: undefined;
  login: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const RootNavigation = createStaticNavigation(RootStack);