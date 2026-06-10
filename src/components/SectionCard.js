// Large rounded section card for the home screen.
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PressableScale from './PressableScale';
import {SIZES, SHADOW} from '../theme/typography';

export default function SectionCard({title, emoji, color, textColor, onPress}) {
  return (
    <PressableScale
      onPress={onPress}
      accessibilityLabel={title}
      style={[styles.card, SHADOW, {backgroundColor: color}]}>
      <View style={styles.inner}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={[styles.title, {color: textColor}]}>{title}</Text>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 130,
    borderRadius: SIZES.radius,
    padding: 16,
    justifyContent: 'center',
  },
  inner: {alignItems: 'center'},
  emoji: {fontSize: 46, marginBottom: 8},
  title: {fontSize: 20, fontWeight: '800', textAlign: 'center'},
});
