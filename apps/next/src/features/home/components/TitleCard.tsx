import Image from 'next/image';

import { Title } from 'app/features/titles/types';
import Link from 'next/link';

interface TitleCardProps {
  title: Title;
  type: 'movie' | 'tv';
}

const TitleCard: React.FC<TitleCardProps> = ({ title, type }) => {
  const url = `/${type}/${title.id}`;

  return (
    <Link href={url} passHref>
      <div className="m-1 relative w-52 hover:cursor-pointer">
        <Image
          src={`https://image.tmdb.org/t/p/w300${title.poster_path}`}
          alt="Movie poster"
          width={300}
          height={450}
          className="rounded"
        />
        <h1 className="absolute bottom-0 backdrop-blur-md w-full rounded-t-md text-white text-center p-3">
          {title.title || title.original_title || title.original_name}
        </h1>
      </div>
    </Link>
  );
};

export default TitleCard;
