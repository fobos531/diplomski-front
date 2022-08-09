import { GetServerSideProps, NextPage } from 'next';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Text } from '@nextui-org/react';

dayjs.extend(duration);

import 'react-circular-progressbar/dist/styles.css';

import { getMovie, getMovieCredits } from 'app/features/movies/api/movies';
import { Credits, Movie } from 'app/features/movies/types';
import ImageSwiper from '@features/movie/components/ImageSwiper';
import CastMember from '@features/movie/components/CastMember';
import VideosList from '@features/movie/components/VideosList';
import BasicInfoSection from '@features/movie/components/BasicInfoSection';

interface MovieProps {
  movie: Movie;
  credits: Credits;
}

const Movie: NextPage<MovieProps> = ({ movie, credits }) => {
  return (
    <div>
      <BasicInfoSection movie={movie} />
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
