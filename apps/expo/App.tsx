import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { mediaDevices } from 'react-native-webrtc';

const App = () => {
  useEffect(() => {
    const configuration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };

    let isFront = true;
    mediaDevices.enumerateDevices().then((sourceInfos) => {
      console.log(sourceInfos);
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
        .then((stream) => {
          // Got stream!
        })
        .catch((error) => {
          // Log error
        });
    });
  }, []);

  return (
    <View style={{ marginTop: 50 }}>
      <TouchableOpacity onPress={() => {}}>
        <Text>Bok</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
