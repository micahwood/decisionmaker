import { Navigation } from 'react-native-navigation';

import InputScreen from './InputScreen';
import WheelScreen from './WheelScreen';

export function registerScreens() {
  Navigation.registerComponent('decision.InputScreen', () => InputScreen);
  Navigation.registerComponent('decision.WheelScreen', () => WheelScreen);
}