import { GetServerSideProps, NextPage } from 'next';
import dayjs from 'dayjs';
import Image from 'next/image';
import duration from 'dayjs/plugin/duration';
import { Text } from '@nextui-org/react';
import { Button } from '@nextui-org/react';

dayjs.extend(duration);

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { getMovie, getMovieCredits } from 'app/features/movies/api/movies';
import { Credits, Movie } from 'app/features/movies/types';
import { getBackdropUrl, getPosterUrl, getProfileUrl } from 'app/misc/imgHelpers';
import ImageSwiper from '@features/movie/components/ImageSwiper';
import CastMember from '@features/movie/components/CastMember';
import { joinRoom } from 'app/features/webrtc/api';
import { useRouter } from 'next/router';
import VideosList from '@features/movie/components/VideosList';

interface MovieProps {
  movie: Movie;
  credits: Credits;
}

const Movie: NextPage<MovieProps> = ({ movie, credits }) => {
  const router = useRouter();

  console.log('ALO', getBackdropUrl(movie.backdrop_path, 'w1280'));

  return (
    <div>
      {/*       TODO: // Fix gradient fade */}
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
            <Button color="primary" shadow auto>
              Add to watchlist
            </Button>
          </div>
        </div>
      </div>

      <Text h1 weight="bold" className="my-5">
        Cast
      </Text>
      <ul className="overflow-x-scroll flex flex-row">
        {credits.cast.map((c) => (
          <CastMember key={c.id} member={c} />
        ))}
      </ul>

      <Text h1 weight="bold" className="my-5">
        Media
      </Text>
      <ImageSwiper images={movie.images.posters.slice(0, 4)} type="poster" />

      {/* Videos */}
      <div className="my-4">
        <VideosList videos={movie.videos.results.slice(0, 4)} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;

  const movie = await getMovie(Number(id));
  const credits = await getMovieCredits(Number(id));

  return {
    props: {
      movie,
      credits,
    },
  };
};

export default Movie;
