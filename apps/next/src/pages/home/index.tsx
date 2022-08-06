import { NextPage } from 'next';
import { useQuery } from 'react-query';
import { useSession, signIn, signOut } from 'next-auth/react';

import { getTrending } from 'app/features/titles/api/titles';
import TitleCard from '@features/home/components/TitleCard';
import { Title } from 'app/features/titles/types';

const Home: NextPage = () => {
  const { data: trendingMovies } = useQuery('trendingMovies', () => getTrending('movie'));
  const { data: trendingTVShows } = useQuery('trendingTVShows', () => getTrending('tv'));
  const { data: opaca } = useSession();

  console.log('OPCA', opaca);

  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
      <button onClick={() => signOut()}>Sign out</button>
      <h1 className="text-white">Trending movies</h1>
      <div className="overflow-x-auto flex-row flex">
        {trendingMovies?.results.map((title: Title) => (
          <TitleCard key={title.id} title={title} type="movie" />
        ))}
      </div>

      <h1 className="text-white">Trending TV Shows</h1>
      <div className="overflow-x-auto flex-row flex">
        {trendingTVShows?.results.map((title: Title) => (
          <TitleCard key={title.id} title={title} type="tv" />
        ))}
      </div>
    </>
  );
};

export default Home;
