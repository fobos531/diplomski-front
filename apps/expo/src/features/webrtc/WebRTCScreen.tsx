import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { mediaDevices, MediaStream, RTCView } from 'react-native-webrtc';

const WebRTCScreen: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    let isFront = true;
    mediaDevices.enumerateDevices().then((sourceInfos) => {
      // console.log(sourceInfos);
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (sourceInfo.kind == 'videoinput' && sourceInfo.facing == (isFront ? 'front' : 'environment')) {
          videoSourceId = sourceInfo.deviceId;
        }
      }
      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            width: 640,
            height: 480,
            frameRate: 30,
            facingMode: isFront ? 'user' : 'environment',
            deviceId: videoSourceId,
          },
        })
        .then((stream: MediaStream) => {
          setStream(stream);
          // Got stream!
        })
        .catch((error) => {
          // Log error
        });
    });
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>{stream && <RTCView streamURL={stream.toURL()} style={{ height: 300, width: '100%' }} />}</ScrollView>
  );
};

export default WebRTCScreen;
