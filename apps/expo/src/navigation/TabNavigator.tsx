import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

import screen from '@navigation/screens';
import HomeStack from '@features/home/navigation/HomeStack';
import WebRTCScreen from '@features/webrtc/WebRTCScreen';
import SearchStack from '@features/search/navigation/SearchStack';

export type TabNavigatorParamList = {
  [screen.HOME_STACK]: undefined;
  [screen.SEARCH_STACK]: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const TabNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="WebRTC" component={WebRTCScreen} />
        <Tab.Screen name={screen.HOME_STACK} component={HomeStack} />
        <Tab.Screen name={screen.SEARCH_STACK} component={SearchStack} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TabNavigator;
