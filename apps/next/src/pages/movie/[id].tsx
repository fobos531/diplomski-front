import { GetServerSideProps, NextPage } from 'next';
import dayjs from 'dayjs';
import Image from 'next/image';
import Youtube from 'react-youtube';

import { getMovie } from 'app/features/movies/api/movies';
import { Movie } from 'app/features/movies/types';
import { useRef } from 'react';
import YouTube from 'react-youtube';

interface MovieProps {
  movie: Movie;
}

const Movie: NextPage<MovieProps> = ({ movie }) => {
  const ytRef = useRef<YouTube>(null);

  const handleSeek = () => {
    ytRef.current?.getInternalPlayer().seekTo(10);
  };

  return (
    <div>
      <div>{movie.title || movie.original_title || movie.original_name}</div>
      <div>Released: {dayjs(movie.release_date).format('MMM DD, YYYY')}</div>
      <div>Genres: {movie.genres.map((g) => g.name).join(' ')}</div>
      <div>Status: {movie.status}</div>
      <Image src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt="Movie poster" width={300} height={450} className="rounded" />
      <div>Average rating: {movie.vote_average}</div>
      <Youtube videoId="81-34IJPlLM" ref={ytRef} />
      <button onClick={handleSeek}>E boss</button>
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
