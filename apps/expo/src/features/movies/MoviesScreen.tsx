import React from 'react';

import { ScrollView } from 'react-native-gesture-handler';

import { TrendingList } from './components';
import Spacer from '@common/Spacer';

const MoviesScreen: React.FC = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <TrendingList type="movie" />
      <Spacer height={15} />
      <TrendingList type="tv" />
    </ScrollView>
  );
};

export default MoviesScreen;
