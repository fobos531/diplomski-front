import React from 'react';

import Video from './Video';

import { Video as VideoType } from 'app/features/movies/types';

interface VideosListProps {
  videos: VideoType[];
}

const VideosList: React.FC<VideosListProps> = ({ videos }) => {
  console.log('TU');

  return (
    <ul className="overflow-x-scroll flex flex-row">
      {videos.map((v) => (
        <div key={v.id} className="mr-3">
          <Video video={v} />
        </div>
      ))}
    </ul>
  );
};

export default VideosList;
