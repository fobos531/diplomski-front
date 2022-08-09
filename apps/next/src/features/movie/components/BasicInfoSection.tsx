import React from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { Text } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { useAtom } from 'jotai';
import { CircularProgressbar } from 'react-circular-progressbar';

import { Movie } from 'app/features/movies/types';
import { getBackdropUrl, getPosterUrl } from 'app/misc/imgHelpers';
import { watchlistAtom } from '@features/watchlist/store';

interface BasicInfoSectionProps {
  movie: Movie;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ movie }) => {
  const [watchList, setWatchList] = useAtom(watchlistAtom);

  return (
    <div style={{ position: 'relative' }} className="flex flex-row py-8">
      <Image src={getBackdropUrl(movie.backdrop_path, 'w1280')} alt="Movie poster" layout="fill" className="blur" />
      <div className="ml-10">
        <Image
          src={getPosterUrl(movie.poster_path, 'w780')}
          alt="Movie poster"
          width={300}
          height={450}
          className="rounded"
          style={{ boxShadow: 'inherit' }}
        />
      </div>
      <div className="flex flex-row z-30 ml-3">
        <div>
          <Text color="white" weight="bold">
            {movie.title || movie.original_title || movie.original_name}
          </Text>
          <Text color="white">{dayjs(movie.release_date).format('MMM DD, YYYY')}</Text>
          <Text color="white">Genres: {movie.genres.map((g) => g.name).join(' ')}</Text>
          <Text color="white">Status: {movie.status}</Text>

          <Text color="white">Runtime: {dayjs.duration({ minutes: movie.runtime }).asHours().toFixed(2)} h</Text>
          <Text color="white">Average rating: {movie.vote_average}</Text>
          <CircularProgressbar
            value={movie.vote_average}
            minValue={1}
            maxValue={10}
            text={movie.vote_average.toString()}
            styles={{ root: { width: 115, height: 115 } }}
          />
          <Button
            color="primary"
            shadow
            auto
            onClick={() => {
              setWatchList([...watchList, movie]);
            }}>
            Add to watchlist
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSection;
