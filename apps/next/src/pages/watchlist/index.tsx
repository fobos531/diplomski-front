import { NextPage } from 'next';
import { useAtom } from 'jotai';

import { watchlistAtom } from '@features/watchlist/store';
import { Title } from 'app/features/titles/types';
import TitleCard from '@features/home/components/TitleCard';

const WatchList: NextPage = () => {
  const [watchlist] = useAtom(watchlistAtom);

  return (
    <>
      <h1>My watchlist</h1>
      <div className="overflow-x-auto flex-row flex">
        {watchlist.map((title: Title) => (
          <TitleCard key={title.id} title={title} />
        ))}
      </div>
      <h1>Trending TV Shows</h1>
    </>
  );
};

export default WatchList;
