// A selectable pill used in Settings for choosing one option from a group.
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PressableScale from './PressableScale';

export default function OptionGroup({options, value, onChange, theme}) {
  return (
    <View style={styles.row}>
      {options.map(opt => {
        const active = opt.key === value;
        return (
          <PressableScale
            key={opt.key}
            onPress={() => onChange(opt.key)}
            accessibilityLabel={opt.label}
            style={[
              styles.pill,
              {
                backgroundColor: active ? theme.primary : theme.background,
                borderColor: active ? theme.primaryDark : theme.tile2,
              },
            ]}>
            <Text
              style={[
                styles.label,
                {color: active ? '#FFFFFF' : theme.textSoft, fontWeight: active ? '800' : '600'},
              ]}>
              {opt.label}
            </Text>
          </PressableScale>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {flexDirection: 'row', flexWrap: 'wrap', gap: 10},
  pill: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 2,
  },
  label: {fontSize: 16},
});
