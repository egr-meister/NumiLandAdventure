import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useApp} from '../context/AppContext';
import ScreenHeader from '../components/ScreenHeader';
import QuestionView from '../components/QuestionView';
import BigButton from '../components/BigButton';
import Mascot from '../components/Mascot';
import {SIZES, SHADOW} from '../theme/typography';
import {generateQuestions} from '../utils/questionGenerator';
import {DAILY_CHALLENGE_COUNT} from '../data/constants';
import {rewardForScore} from '../data/messages';

export default function DailyChallengeScreen({navigation}) {
  const {theme, settings, recordAnswer, recordDailyChallenge} = useApp();
  const [questions, setQuestions] = useState(() =>
    generateQuestions(DAILY_CHALLENGE_COUNT, settings.difficulty),
  );
  const [index, setIndex] = useState(0);
  const [answeredThis, setAnsweredThis] = useState(false);
  const [results, setResults] = useState({correct: 0, wrong: 0});
  const [finished, setFinished] = useState(false);

  const total = questions.length;
  const reward = useMemo(
    () => rewardForScore(results.correct, total),
    [results.correct, total],
  );

  const handleAnswered = isCorrect => {
    if (answeredThis) {
      return;
    }
    setAnsweredThis(true);
    recordAnswer(isCorrect);
    setResults(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      wrong: prev.wrong + (isCorrect ? 0 : 1),
    }));
  };

  const next = () => {
    if (index + 1 >= total) {
      // finish
      setFinished(true);
      recordDailyChallenge(results.correct);
      return;
    }
    setIndex(index + 1);
    setAnsweredThis(false);
  };

  const restart = () => {
    setQuestions(generateQuestions(DAILY_CHALLENGE_COUNT, settings.difficulty));
    setIndex(0);
    setAnsweredThis(false);
    setResults({correct: 0, wrong: 0});
    setFinished(false);
  };

  const percent = total > 0 ? Math.round((results.correct / total) * 100) : 0;

  return (
    <SafeAreaView style={[styles.safe, {backgroundColor: theme.background}]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="Daily Challenge"
          emoji="🗓️"
          theme={theme}
          onBack={() => navigation.goBack()}
        />

        {!finished ? (
          <>
            <View style={[styles.progressBar, SHADOW, {backgroundColor: theme.card}]}>
              <Text style={[styles.progressText, {color: theme.text}]}>
                Question {index + 1} of {total}
              </Text>
              <Text style={[styles.progressText, {color: theme.text}]}>
                ⭐ {results.correct}
              </Text>
            </View>

            <QuestionView
              question={questions[index]}
              theme={theme}
              vibration={settings.vibration}
              onAnswered={handleAnswered}
            />

            <BigButton
              label={index + 1 >= total ? 'See Results 🎉' : 'Next →'}
              color={theme.primary}
              onPress={next}
              disabled={!answeredThis}
              style={styles.btn}
            />
            {!answeredThis ? (
              <Text style={[styles.hint, {color: theme.textSoft}]}>
                Pick an answer to continue.
              </Text>
            ) : (
              <Text style={styles.hint}> </Text>
            )}
          </>
        ) : (
          <View style={[styles.resultCard, SHADOW, {backgroundColor: theme.card}]}>
            <Mascot size={64} message="Challenge complete!" />
            <Text style={[styles.bigReward]}>{reward.emoji}</Text>
            <Text style={[styles.rewardLabel, {color: theme.primaryDark}]}>
              You earned a {reward.label}!
            </Text>

            <View style={styles.statsRow}>
              <Stat label="Correct" value={results.correct} color={theme.success} theme={theme} />
              <Stat label="Mistakes" value={results.wrong} color={theme.accent} theme={theme} />
              <Stat label="Success" value={`${percent}%`} color={theme.secondary} theme={theme} />
            </View>

            <BigButton label="Play Again" color={theme.primary} onPress={restart} style={styles.btn} />
            <BigButton
              label="Back Home"
              color={theme.secondary}
              onPress={() => navigation.navigate('Home')}
              style={styles.btn}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({label, value, color, theme}) {
  return (
    <View style={[styles.stat, {backgroundColor: color}]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  content: {padding: SIZES.paddingScreen, paddingBottom: 40},
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: SIZES.radiusSmall,
    padding: 14,
    marginBottom: 16,
  },
  progressText: {fontSize: 18, fontWeight: '800'},
  btn: {marginTop: 16},
  hint: {textAlign: 'center', marginTop: 12, fontSize: 15, minHeight: 20},
  resultCard: {borderRadius: SIZES.radius, padding: 24, alignItems: 'center'},
  bigReward: {fontSize: 72, marginTop: 8},
  rewardLabel: {fontSize: 22, fontWeight: '800', marginBottom: 18, textAlign: 'center'},
  statsRow: {flexDirection: 'row', justifyContent: 'space-between', width: '100%', gap: 10},
  stat: {flex: 1, borderRadius: SIZES.radiusSmall, paddingVertical: 16, alignItems: 'center'},
  statValue: {fontSize: 28, fontWeight: '900', color: '#FFFFFF'},
  statLabel: {fontSize: 14, fontWeight: '700', color: '#FFFFFF', marginTop: 2},
});
