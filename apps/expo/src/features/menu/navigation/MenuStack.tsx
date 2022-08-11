import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MenuScreen from '../MenuScreen';
import WatchListScreen from '../WatchListScreen';

import screen from '@navigation/screens';

export type MenuStackParamList = {
  [screen.MENU]: undefined;
  [screen.WATCHLIST]: undefined;
};

const Stack = createNativeStackNavigator<MenuStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screen.MENU} component={MenuScreen} />
      <Stack.Screen name={screen.WATCHLIST} component={WatchListScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
