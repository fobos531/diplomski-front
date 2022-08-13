import { NextPage } from 'next';

import { Title } from 'app/features/titles/types';
import TitleCard from '@features/home/components/TitleCard';
import useMoviesSearch from 'app/features/search/hooks/useSearch';

const Search: NextPage = () => {
  const { data, searchQuery, setSearchQuery } = useMoviesSearch();

  return (
    <>
      <h1>Search</h1>
      <input type="text" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
      <div className="overflow-x-auto flex-row flex">
        {data.map((title: Title) => (
          <TitleCard key={title.id} title={{ ...title, media_type: 'movie' }} />
        ))}
      </div>
    </>
  );
};

export default Search;
