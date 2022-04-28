import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-query';
import { RouteProp, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import YoutubePlayer, { YoutubeIframeRef } from 'react-native-youtube-iframe';

import { getMovie } from 'app/features/movies/api/movies';

import { HomeNavigatorParamList } from '@features/home/navigation/HomeStack';
import screen from '@navigation/screens';
import { fontSize } from '@constants/typography';
import { useRef, useState } from 'react';

interface MovieScreenProps {}

const MovieScreen: React.FunctionComponent<MovieScreenProps> = () => {
  const { params } = useRoute<RouteProp<HomeNavigatorParamList, screen.MOVIE>>();
  const { data: movie } = useQuery(['movie', params.id], () => getMovie(params.id));
  const [playing, setPlaying] = useState(false);
  const ytRef = useRef<YoutubeIframeRef>(null);

  const handleSeek = () => {
    ytRef.current?.seekTo(10, true);
  };

  return (
    <ScrollView>
      {movie && (
        <>
          <Text>{movie.title || movie.original_title || movie.original_name}</Text>
          <Text>Released: {dayjs(movie.release_date).format('MMM DD, YYYY')}</Text>
          <Text>Overview: {movie.overview}</Text>
          <Text style={{ fontSize: fontSize.large }}>Videos</Text>
          {movie.videos.results.map((v) => (
            <Text>{v.name}</Text>
          ))}
          <YoutubePlayer ref={ytRef} height={300} play={playing} videoId={'81-34IJPlLM'} onChangeState={() => {}} />
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
