import { useRef } from 'react';
import YouTube from 'react-youtube';
import { GetServerSideProps, NextPage } from 'next';
import dayjs from 'dayjs';
import Image from 'next/image';
import Youtube from 'react-youtube';

import { getMovie, getMovieCredits } from 'app/features/movies/api/movies';
import { Credits, Movie } from 'app/features/movies/types';
import { getBackdropUrl, getPosterUrl } from 'app/misc/imgHelpers';

interface MovieProps {
  movie: Movie;
  credits: Credits;
}

const Movie: NextPage<MovieProps> = ({ movie }) => {
  const ytRef = useRef<YouTube>(null);

  const handleSeek = () => {
    ytRef.current?.getInternalPlayer().seekTo(10);
  };

  return (
    <div>
      {/*       TODO: // Fix gradient fade */}
      <div style={{ height: 400, position: 'relative' }} className="bg-gradient-to-r from-purple-500 to-pink-500">
        <Image src={getBackdropUrl(movie.backdrop_path, 'w1280')} alt="Movie poster" layout="fill" className="absolute" />
      </div>

      <div>{movie.title || movie.original_title || movie.original_name}</div>
      <div>Released: {dayjs(movie.release_date).format('MMM DD, YYYY')}</div>
      <div>Genres: {movie.genres.map((g) => g.name).join(' ')}</div>
      <div>Status: {movie.status}</div>

      <Image src={getPosterUrl(movie.poster_path, 'w780')} alt="Movie poster" width={300} height={450} className="rounded" />
      <div>Average rating: {movie.vote_average}</div>
      <Youtube videoId="81-34IJPlLM" ref={ytRef} />
      <button onClick={handleSeek}>E boss</button>
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
