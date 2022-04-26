import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { useQuery } from 'react-query';
import { getTrending } from 'app/features/movies/api/movies';

import { fontSize } from '@constants/typography';
import MovieCard from './MovieCard';

interface TrendingListProps {
  type: 'movie' | 'tv';
}

const TrendingList: React.FC<TrendingListProps> = ({ type }) => {
  const { data } = useQuery(['trending', type], () => getTrending(type));

  return (
    <View>
      <Text style={{ fontSize: fontSize.medium, fontWeight: 'bold', marginBottom: 10 }}>
        Trending {type === 'movie' ? 'Movies' : 'TV Shows'}
      </Text>
      <FlatList
        data={data?.results || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MovieCard movie={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      />
    </View>
  );
};

export default TrendingList;
