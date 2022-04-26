import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MovieScreen from '@features/movies/MovieScreen';
import TVScreen from '@features/tv/TVScreen';
import HomeScreen from '@features/home/HomeScreen';

import screen from '@navigation/screens';

export type HomeNavigatorParamList = {
  [screen.HOME]: undefined;
  [screen.MOVIE]: { id: number };
  [screen.TV]: { id: number };
};

const Stack = createNativeStackNavigator<HomeNavigatorParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screen.HOME} component={HomeScreen} />
      <Stack.Screen name={screen.MOVIE} component={MovieScreen} />
      <Stack.Screen name={screen.TV} component={TVScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
