import api from 'app/api';

import { PaginatedApiResponse, SearchParams } from 'app/common/types';
import { Movie } from 'app/features/movies/types';

export const searchMovies = async (searchParams: SearchParams) => {
  const response = await api.post<PaginatedApiResponse<Movie>>('/search/movies', searchParams);

  return {
    hasMore: searchParams.page < response.data.data.total_pages,
    data: response.data.data.results,
    page: searchParams.page,
  };
};
