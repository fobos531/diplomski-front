import { View, Text, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';

const MovieCard: React.FC = ({ movie }) => {
  return (
    <ImageBackground
      source={{ uri: `https://image.tmdb.org/t/p/w300${movie.poster_path}` }}
      style={{ width: 400, height: 400 }}
      imageStyle={{ width: 400, height: 400 }}>
      <BlurView style={{ position: 'absolute', bottom: 0, width: '100%', justifyContent: 'center', alignItems: 'center', height: 50 }}>
        <Text style={{ color: 'white' }}>{movie.title || movie.original_name}</Text>
      </BlurView>
    </ImageBackground>
  );
};

export default MovieCard;
