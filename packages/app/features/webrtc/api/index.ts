import api from 'app/api';

export const getToken = async () => {
  const response = await api.get('/live/token');

  return response.data.token;
};
