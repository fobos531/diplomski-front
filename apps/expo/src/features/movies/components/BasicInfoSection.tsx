/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useMemo } from 'react';
import { ImageBackground, View, StyleSheet, Text, Image, Button } from 'react-native';
import { BlurView } from 'expo-blur';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import CircularProgress from 'react-native-circular-progress-indicator';

import { getBackdropUrl, getPosterUrl } from 'app/misc/imgHelpers';
import { Movie } from 'app/features/movies/types';
import { watchlistAtom } from '@features/watchlist/store';
import { Title } from 'app/features/titles/types';

interface BasicInfoSectionProps {
  movie: Movie;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ movie }) => {
  const [watchList, setWatchList] = useAtom(watchlistAtom);

  const watchlistButtonText = useMemo(() => {
    const exists = watchList.find((title: Title) => title.id === movie.id);

    if (exists) {
      return 'Remove from watchlist';
    }
    return 'Add to watchlist';
  }, [movie.id, watchList]);

  const onClickWatchListButton = useCallback(() => {
    const exists = watchList.find((title: Title) => title.id === movie.id);
    if (exists) {
      setWatchList(watchList.filter((title: Title) => title.id !== movie.id));
    } else {
      //@ts-ignore
      setWatchList([...watchList, movie]);
    }
  }, [movie, setWatchList, watchList]);

  return (
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
          <CircularProgress value={movie.vote_average} maxValue={10} radius={30} />
        </View>
      </View>
      <Button title={watchlistButtonText} onPress={onClickWatchListButton} />
    </>
  );
};

export default BasicInfoSection;
