import { useRef, useState } from 'react';
import { Text, ScrollView, TouchableOpacity, ImageBackground, Image, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import Carousel from 'react-native-reanimated-carousel';
import { useQuery } from 'react-query';
import { RouteProp, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import YoutubePlayer, { YoutubeIframeRef } from 'react-native-youtube-iframe';

import { getMovie } from 'app/features/movies/api/movies';
import { getBackdropUrl, getPosterUrl } from 'app/misc/imgHelpers';

import { HomeNavigatorParamList } from '@features/home/navigation/HomeStack';
import screen from '@navigation/screens';
import { fontSize } from '@constants/typography';
import React from 'react';
import { interpolate } from 'react-native-reanimated';

interface MovieScreenProps {}

const MovieScreen: React.FunctionComponent<MovieScreenProps> = () => {
  const { params } = useRoute<RouteProp<HomeNavigatorParamList, screen.MOVIE>>();
  const { data: movie } = useQuery(['movie', params.id], () => getMovie(params.id));
  const [playing, setPlaying] = useState(false);
  const ytRef = useRef<YoutubeIframeRef>(null);

  const handleSeek = () => {
    ytRef.current?.seekTo(10, true);
  };

  const animationStyle = React.useCallback((value: number) => {
    'worklet';

    const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
    const scale = interpolate(value, [-1, 0, 1], [1.25, 1, 0.25]);
    const opacity = interpolate(value, [-0.75, 0, 1], [0, 1, 0]);

    return {
      transform: [{ scale }],
      zIndex,
      opacity,
    };
  }, []);

  return (
    <ScrollView>
      {movie && (
        <>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{movie.title || movie.original_title || movie.original_name}</Text>
          <Text>Released: {dayjs(movie.release_date).format('MMM DD, YYYY')}</Text>
          <View style={{ height: 200 }}>
            <ImageBackground source={{ uri: getBackdropUrl(movie.backdrop_path, 'w780') }} style={StyleSheet.absoluteFill} />
            <BlurView style={{ flex: 1 }} intensity={10} />
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Image
              source={{ uri: getPosterUrl(movie.poster_path, 'w342') }}
              style={{ width: 150, height: 240, borderRadius: 10, marginRight: 10 }}
            />

            <Text style={{ flex: 1 }}>Overview: {movie.overview}</Text>
          </View>
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
            data={movie.images.backdrops}
            renderItem={({ item }) => (
              <Image source={{ uri: getBackdropUrl(item.file_path, 'w780') }} style={{ width: 300, height: 200 }} />
            )}
          />

          {/*   <Carousel
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
            renderItem={({ item }) => <Image source={{ uri: getPosterUrl(item.file_path, 'w780') }} style={{ width: 300, height: 200 }} />}
          /> */}

          {/* <Carousel
            height={200}
            width={300}
            data={movie.videos.results}
            renderItem={({ item }) => <YoutubePlayer height={300} videoId={item.key} onChangeState={() => {}} />}
          /> */}

          <TouchableOpacity onPress={() => setPlaying(!playing)}>
            <Text>Toggle play/pause</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSeek}>
            <Text>Toggle seek</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

export default MovieScreen;
