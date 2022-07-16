import { LiveKitRoom } from '@livekit/react-components';
import { NextPage } from 'next';
import { Room, DataPacket_Kind, RoomEvent } from 'livekit-client';
import { useEffect, useRef, useState } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';
import { Text } from '@nextui-org/react';
import { useRouter } from 'next/router';

async function onConnected(room: Room) {
  await room.localParticipant.setCameraEnabled(true);
  await room.localParticipant.setMicrophoneEnabled(true);
}

const WebRTCPage: NextPage = () => {
  const url = 'wss://livekit.cinesimul.xyz';

  const { query } = useRouter();
  const [room, setRoom] = useState<Room | null>(null);
  const ytRef = useRef<YouTube>(null);

  const handleSeek = () => {
    ytRef.current?.getInternalPlayer().seekTo(100, true);
  };

  const token1 =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTA3MTM2MDcsImlzcyI6IkFQSTJOS1pmYkpCZzYzdyIsImp0aSI6InRvbnlfc3RhcmsiLCJuYW1lIjoiVG9ueSBTdGFyayIsIm5iZiI6MTY1NDcxMzYwNywic3ViIjoidG9ueV9zdGFyayIsInZpZGVvIjp7InJvb20iOiJzdGFyay10b3dlciIsInJvb21Kb2luIjp0cnVlfX0.A-YZuBl7MPJUrodPcEYhKrdnEEub-pBav1M-LJ8HeGY';

  const strData = JSON.stringify({ some: 'data' });
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  // publishData takes in a Uint8Array, so we need to convert it
  const data = encoder.encode(strData);

  const token2 =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6InN0YXJrLXRvd2VyIn0sImlhdCI6MTY1NzQ1NTMxNiwibmJmIjoxNjU3NDU1MzE2LCJleHAiOjE2NTc0NzY5MTYsImlzcyI6IkFQSTJOS1pmYkpCZzYzdyIsInN1YiI6IkJPU1MzIiwianRpIjoiQk9TUzMifQ.w7srTIrAvYclKg8z7xCpDGlHonIFBJuj7oqct_Pr12c';
  return (
    <>
      <Text h1 weight="bold" className="text-center">
        Chat session
      </Text>

      <br />
      {room && <button onClick={() => room.localParticipant.publishData(data, DataPacket_Kind.RELIABLE)}>publish</button>}

      <div className="roomContainer">
        <LiveKitRoom
          url={url}
          token={query.token as string}
          onConnected={(room) => {
            setRoom(room);
            onConnected(room);
            room.on(RoomEvent.DataReceived, (data) => {
              console.log('DATA', data);
              handleSeek();
            });
          }}
        />
        x
      </div>
      <YouTube videoId={`${query.videoId}`} ref={ytRef} />
    </>
  );
};

export default WebRTCPage;
