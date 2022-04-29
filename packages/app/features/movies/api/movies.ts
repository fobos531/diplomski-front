import api from 'app/api';

import { ApiResponse } from 'app/common/types';
import { Credits, Movie } from 'app/features/movies/types';

export const getMovie = async (id: number) => {
  const response = await api.get<ApiResponse<Movie>>(`/movies/${id}`);
  return response.data.data;
};

export const getMovieCredits = async (id: number) => {
  const response = await api.get<ApiResponse<Credits>>(`/movies/${id}/credits`);
  return response.data.data;
};
