import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useApp} from '../context/AppContext';
import ScreenHeader from '../components/ScreenHeader';
import QuestionView from '../components/QuestionView';
import BigButton from '../components/BigButton';
import {SIZES, SHADOW} from '../theme/typography';
import {generateQuestion} from '../utils/questionGenerator';
import {DIFFICULTIES} from '../data/constants';

export default function MathGamesScreen({navigation}) {
  const {theme, settings, recordAnswer} = useApp();
  const [question, setQuestion] = useState(null);
  const [solved, setSolved] = useState(false);
  const [score, setScore] = useState({correct: 0, total: 0});

  const difficultyLabel =
    DIFFICULTIES.find(d => d.key === settings.difficulty)?.label || 'Easy';

  const nextQuestion = () => {
    setQuestion(generateQuestion(settings.difficulty));
    setSolved(false);
  };

  useEffect(() => {
    nextQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.difficulty]);

  const handleAnswered = isCorrect => {
    if (solved) {
      return; // count only the first attempt per question
    }
    recordAnswer(isCorrect);
    setScore(prev => ({correct: prev.correct + (isCorrect ? 1 : 0), total: prev.total + 1}));
    if (isCorrect) {
      setSolved(true);
    }
  };

  return (
    <SafeAreaView style={[styles.safe, {backgroundColor: theme.background}]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="Math Games"
          emoji="🎮"
          theme={theme}
          onBack={() => navigation.goBack()}
        />

        <View style={[styles.scoreBar, SHADOW, {backgroundColor: theme.card}]}>
          <Text style={[styles.scoreText, {color: theme.text}]}>
            Level: {difficultyLabel}
          </Text>
          <Text style={[styles.scoreText, {color: theme.text}]}>
            ⭐ {score.correct}/{score.total}
          </Text>
        </View>

        {question ? (
          <QuestionView
            question={question}
            theme={theme}
            vibration={settings.vibration}
            onAnswered={handleAnswered}
          />
        ) : null}

        <BigButton
          label={solved ? 'Next Question →' : 'Skip / New Question'}
          color={theme.primary}
          onPress={nextQuestion}
          style={styles.nextBtn}
        />
        <Text style={[styles.hint, {color: theme.textSoft}]}>
          Change the level any time in Settings.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  content: {padding: SIZES.paddingScreen, paddingBottom: 40},
  scoreBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: SIZES.radiusSmall,
    padding: 14,
    marginBottom: 16,
  },
  scoreText: {fontSize: 18, fontWeight: '800'},
  nextBtn: {marginTop: 20},
  hint: {textAlign: 'center', marginTop: 14, fontSize: 15},
});
