import { NextPage } from 'next';
import { useQuery } from 'react-query';

import VideoBackground from '@features/home/VideoBackground';
import { getTrending } from 'app/features/movies/api/movies';
import MovieCard from '@features/movies/components/MovieCard';
import { Movie } from 'app/features/movies/types';

const Movies: NextPage = () => {
  const { data: trendingMovies } = useQuery('trendingMovies', () => getTrending('movie'));
  const { data: trendingTVShows } = useQuery('trendingTVShows', () => getTrending('tv'));

  return (
    <VideoBackground>
      <h1 className="text-white">Trending movies</h1>
      <div className="overflow-x-auto flex-row flex">
        {trendingMovies?.results.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <h1 className="text-white">Trending TV Shows</h1>
      <div className="overflow-x-auto flex-row flex">
        {trendingTVShows?.results.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </VideoBackground>
  );
};

export default Movies;
