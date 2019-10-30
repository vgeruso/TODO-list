import { registerRootComponent } from 'expo';
import { activateKeepAwake } from 'expo-keep-awake';

import List from './src/screens/List';

if (__DEV__) {
  activateKeepAwake();
}

registerRootComponent(List);
