import { NextPage } from 'next';
import { useQuery } from 'react-query';

import VideoBackground from '@features/home/VideoBackground';
import { getMovies } from 'app/features/movies/api/movies';

const Movies: NextPage = () => {
  const { data } = useQuery('movies', getMovies, { onError: (err) => console.log('error') });

  return (
    <VideoBackground>
      <div className="flex flex-col content-center">
        <h1 className="text-white text-center">EBOSS</h1>
      </div>
    </VideoBackground>
  );
};

export default Movies;
