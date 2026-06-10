// Friendly talisman character. A floating star buddy made with emoji,
// so the app needs no external image assets to run.
import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';

export default function Mascot({size = 64, message}) {
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: -8,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [float]);

  return (
    <View style={styles.wrap}>
      <Animated.Text style={[{fontSize: size}, {transform: [{translateY: float}]}]}>
        🌟
      </Animated.Text>
      {message ? <Text style={styles.bubble}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {alignItems: 'center', justifyContent: 'center'},
  bubble: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '700',
    color: '#7A6A4F',
  },
});
