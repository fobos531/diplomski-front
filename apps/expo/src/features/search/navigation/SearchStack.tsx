import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchScreen from '@features/search/SearchScreen';

import screen from '@navigation/screens';

export type SearchNavigatorParamList = {
  [screen.SEARCH]: undefined;
};

const Stack = createNativeStackNavigator<SearchNavigatorParamList>();

const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screen.SEARCH} component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default SearchStack;
