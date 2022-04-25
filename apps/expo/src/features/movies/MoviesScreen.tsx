import React from 'react';
import { View, FlatList } from 'react-native';
import { useQuery } from 'react-query';

import { getMovies } from 'app/features/movies/api/movies';
import MovieCard from './components/MovieCard';
import { ScrollView } from 'react-native-gesture-handler';

const MoviesScreen: React.FC = () => {
  const { data } = useQuery('movies', getMovies, { onError: (err) => console.log('error') });

  console.log('PODACI', data);

  return (
    <ScrollView style={{ flex: 1 }}>
      <FlatList
        data={data?.results || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MovieCard movie={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      />
    </ScrollView>
  );
};

export default MoviesScreen;
