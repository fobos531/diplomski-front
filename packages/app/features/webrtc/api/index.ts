import api from 'app/api';

export const joinRoom = async (roomName?: string) => {
  const response = await api.post('/live/join', {
    roomName,
  });

  return response.data.token;
};
