import { Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

import { Title } from 'app/features/titles/types';
import screen from '@navigation/screens';

interface TitleCardProps {
  title: Title;
  type: 'movie' | 'tv';
}

const TitleCard: React.FC<TitleCardProps> = ({ title, type }) => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    if (type === 'movie') {
      navigation.navigate(screen.MOVIE, { id: title.id });
    } else {
      navigation.navigate(screen.TV, { id: title.id });
    }
  };

  return (
    <TouchableOpacity onPress={handleNavigate}>
      <ImageBackground
        source={{ uri: `https://image.tmdb.org/t/p/w300${title.poster_path}` }}
        style={styles.image}
        imageStyle={styles.imageStyle}>
        <BlurView style={styles.blurview}>
          <Text style={styles.title}>{title.title || title.original_title || title.original_name}</Text>
        </BlurView>
      </ImageBackground>
    </TouchableOpacity>
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

export default TitleCard;
