import api from 'app/api';

export type TrendingType = 'all' | 'movie' | 'tv' | 'person';

export const getTrending = async (type: TrendingType = 'all') => {
  const response = await api.get(`/titles/trending/${type}`);
  return response.data.data;
};
