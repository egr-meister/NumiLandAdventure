import React from 'react';
import {StyleSheet, Text} from 'react-native';
import PressableScale from './PressableScale';
import {SIZES, SHADOW} from '../theme/typography';

export default function BigButton({label, onPress, color, textColor, style, disabled}) {
  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={label}
      style={[
        styles.button,
        SHADOW,
        {backgroundColor: color, opacity: disabled ? 0.6 : 1},
        style,
      ]}>
      <Text style={[styles.label, {color: textColor || '#FFFFFF'}]}>{label}</Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: SIZES.button,
    fontWeight: '800',
  },
});
