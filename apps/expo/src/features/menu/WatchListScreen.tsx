import React from 'react';
import { ScrollView, FlatList, Text } from 'react-native';
import { useAtom } from 'jotai';

import Spacer from '@common/components/Spacer';
import { TitleCard } from '@features/home/components';

import { watchlistAtom } from '@features/watchlist/store';
import { fontSize } from '@constants/typography';

const WatchListScreen: React.FC = () => {
  const [watchlist] = useAtom(watchlistAtom);

  return (
    <FlatList
      data={watchlist}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <TitleCard title={item} />}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <Spacer height={10} />}
      ListHeaderComponent={() => <Text style={{ fontSize: fontSize.medium, fontWeight: 'bold', marginBottom: 10 }}>My watchlist</Text>}
    />
  );
};

export default WatchListScreen;
