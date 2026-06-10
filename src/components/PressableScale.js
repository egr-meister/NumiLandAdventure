// A button-like wrapper that gently scales down on press (soft micro-animation).
import React, {useRef} from 'react';
import {Animated, Pressable} from 'react-native';

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
      onPress={onPress}>
      <Animated.View style={[{transform: [{scale}]}, style]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
