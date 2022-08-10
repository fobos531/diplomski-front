import { useRef, useState } from 'react';
import { Text, ScrollView, TouchableOpacity, ImageBackground, Image, StyleSheet, View, FlatList } from 'react-native';
import { BlurView } from 'expo-blur';
import Carousel from 'react-native-reanimated-carousel';
import { useQuery } from 'react-query';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import YoutubePlayer from 'react-native-youtube-iframe';
import CircularProgress from 'react-native-circular-progress-indicator';
import { joinRoom } from 'app/features/webrtc/api';

import { CastMember } from '@features/movies/components';
import { getMovie, getMovieCredits } from 'app/features/movies/api/movies';
import { getBackdropUrl, getPosterUrl } from 'app/misc/imgHelpers';
import Spacer from '@common/components/Spacer';

import { HomeNavigatorParamList } from '@features/home/navigation/HomeStack';
import screen from '@navigation/screens';
import { fontSize } from '@constants/typography';
import { Video } from 'app/features/movies/types';

interface MovieScreenProps {}

const MovieScreen: React.FunctionComponent<MovieScreenProps> = () => {
  const { params } = useRoute<RouteProp<HomeNavigatorParamList, screen.MOVIE>>();
  const { data: movie } = useQuery(['movie', params.id], () => getMovie(params.id));
  const { data: movieCredits } = useQuery(['movieCredits', params.id], () => getMovieCredits(params.id));
  const [playing, setPlaying] = useState(false);
  const navigation = useNavigation();

  const onPressVideo = async (video: Video) => {
    const token = await joinRoom(video.key);

    navigation.navigate(screen.WEBRTC, { videoId: video.key, token });
  };

  return (
    <ScrollView>
      {movie && (
        <>
          <View style={{ height: 200 }}>
            <ImageBackground source={{ uri: getBackdropUrl(movie.backdrop_path, 'w780') }} style={StyleSheet.absoluteFill} />
            <BlurView style={{ flex: 1 }} intensity={10} />
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Image
              source={{ uri: getPosterUrl(movie.poster_path, 'w342') }}
              style={{ width: 150, height: 240, borderRadius: 10, marginRight: 10 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{movie.title || movie.original_title || movie.original_name}</Text>
              <Text>Released: {dayjs(movie.release_date).format('MMM DD, YYYY')}</Text>
              <Text style={{ flex: 1 }}>Overview: {movie.overview}</Text>
              <CircularProgress value={movie.vote_average} maxValue={10} />
            </View>
          </View>

          <Text style={{ fontSize: fontSize.large }}>Cast</Text>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            horizontal
            data={movieCredits?.cast}
            renderItem={({ item }) => <CastMember member={item} />}
            ItemSeparatorComponent={() => <Spacer width={10} />}
            showsHorizontalScrollIndicator={false}
          />

          {movie.images.backdrops.length > 0 && (
            <>
              <Text style={{ fontSize: fontSize.large }}>Backdrops</Text>

              <Carousel
                height={200}
                width={300}
                style={{ width: '100%', marginLeft: 20, flex: 1 }}
                pagingEnabled
                snapEnabled
                customConfig={() => ({ type: 'positive', viewCount: 10 })}
                mode="horizontal-stack"
                modeConfig={{
                  snapDirection: 'right',
                  stackInterval: 18,
                }}
                data={movie.images.backdrops}
                renderItem={({ item }) => (
                  <Image source={{ uri: getBackdropUrl(item.file_path, 'w780') }} style={{ width: 300, height: 200 }} />
                )}
              />
            </>
          )}

          {movie.images.posters.length > 0 && (
            <>
              <Text style={{ fontSize: fontSize.large }}>Posters</Text>

              <Carousel
                height={200}
                width={300}
                style={{ width: '100%', marginLeft: 20 }}
                pagingEnabled
                snapEnabled
                customConfig={() => ({ type: 'positive', viewCount: 10 })}
                mode="horizontal-stack"
                modeConfig={{
                  snapDirection: 'right',
                  stackInterval: 18,
                }}
                data={movie.images.posters}
                renderItem={({ item }) => (
                  <Image source={{ uri: getBackdropUrl(item.file_path, 'w780') }} style={{ width: 300, height: 200 }} />
                )}
              />
            </>
          )}

          {movie.videos.results.length > 0 && (
            <>
              <Text style={{ fontSize: fontSize.large }}>Videos</Text>
              <Carousel
                height={200}
                width={300}
                style={{ width: '100%', marginLeft: 20 }}
                pagingEnabled
                snapEnabled
                customConfig={() => ({ type: 'positive', viewCount: 10 })}
                mode="horizontal-stack"
                modeConfig={{
                  snapDirection: 'right',
                  stackInterval: 18,
                }}
                data={movie.videos.results.splice(0, 5)}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => onPressVideo(item)}>
                    <View pointerEvents="none">
                      <YoutubePlayer height={300} videoId={item.key} onChangeState={() => {}} />
                    </View>
                  </TouchableOpacity>
                )}
              />
            </>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default MovieScreen;
