import React from 'react';
import { View, Button, Text } from 'react-native';
import { useAtom } from 'jotai';

import { userAtom } from '@features/auth/store';
import { storage } from '@common/storage';

interface MenuScreenProps {}

const MenuScreen: React.FC<MenuScreenProps> = () => {
  const [user, setUser] = useAtom(userAtom);

  const handleSignOut = () => {
    storage.delete('auth');
    setUser(null);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{user?.name}</Text>
      <Button title="Watchlist" onPress={() => {}} />
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default MenuScreen;
