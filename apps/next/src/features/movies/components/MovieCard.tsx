import Image from 'next/image';

import { Movie } from 'app/features/movies/types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const img = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

  return (
    <div className="m-1 relative w-52">
      <Image src={img} alt="Movie poster" width={300} height={450} className="rounded" />
      <h1 className="absolute bottom-0 backdrop-blur-md w-full rounded-t-md text-white text-center p-3">
        {movie.title || movie.original_title || movie.original_name}
      </h1>
    </div>
  );
};

export default MovieCard;
