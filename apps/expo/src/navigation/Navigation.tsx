import { NavigationContainer } from '@react-navigation/native';
import { useAtom } from 'jotai';

import { userAtom } from '@features/auth/store';
import TabNavigator from './TabNavigator';
import GuestStack from '@features/auth/navigation/GuestStack';

const Navigation = () => {
  const [user] = useAtom(userAtom);

  return <NavigationContainer>{user ? <TabNavigator /> : <GuestStack />}</NavigationContainer>;
};

export default Navigation;
