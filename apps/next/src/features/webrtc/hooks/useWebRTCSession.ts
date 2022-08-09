import { RefObject, useState } from 'react';
import { Room, DataPacket_Kind, RoomEvent } from 'livekit-client';
import YouTube, { YouTubeEvent } from 'react-youtube';

const useWebRTCSession = ({ ytRef, token }: { ytRef: RefObject<YouTube>; token: string }) => {
  const url = 'wss://livekit.cinesimul.xyz';

  const [room, setRoom] = useState<Room | null>(null);
  const [sequence, setSequence] = useState<any>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [who, setWho] = useState<'me' | 'them' | null>(null);

  const handleSeek = (time: number) => {
    if (who === 'them') {
      setWho('me');
      return;
    }

    const strData = JSON.stringify({ type: 'seek', time, token: token });
    const encoder = new TextEncoder();

    // publishData takes in a Uint8Array, so we need to convert it
    const data = encoder.encode(strData);

    if (who === null || who === 'me') {
      if (who === null) setWho('me');
      room?.localParticipant.publishData(data, DataPacket_Kind.RELIABLE);
    }
  };

  const handlePlay = () => {
    if (who === 'them') {
      setWho('me');
      return;
    }

    const strData = JSON.stringify({ type: 'play', token: token });
    const encoder = new TextEncoder();

    // publishData takes in a Uint8Array, so we need to convert it
    const data = encoder.encode(strData);

    if (who === null || who === 'me') {
      if (who === null) setWho('me');
      room?.localParticipant.publishData(data, DataPacket_Kind.RELIABLE);
    }
  };
  const handlePause = () => {
    if (who === 'them') {
      setWho('me');
      return;
    }

    console.log('PAUSE EVENT');

    const strData = JSON.stringify({ type: 'pause', token: token });
    const encoder = new TextEncoder();

    // publishData takes in a Uint8Array, so we need to convert it
    const data = encoder.encode(strData);

    if (who === null || who === 'me') {
      if (who === null) setWho('me');
      room?.localParticipant.publishData(data, DataPacket_Kind.RELIABLE);
    }
  };

  const isSubArrayEnd = (A: any[], B: any[]) => {
    if (A.length < B.length) return false;
    let i = 0;
    while (i < B.length) {
      if (A[A.length - i - 1] !== B[B.length - i - 1]) return false;
      i++;
    }
    return true;
  };

  const handleYoutubeEvent = (event: YouTubeEvent) => {
    const type = event.data as number;

    // Update sequence with current state change event
    setSequence([...sequence, type]);
    if (type === 1 && isSubArrayEnd(sequence, [3]) && !sequence.includes(-1)) {
      handleSeek(event.target.getCurrentTime()); // Arrow keys seek
      setSequence([]); // Reset event sequence
    } else {
      //@ts-ignore
      clearTimeout(timer); // Cancel previous event
      if (type !== 3) {
        // If we're not buffering,
        let timeout = setTimeout(function () {
          // Start timer
          if (type === 1) handlePlay();
          else if (type === 2) handlePause();
          setSequence([]); // Reset event sequence
        }, 250);
        setTimer(timeout);
      }
    }
  };

  const onLiveKitDataReceived = (data: Uint8Array) => {
    setWho('them');
    console.log('DATA', data);

    const decoder = new TextDecoder();

    const strData = decoder.decode(data);
    const podaci = JSON.parse(strData);
    console.log('PODACI', podaci);

    if (podaci.token === token) return;

    if (podaci.type === 'seek') {
      return ytRef.current?.getInternalPlayer().seekTo(podaci.time, true);
    }

    if (podaci.type === 'play') {
      return ytRef.current?.getInternalPlayer().playVideo();
    }

    if (podaci.type === 'pause') {
      return ytRef.current?.getInternalPlayer().pauseVideo();
    }
  };

  return { url, room, setRoom, handleYoutubeEvent, onLiveKitDataReceived };
};

export default useWebRTCSession;
