import Image from 'next/image';

interface MovieCardProps {
  movie: any;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const img = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

  return (
    <div className="rounded m-1 relative">
      <Image src={img} alt="Movie poster" width={300} height={450} />
      <h1 className="absolute bottom-2 backdrop-blur-md w-full rounded-t-sm text-white text-center p-3">
        {movie.title || movie.original_name}
      </h1>
    </div>
  );
};

export default MovieCard;
