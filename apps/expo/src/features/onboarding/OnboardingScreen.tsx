import { useMemo } from 'react';
import { Video } from 'expo-av';
import { Animated, StyleSheet, Text, View } from 'react-native';

const OnboardingScreen: React.FC = () => {
  const opacity = useMemo(() => new Animated.Value(0), []);

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Animated.View style={[styles.backgroundViewWrapper, { opacity: opacity }]}>
          <Video
            isLooping
            isMuted
            positionMillis={500}
            onLoad={() => {
              Animated.timing(opacity, {
                toValue: 1,
                useNativeDriver: true,
              }).start();
            }}
            resizeMode="cover"
            shouldPlay
            source={{
              uri: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4',
            }}
            style={{ flex: 1 }}
          />
        </Animated.View>
      </View>
      <View style={styles.overlay}>
        <Text style={styles.title}>CineSimul</Text>
        <Text style={styles.title}>Lose yourself in movies.</Text>
      </View>
      {/* Ideja za tranziciju: Swipe up na cijelom tom screenu (slicno kak dok se iphone unlocka) i onda dojde ostatak aplikacije */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});

export default OnboardingScreen;
