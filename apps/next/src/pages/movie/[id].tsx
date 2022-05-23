import { useRef } from 'react';
import YouTube from 'react-youtube';
import { GetServerSideProps, NextPage } from 'next';
import dayjs from 'dayjs';
import Image from 'next/image';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { getMovie, getMovieCredits } from 'app/features/movies/api/movies';
import { Credits, Movie } from 'app/features/movies/types';
import { getBackdropUrl, getPosterUrl, getProfileUrl } from 'app/misc/imgHelpers';
import ImageSwiper from '@features/movie/components/ImageSwiper';

interface MovieProps {
  movie: Movie;
  credits: Credits;
}

const Movie: NextPage<MovieProps> = ({ movie, credits }) => {
  return (
    <div>
      {/*       TODO: // Fix gradient fade */}
      <div style={{ height: 400, position: 'relative' }} className="bg-gradient-to-r from-purple-500 to-pink-500">
        <Image src={getBackdropUrl(movie.backdrop_path, 'w1280')} alt="Movie poster" layout="fill" className="absolute" />
      </div>

      <div className="flex flex-row">
        <Image src={getPosterUrl(movie.poster_path, 'w780')} alt="Movie poster" width={300} height={450} className="rounded" />
        <div>
          <div>{movie.title || movie.original_title || movie.original_name}</div>
          <div>{dayjs(movie.release_date).format('MMM DD, YYYY')}</div>
          <div>Genres: {movie.genres.map((g) => g.name).join(' ')}</div>
          <div>Status: {movie.status}</div>

          <div>Runtime: {dayjs.duration({ minutes: movie.runtime }).asHours()}h</div>
          <div>Average rating: {movie.vote_average}</div>
          <CircularProgressbar
            value={movie.vote_average}
            minValue={1}
            maxValue={10}
            text={movie.vote_average.toString()}
            styles={{ root: { width: 150, height: 150 } }}
          />
        </div>
      </div>
      <ul className="overflow-x-scroll flex flex-row">
        {credits.cast.map((c) => (
          <li key={c.id} className="flex-shrink-0 flex flex-col m-2">
            <Image src={getProfileUrl(c.profile_path + '', 'h632')} width={200} height={300} className="rounded" />
            <p className="self-center">{c.name}</p>
          </li>
        ))}
      </ul>

      <div>Media:</div>
      <ImageSwiper images={movie.images.posters} type="poster" />
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
