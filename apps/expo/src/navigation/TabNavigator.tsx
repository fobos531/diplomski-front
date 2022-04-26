import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

import screen from '@navigation/screens';
import HomeStack from '@features/home/navigation/HomeStack';

export type TabNavigatorParamList = {
  [screen.HOME_STACK]: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const TabNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name={screen.HOME_STACK} component={HomeStack} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TabNavigator;
