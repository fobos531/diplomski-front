import * as React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import YoutubePlayer, { YoutubeIframeRef } from 'react-native-youtube-iframe';

import { StyleSheet, View, FlatList, ListRenderItem, findNodeHandle, NativeModules, Text, TouchableOpacity } from 'react-native';
//import type { RootStackParamList } from './App';
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

  const handleSeek = () => {
    ytRef.current?.seekTo(100, true);
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
  // const { url, token } = route.params;
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6InN0YXJrLXRvd2VyIn0sImlhdCI6MTY1NDg1MzgyOCwibmJmIjoxNjU0ODUzODI4LCJleHAiOjE2NTQ4NzU0MjgsImlzcyI6IkFQSTJOS1pmYkpCZzYzdyIsInN1YiI6IkJPU1MzIiwianRpIjoiQk9TUzMifQ.lKQNBxB5b6EvXZD5pc8dZ3E0SnLvXIcjJ8OmYAFpynQ';

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
        const decoder = new TextDecoder();
        const halo = decoder.decode(data);
        console.log('HALO', halo);
        handleSeek();
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
      {/* {stageView}
      {otherParticipantsView} */}

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
      <TouchableOpacity
        onPress={() => {
          const strData = JSON.stringify({ some: 'data' });
          const encoder = new TextEncoder();
          room.localParticipant.publishData(encoder.encode(strData), DataPacket_Kind.RELIABLE);
        }}>
        <Text>BOSS</Text>
      </TouchableOpacity>
      <YoutubePlayer ref={ytRef} height={300} width={400} play={playing} videoId={'xwjwCFZpdns'} onChangeState={() => {}} />
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
