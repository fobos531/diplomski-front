import React from 'react';
import { View, Button } from 'react-native';
import { useAtom } from 'jotai';

import { userAtom } from '@features/auth/store';

interface MenuScreenProps {}

const MenuScreen: React.FC<MenuScreenProps> = () => {
  const [user, setUser] = useAtom(userAtom);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Sign Out" onPress={() => setUser(null)} />
    </View>
  );
};

export default MenuScreen;
