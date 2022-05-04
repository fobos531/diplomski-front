import { NextPage } from 'next';
import { useEffect, useRef } from 'react';

const WebRTCPage: NextPage = () => {
  const userVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
          if (userVideo.current) {
            userVideo.current.srcObject = stream;
          }
        });
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <video autoPlay muted ref={userVideo} />
    </>
  );
};

export default WebRTCPage;
