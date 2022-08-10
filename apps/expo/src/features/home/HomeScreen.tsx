import React from 'react';
import { ScrollView } from 'react-native';

import Spacer from '@common/components/Spacer';
import { TrendingList } from './components';

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
