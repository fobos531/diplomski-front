import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

import screen from '@navigation/screens';
import HomeStack from '@features/home/navigation/HomeStack';
import WebRTCScreen from '@features/webrtc/WebRTCScreen';
import MenuScreen from '@features/menu/MenuScreen';

export type TabNavigatorParamList = {
  [screen.HOME_STACK]: undefined;
  [screen.SEARCH_STACK]: undefined;
  [screen.MENU]: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const TabNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name={screen.HOME_STACK}
          component={HomeStack}
          options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }}
        />
        <Tab.Screen
          name="WebRTC"
          component={WebRTCScreen}
          options={{ tabBarIcon: ({ color, size }) => <Ionicons name="md-globe" size={size} color={color} /> }}
        />

        {/*         <Tab.Screen name={screen.SEARCH_STACK} component={SearchStack} /> */}

        <Tab.Screen
          name={screen.MENU}
          component={MenuScreen}
          options={{ tabBarIcon: ({ color, size }) => <Ionicons name="menu" size={size} color={color} /> }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TabNavigator;
