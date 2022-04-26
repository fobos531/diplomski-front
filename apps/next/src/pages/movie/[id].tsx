import { GetServerSideProps, NextPage } from 'next';
import dayjs from 'dayjs';
import Image from 'next/image';

import { getMovie } from 'app/features/movies/api/movies';
import { Movie } from 'app/features/movies/types';

interface MovieProps {
  movie: Movie;
}

const Movie: NextPage<MovieProps> = ({ movie }) => {
  return (
    <div>
      <div>{movie.title || movie.original_title || movie.original_name}</div>
      <div>Released: {dayjs(movie.release_date).format('MMM DD, YYYY')}</div>
      <div>Genres: {movie.genres.map((g) => g.name).join(' ')}</div>
      <div>Status: {movie.status}</div>
      <Image src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt="Movie poster" width={300} height={450} className="rounded" />
      <div>Average rating: {movie.vote_average}</div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;

  const movie = await getMovie(Number(id));

  return {
    props: {
      movie,
    },
  };
};

export default Movie;
