import { NextPage } from 'next';

import VideoBackground from '@features/home/VideoBackground';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <VideoBackground>
      <div className="flex flex-col content-center">
        <h1 className="text-white text-center">CineSimul</h1>
        <h3 className="text-white text-center">Lose yourself in movies.</h3>
        <Link href="/movies" passHref>
          <button className="text-white">E boss</button>
        </Link>
      </div>
    </VideoBackground>
  );
};

export default Home;
