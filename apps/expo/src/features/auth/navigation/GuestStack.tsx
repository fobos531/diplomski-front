import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '@features/auth/LoginScreen';

import screen from '@navigation/screens';

export type GuestNavigatorParamList = {
  [screen.LOGIN]: undefined;
};

const Stack = createNativeStackNavigator<GuestNavigatorParamList>();

const GuestStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screen.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default GuestStack;
