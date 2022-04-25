import { NextPage } from 'next';
import { useQuery } from 'react-query';

import VideoBackground from '@features/home/VideoBackground';
import { getMovies } from 'app/features/movies/api/movies';
import MovieCard from '@features/movies/components/MovieCard';

const Movies: NextPage = () => {
  const { data } = useQuery('movies', getMovies, { onError: (err) => console.log('error') });

  return (
    <VideoBackground>
      <div className="overflow-x-auto w-11/12 flex-row flex">
        {data && data.results.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </VideoBackground>
  );
};

export default Movies;
