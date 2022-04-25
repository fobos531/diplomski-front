import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

import { Movie } from 'app/features/movies/types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <ImageBackground
      source={{ uri: `https://image.tmdb.org/t/p/w300${movie.poster_path}` }}
      style={styles.image}
      imageStyle={styles.imageStyle}>
      <BlurView style={styles.blurview}>
        <Text style={styles.title}>{movie.title || movie.original_title || movie.original_name}</Text>
      </BlurView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 300,
    overflow: 'hidden',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  imageStyle: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  blurview: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  title: {
    color: 'white',
    textAlign: 'center',
  },
});

export default MovieCard;
