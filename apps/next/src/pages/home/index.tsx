import { NextPage } from 'next';
import { useQuery } from 'react-query';

import { getTrending } from 'app/features/titles/api/titles';
import TitleCard from '@features/home/components/TitleCard';
import { Title } from 'app/features/titles/types';

const Home: NextPage = () => {
  const { data: trendingMovies } = useQuery('trendingMovies', () => getTrending('movie'));
  const { data: trendingTVShows } = useQuery('trendingTVShows', () => getTrending('tv'));

  return (
    <>
      <h1>Trending movies</h1>
      <div className="overflow-x-auto flex-row flex">
        {trendingMovies?.results.map((title: Title) => (
          <TitleCard key={title.id} title={title} />
        ))}
      </div>

      <h1>Trending TV Shows</h1>
      <div className="overflow-x-auto flex-row flex">
        {trendingTVShows?.results.map((title: Title) => (
          <TitleCard key={title.id} title={title} />
        ))}
      </div>
    </>
  );
};

export default Home;
