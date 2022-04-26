import Image from 'next/image';

import { Title } from 'app/features/titles/types';

interface MovieCardProps {
  title: Title;
}

const MovieCard: React.FC<MovieCardProps> = ({ title }) => {
  const img = `https://image.tmdb.org/t/p/w300${title.poster_path}`;

  return (
    <div className="m-1 relative w-52">
      <Image src={img} alt="Movie poster" width={300} height={450} className="rounded" />
      <h1 className="absolute bottom-0 backdrop-blur-md w-full rounded-t-md text-white text-center p-3">
        {title.title || title.original_title || title.original_name}
      </h1>
    </div>
  );
};

export default MovieCard;
