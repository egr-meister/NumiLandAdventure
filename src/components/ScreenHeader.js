import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PressableScale from './PressableScale';
import {SIZES} from '../theme/typography';

export default function ScreenHeader({title, emoji, theme, onBack}) {
  return (
    <View style={styles.row}>
      {onBack ? (
        <PressableScale
          onPress={onBack}
          accessibilityLabel="Go back"
          style={[styles.back, {backgroundColor: theme.card}]}>
          <Text style={[styles.backText, {color: theme.text}]}>‹</Text>
        </PressableScale>
      ) : (
        <View style={styles.back} />
      )}
      <Text style={[styles.title, {color: theme.text}]} numberOfLines={1}>
        {emoji ? `${emoji} ` : ''}
        {title}
      </Text>
      <View style={styles.back} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {fontSize: SIZES.heading, fontWeight: '800', flex: 1, textAlign: 'center'},
  back: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {fontSize: 30, fontWeight: '800', marginTop: -4},
});
