import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAtom } from 'jotai';
import axios from 'axios';

import TabNavigator from './TabNavigator';
import GuestStack from '@features/auth/navigation/GuestStack';

import { userAtom } from '@features/auth/store';
import { storage } from '@common/storage';

const Navigation = () => {
  const [user, setUser] = useAtom(userAtom);
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    const restoreAuth = async () => {
      const auth = storage.getString('auth');
      if (auth) {
        try {
          const info = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${auth}`);

          setUser({
            id: info.data.sub,
            name: info.data.name,
            email: info.data.email,
            picture: info.data.picture,
          });
        } catch {}
      }

      setIsRestoring(false);
    };

    restoreAuth();
  }, []);

  console.log('IS RESTORING', isRestoring);

  if (isRestoring) return null;

  return <NavigationContainer>{user ? <TabNavigator /> : <GuestStack />}</NavigationContainer>;
};

export default Navigation;
