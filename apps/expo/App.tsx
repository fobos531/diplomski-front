import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';

const App = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.GOOGLE_AUTH_IOS_CLIENT_ID,
  });

  React.useEffect(() => {
    console.log('RESPONSE', response);
  }, [response]);

  return (
    <View style={{ marginTop: 50 }}>
      <TouchableOpacity onPress={() => promptAsync()}>
        <Text>Bok</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
