import { LiveKitRoom } from '@livekit/react-components';
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';

async function onConnected(room) {
  await room.localParticipant.setCameraEnabled(true);
  await room.localParticipant.setMicrophoneEnabled(true);
}

const WebRTCPage: NextPage = () => {
  const url = 'wss://livekit.cinesimul.xyz';

  const [token, setToken] = useState('');

  const token1 =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTA3MTM2MDcsImlzcyI6IkFQSTJOS1pmYkpCZzYzdyIsImp0aSI6InRvbnlfc3RhcmsiLCJuYW1lIjoiVG9ueSBTdGFyayIsIm5iZiI6MTY1NDcxMzYwNywic3ViIjoidG9ueV9zdGFyayIsInZpZGVvIjp7InJvb20iOiJzdGFyay10b3dlciIsInJvb21Kb2luIjp0cnVlfX0.A-YZuBl7MPJUrodPcEYhKrdnEEub-pBav1M-LJ8HeGY    ';

  const token2 =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6InN0YXJrLXRvd2VyIn0sImlhdCI6MTY1NDcxOTY2NywibmJmIjoxNjU0NzE5NjY3LCJleHAiOjE2NTQ3NDEyNjcsImlzcyI6IkFQSTJOS1pmYkpCZzYzdyIsInN1YiI6IkJPU1MzIiwianRpIjoiQk9TUzMifQ.RuaKmoEsi5GifCSFwzQkYmjYhfMEFy2y9ddI8Az2lYU';
  return (
    <>
      <button onClick={() => setToken(token1)}>token1</button>
      <br />
      <button onClick={() => setToken(token2)}>token2</button>
      <div className="roomContainer">{token && <LiveKitRoom url={url} token={token} onConnected={(room) => onConnected(room)} />}</div>
    </>
  );
};

export default WebRTCPage;
