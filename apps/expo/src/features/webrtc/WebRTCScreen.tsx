import * as React from 'react';
import YoutubePlayer, { YoutubeIframeRef } from 'react-native-youtube-iframe';

import { StyleSheet, View, FlatList, ListRenderItem, findNodeHandle, NativeModules, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { RoomControls } from './RoomControls';
import { ParticipantView } from './ParticipantView';
import { Participant, Room, RoomEvent, DataPacket_Kind } from 'livekit-client';
import { useRoom, useParticipant } from 'livekit-react-native';
import type { TrackPublication } from 'livekit-client';
import { Platform } from 'react-native';
// @ts-ignore
import { ScreenCapturePickerView } from 'react-native-webrtc';
//import { startCallService, stopCallService } from './callservice/CallService';

const RoomPage = ({ navigation, route }) => {
  const [playing, setPlaying] = useState(false);
  const ytRef = React.useRef<YoutubeIframeRef>(null);

  const [who, setWho] = useState<'me' | 'them' | null>(null);

  const handleSeek = (time: number) => {
    if (who === 'them') {
      setWho('me');
      return;
    }

    const strData = JSON.stringify({ type: 'seek', time, token });
    const encoder = new TextEncoder();

    // publishData takes in a Uint8Array, so we need to convert it
    const data = encoder.encode(strData);

    if (who === null || who === 'me') {
      if (who === null) setWho('me');
      room?.localParticipant.publishData(data, DataPacket_Kind.RELIABLE);
    }
  };

  const [sequence, setSequence] = useState([]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const handlePlay = () => {
    if (who === 'them') {
      setWho('me');
      return;
    }

    const strData = JSON.stringify({ type: 'play', token });
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

    const strData = JSON.stringify({ type: 'pause', token });
    const encoder = new TextEncoder();

    // publishData takes in a Uint8Array, so we need to convert it
    const data = encoder.encode(strData);

    if (who === null || who === 'me') {
      if (who === null) setWho('me');
      room?.localParticipant.publishData(data, DataPacket_Kind.RELIABLE);
    }
  };

  const isSubArrayEnd = (A, B) => {
    if (A.length < B.length) return false;
    let i = 0;
    while (i < B.length) {
      if (A[A.length - i - 1] !== B[B.length - i - 1]) return false;
      i++;
    }
    return true;
  };

  const handleEvent = (event: YouTubeEvent) => {
    const type = event.data as number;

    // Update sequence with current state change event
    setSequence([...sequence, type]);
    if (type === 1 && isSubArrayEnd(sequence, [3]) && !sequence.includes(-1)) {
      handleSeek(event.target.getCurrentTime()); // Arrow keys seek
      setSequence([]); // Reset event sequence
    } else {
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

  const [, setIsConnected] = useState(false);
  const [room] = useState(
    () =>
      new Room({
        publishDefaults: { simulcast: false },
        adaptiveStream: true,
      }),
  );
  const { participants } = useRoom(room);

  const { token, videoId } = route.params;

  const url = 'wss://livekit.cinesimul.xyz';

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  // Connect to room.
  useEffect(() => {
    room.connect(url, token, {}).then((r) => {
      if (!r) {
        console.log('failed to connect to ', url, ' ', token);
        return;
      }
      console.log('connected to ', url, ' ', token);
      setIsConnected(true);
      room.on(RoomEvent.DataReceived, (data) => {
        setWho('them');
        console.log('DATA', data);

        const decoder = new TextDecoder();

        const strData = decoder.decode(data);
        const podaci = JSON.parse(strData);
        console.log('PODACI', podaci);

        if (podaci.token === token) return;

        if (podaci.type === 'seek') {
          return ytRef.current?.seekTo(podaci.time, true);
        }

        if (podaci.type === 'play') {
          return ytRef.current?.playVideo();
        }

        if (podaci.type === 'pause') {
          return ytRef.current?.pauseVideo();
        }
      });
    });
    return () => {
      room.disconnect();
    };
  }, []);

  // Perform platform specific call setup.
  useEffect(() => {
    // startCallService();
    return () => {
      // stopCallService();
    };
  }, []);

  // Setup views.
  const stageView = participants.length > 0 && <ParticipantView participant={participants[0]} style={styles.stage} />;

  const renderParticipant: ListRenderItem<Participant> = ({ item }) => {
    return <ParticipantView participant={item} style={styles.otherParticipantView} />;
  };

  const otherParticipantsView = participants.length > 0 && (
    <FlatList
      data={participants}
      renderItem={renderParticipant}
      keyExtractor={(item) => item.sid}
      horizontal={true}
      style={styles.otherParticipantsList}
    />
  );

  const { cameraPublication, microphonePublication, screenSharePublication } = useParticipant(room.localParticipant);

  // Prepare for iOS screenshare.
  const screenCaptureRef = React.useRef(null);
  const screenCapturePickerView = Platform.OS === 'ios' && <ScreenCapturePickerView ref={screenCaptureRef} />;
  const startBroadcast = async () => {
    if (Platform.OS === 'ios') {
      const reactTag = findNodeHandle(screenCaptureRef.current);
      await NativeModules.ScreenCapturePickerViewManager.show(reactTag);
      room.localParticipant.setScreenShareEnabled(true);
    } else {
      room.localParticipant.setScreenShareEnabled(true);
    }
  };

  return (
    <View style={styles.container}>
      {stageView}
      {otherParticipantsView}
      <RoomControls
        micEnabled={isTrackEnabled(microphonePublication)}
        setMicEnabled={(enabled: boolean) => {
          room.localParticipant.setMicrophoneEnabled(enabled);
        }}
        cameraEnabled={isTrackEnabled(cameraPublication)}
        setCameraEnabled={(enabled: boolean) => {
          room.localParticipant.setCameraEnabled(enabled);
        }}
        screenShareEnabled={isTrackEnabled(screenSharePublication)}
        setScreenShareEnabled={(enabled: boolean) => {
          if (enabled) {
            startBroadcast();
          } else {
            room.localParticipant.setScreenShareEnabled(enabled);
          }
        }}
        onDisconnectClick={() => {
          navigation.pop();
        }}
      />
      {screenCapturePickerView}
      <YoutubePlayer ref={ytRef} height={300} width={400} play={playing} videoId={videoId} onChangeState={handleEvent} />
    </View>
  );
};

function isTrackEnabled(pub?: TrackPublication): boolean {
  return !(pub?.isMuted ?? true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stage: {
    flex: 1,
    width: '100%',
  },
  otherParticipantsList: {
    width: '100%',
    height: 150,
    flexGrow: 0,
  },
  otherParticipantView: {
    width: 150,
    height: 150,
  },
});

export default RoomPage;
