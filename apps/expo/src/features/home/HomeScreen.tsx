import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import axios from 'axios';

import { TrendingList } from './components';
import Spacer from '@common/Spacer';

const HomeScreen: React.FC = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.GOOGLE_AUTH_IOS_CLIENT_ID,
  });

  const token =
    'ya29.A0AVA9y1vzj9nqoX5-AzNhevgrtMlKMbFsp7ZaCrWroGrUp9wfprZx2ZgiRV0Zk_weeMuOceUeUeDZG_uAi8CB35Gjs_y-hBU_kZw4hqdIycngh0UYKyWHVdZ5monpXvergAddnwiL9wm4jNczfqKCm4YB-ZTvaCgYKATASATASFQE65dr8rtULPN-g5YwCds5rB3dkqQ0163';

  useEffect(() => {
    if (response?.type === 'success') {
      //  console.log('RESPONSE', response);
    }
  }, [response]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <Button disabled={!request} title="Login" onPress={() => promptAsync()}></Button>
      <Button
        title="Daj info"
        onPress={async () => {
          const info = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);

          console.log('INFO', info.data);
        }}></Button>
      <TrendingList type="movie" />
      <Spacer height={15} />
      <TrendingList type="tv" />
    </ScrollView>
  );
};

export default HomeScreen;
