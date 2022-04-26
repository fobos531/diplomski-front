import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

import screen from '@navigation/screens';
import HomeScreen from '@features/home/HomeScreen';

export type TabNavigatorParamList = {
  [screen.HOME]: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const TabNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name={screen.HOME} component={HomeScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TabNavigator;
