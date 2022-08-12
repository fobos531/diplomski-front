import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeStack from '@features/home/navigation/HomeStack';
import WebRTCScreen from '@features/webrtc/WebRTCScreen';
import MenuStack from '@features/menu/navigation/MenuStack';

import screen from '@navigation/screens';
import SearchStack from '@features/search/navigation/SearchStack';

export type TabNavigatorParamList = {
  [screen.HOME_STACK]: undefined;
  [screen.SEARCH_STACK]: undefined;
  [screen.MENU_STACK]: undefined;
  [screen.WEBRTC]: {
    videoId: string;
    token: string;
  };
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const TabNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name={screen.HOME_STACK}
          component={HomeStack}
          options={{ title: 'Home', tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }}
        />
        <Tab.Screen
          name={screen.WEBRTC}
          component={WebRTCScreen}
          options={{ tabBarIcon: ({ color, size }) => <Ionicons name="md-globe" size={size} color={color} /> }}
        />

        <Tab.Screen
          name={screen.SEARCH_STACK}
          component={SearchStack}
          options={{ title: 'Search', tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} /> }}
        />

        <Tab.Screen
          name={screen.MENU_STACK}
          component={MenuStack}
          options={{ title: 'Menu', tabBarIcon: ({ color, size }) => <Ionicons name="menu" size={size} color={color} /> }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TabNavigator;
