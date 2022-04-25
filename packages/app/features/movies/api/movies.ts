import api from 'app/api/api';

export const getMovies = async () => {
  const response = await api.get(`/movies/trending`);
  return response.data.data;
};
