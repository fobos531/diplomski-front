import { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useDebounce } from 'use-debounce';

import { search } from 'app/features/search/api';

const useLinksSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchQueryDebounced] = useDebounce(searchQuery, 400);

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    'search',
    ({ pageParam = 1 }) =>
      search({
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
    data: data?.pages.flatMap((p) => p.data),
  };
};

export default useLinksSearch;
