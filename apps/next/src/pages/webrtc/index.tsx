import { LiveKitRoom } from '@livekit/react-components';
import { NextPage } from 'next';
import { Room, RoomEvent } from 'livekit-client';
import { useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
// CSS should be explicitly imported if using the default UI
import '@livekit/react-components/dist/index.css';
// used by the default ParticipantView to maintain video aspect ratio.
// this CSS must be imported globally
// if you are using a custom Participant renderer, this import isn't necessary.
import 'react-aspect-ratio/aspect-ratio.css';
import QRCodeModal from '@features/webrtc/components/QRCodeModal';
import useWebRTCSession from '@features/webrtc/hooks/useWebRTCSession';

async function onConnected(room: Room) {
  //await room.localParticipant.setCameraEnabled(true);
  //await room.localParticipant.setMicrophoneEnabled(true);
}

const WebRTCPage: NextPage = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const { query } = useRouter();
  const ytRef = useRef<YouTube>(null);
  const { url, setRoom, handleYoutubeEvent, onLiveKitDataReceived } = useWebRTCSession({ ytRef, token: query.token as string });

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Text h1 weight="bold" className="text-center">
        Chat session
      </Text>

      <br />
      <div className="roomContainer">
        <LiveKitRoom
          url={url}
          token={query.token as string}
          onConnected={(room) => {
            setRoom(room);
            onConnected(room);
            room.on(RoomEvent.DataReceived, onLiveKitDataReceived);
          }}
        />
      </div>
      <YouTube videoId={`${query.videoId}`} ref={ytRef} onStateChange={handleYoutubeEvent} />

      <button
        onClick={() => {
          setVisible(true);
        }}>
        Share QR Code for web
      </button>

      <QRCodeModal visible={visible} onClose={onClose} videoId={query.videoId as string} />
    </>
  );
};

export default WebRTCPage;
