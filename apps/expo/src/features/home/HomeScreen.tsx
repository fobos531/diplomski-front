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
  return (
    <ScrollView style={{ flex: 1 }}>
      <TrendingList type="movie" />
      <Spacer height={15} />
      <TrendingList type="tv" />
    </ScrollView>
  );
};

export default HomeScreen;
