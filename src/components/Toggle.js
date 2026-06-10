import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';

export default function Toggle({label, value, onValueChange, theme}) {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, {color: theme.text}]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{false: theme.tile2, true: theme.primary}}
        thumbColor={'#FFFFFF'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  label: {fontSize: 18, fontWeight: '700'},
});
