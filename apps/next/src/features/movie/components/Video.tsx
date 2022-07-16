import React from 'react';
import YouTube from 'react-youtube';
import { useRouter } from 'next/router';

import { Video as VideoType } from 'app/features/movies/types';
import { joinRoom } from 'app/features/webrtc/api';

interface VideoProps {
  video: VideoType;
}

const Video: React.FC<VideoProps> = ({ video }) => {
  const router = useRouter();

  const onClickWatch = async () => {
    const token = await joinRoom(video.id);
    router.push(`/webrtc?videoId=${video.key}&token=${token}`);
  };

  return (
    <div className="flex flex-col">
      <YouTube
        videoId={`${video.key}`}
        opts={{
          playerVars: {
            controls: 0,
            enablejsapi: 1,
            modestbranding: 1,
            showinfo: 0,
          },
        }}
      />
      <button onClick={onClickWatch} className="self-center">
        Watch together
      </button>
    </div>
  );
};

export default Video;
