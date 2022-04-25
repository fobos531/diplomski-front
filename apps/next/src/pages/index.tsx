import { NextPage } from 'next';

import VideoBackground from '@features/home/VideoBackground';

const Home: NextPage = () => {
  return (
    <VideoBackground>
      <div className="flex flex-col content-center">
        <h1 className="text-white text-center">CineSimul</h1>
        <h3 className="text-white text-center">Lose yourself in movies.</h3>
      </div>
    </VideoBackground>
  );
};

export default Home;
