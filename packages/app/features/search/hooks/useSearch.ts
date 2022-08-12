import { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useDebounce } from 'use-debounce';

import { searchMovies } from 'app/features/search/api';

const useMoviesSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchQueryDebounced] = useDebounce(searchQuery, 1000);

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['searchMovies', searchQueryDebounced],
    ({ pageParam = 1 }) =>
      searchMovies({
        query: searchQueryDebounced,
        page: pageParam,
      }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.hasMore) return lastPage.page + 1;
        return undefined;
      },
      enabled: !!searchQueryDebounced,
    },
  );

  return {
    hasNextPage,
    fetchNextPage,
    searchQuery,
    setSearchQuery,
    data: data?.pages.flatMap((p) => p.data) || [],
  };
};

export default useMoviesSearch;
