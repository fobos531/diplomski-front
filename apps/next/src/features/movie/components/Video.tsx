import React from 'react';
import YouTube from 'react-youtube';

import { Video as VideoType } from 'app/features/movies/types';

interface VideoProps {
  video: VideoType;
}

const Video: React.FC<VideoProps> = ({ video }) => {
  //  console.log('video', video);

  return <YouTube videoId={`${video.key}`} />;
};

export default Video;
