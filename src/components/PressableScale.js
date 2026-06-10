// A button-like wrapper that gently scales down on press (soft micro-animation).
// The visual style is applied to the Pressable itself so it participates in
// flex/row layouts (e.g. flex:1 keys and answer buttons stretch correctly).
import React, {useRef} from 'react';
import {Animated, Pressable, StyleSheet} from 'react-native';

export default function PressableScale({
  children,
  onPress,
  style,
  disabled,
  accessibilityLabel,
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = to =>
    Animated.spring(scale, {
      toValue: to,
      useNativeDriver: true,
      speed: 40,
      bounciness: 8,
    }).start();

  return (
    <Pressable
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPressIn={() => animateTo(0.94)}
      onPressOut={() => animateTo(1)}
      onPress={onPress}
      style={style}>
      <Animated.View style={[styles.inner, {transform: [{scale}]}]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // Fill the Pressable so children stay centered while the press scale animates.
  inner: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
