import React from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useApp} from '../context/AppContext';
import ScreenHeader from '../components/ScreenHeader';
import BigButton from '../components/BigButton';
import {SIZES, SHADOW} from '../theme/typography';
import {DIFFICULTIES} from '../data/constants';

export default function ProgressScreen({navigation}) {
  const {theme, progress, settings, resetProgress} = useApp();

  const percent =
    progress.totalAnswered > 0
      ? Math.round((progress.correct / progress.totalAnswered) * 100)
      : 0;

  const difficultyLabel =
    DIFFICULTIES.find(d => d.key === settings.difficulty)?.label || 'Easy';

  const confirmReset = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset your progress?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Reset', style: 'destructive', onPress: () => resetProgress()},
      ],
      {cancelable: true},
    );
  };

  const rows = [
    {label: 'Problems solved', value: progress.totalAnswered, emoji: '🧮'},
    {label: 'Correct answers', value: progress.correct, emoji: '✅'},
    {label: 'Wrong answers', value: progress.wrong, emoji: '🔁'},
    {label: 'Success rate', value: `${percent}%`, emoji: '🎯'},
    {label: 'Current level', value: difficultyLabel, emoji: '🏞️'},
    {label: 'Daily Challenges done', value: progress.dailyChallengesCompleted, emoji: '🗓️'},
    {label: 'Best daily score', value: `${progress.bestDailyScore}/5`, emoji: '🏅'},
  ];

  return (
    <SafeAreaView style={[styles.safe, {backgroundColor: theme.background}]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="Progress"
          emoji="📈"
          theme={theme}
          onBack={() => navigation.goBack()}
        />

        <View style={[styles.bigCard, SHADOW, {backgroundColor: theme.primary}]}>
          <Text style={styles.bigPercent}>{percent}%</Text>
          <Text style={styles.bigCaption}>Overall success rate</Text>
        </View>

        <View style={[styles.list, SHADOW, {backgroundColor: theme.card}]}>
          {rows.map((r, i) => (
            <View
              key={r.label}
              style={[
                styles.row,
                i < rows.length - 1 ? {borderBottomColor: theme.background, borderBottomWidth: 2} : null,
              ]}>
              <Text style={[styles.rowLabel, {color: theme.text}]}>
                {r.emoji} {r.label}
              </Text>
              <Text style={[styles.rowValue, {color: theme.primaryDark}]}>{r.value}</Text>
            </View>
          ))}
        </View>

        <BigButton
          label="Reset Progress"
          color={theme.accent}
          onPress={confirmReset}
          style={styles.reset}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  content: {padding: SIZES.paddingScreen, paddingBottom: 40},
  bigCard: {borderRadius: SIZES.radius, padding: 24, alignItems: 'center', marginBottom: 16},
  bigPercent: {fontSize: 60, fontWeight: '900', color: '#FFFFFF'},
  bigCaption: {fontSize: 16, fontWeight: '700', color: '#FFFFFF'},
  list: {borderRadius: SIZES.radius, paddingHorizontal: 18},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  rowLabel: {fontSize: 17, fontWeight: '600', flex: 1},
  rowValue: {fontSize: 19, fontWeight: '900', marginLeft: 12},
  reset: {marginTop: 22},
});
