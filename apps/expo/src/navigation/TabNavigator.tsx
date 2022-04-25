import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import screen from '@navigation/screens';
import MoviesScreen from '@features/movies/MoviesScreen';

export type TabNavigatorParamList = {
  [screen.HOME]: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={screen.HOME} component={MoviesScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
