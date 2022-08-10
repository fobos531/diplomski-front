import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { useAtom } from 'jotai';
import { userAtom } from './store';
import { TokenResponse } from 'expo-auth-session';
import axios from 'axios';
import { storage } from '@common/storage';

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.GOOGLE_AUTH_IOS_CLIENT_ID,
  });

  const [_, setUser] = useAtom(userAtom);

  useEffect(() => {
    const signIn = async (res: TokenResponse) => {
      const info = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${res.accessToken}`);
      storage.set('auth', res.accessToken);

      setUser({
        id: info.data.sub,
        name: info.data.name,
        email: info.data.email,
        picture: info.data.picture,
      });
    };

    if (response?.type === 'success' && response.authentication) {
      signIn(response.authentication);
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Sign in with Google" onPress={() => promptAsync()} />
    </View>
  );
};

export default LoginScreen;
