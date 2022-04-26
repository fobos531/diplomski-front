import { View, Text } from 'react-native';
import { useQuery } from 'react-query';
import { RouteProp, useRoute } from '@react-navigation/native';

import { getMovie } from 'app/features/movies/api/movies';

import { HomeNavigatorParamList } from '@features/home/navigation/HomeStack';
import screen from '@navigation/screens';

interface MovieScreenProps {}

const MovieScreen: React.FunctionComponent<MovieScreenProps> = () => {
  const { params } = useRoute<RouteProp<HomeNavigatorParamList, screen.MOVIE>>();
  const { data: movie } = useQuery(['movie', params.id], () => getMovie(params.id));

  return (
    <View>
      {movie && (
        <>
          <Text>{movie.title || movie.original_title || movie.original_name}</Text>
        </>
      )}
    </View>
  );
};

export default MovieScreen;
