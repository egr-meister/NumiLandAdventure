// Reusable quiz question card with answer buttons and friendly feedback.
import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, View, Vibration} from 'react-native';
import PressableScale from './PressableScale';
import {SIZES, SHADOW} from '../theme/typography';
import {POSITIVE, TRY_AGAIN, pick} from '../data/messages';

export default function QuestionView({question, theme, vibration, onAnswered}) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null); // {correct, message}
  const pop = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setSelected(null);
    setFeedback(null);
  }, [question]);

  const handlePress = answer => {
    if (feedback && feedback.correct) {
      return; // already solved, lock further taps
    }
    const correct = answer === question.correctAnswer;
    setSelected(answer);
    setFeedback({correct, message: correct ? pick(POSITIVE) : pick(TRY_AGAIN)});
    if (vibration) {
      Vibration.vibrate(correct ? 40 : [0, 30, 40, 30]);
    }
    if (correct) {
      pop.setValue(0);
      Animated.spring(pop, {toValue: 1, useNativeDriver: true, bounciness: 14}).start();
    }
    // Notify parent each time an answer is tapped.
    onAnswered(correct, answer);
  };


  return (
    <View style={[styles.card, SHADOW, {backgroundColor: theme.card}]}>
      <View style={styles.emojiBanner}>
        <Text style={styles.bannerEmoji}>
          {question.emoji}
          {question.emoji}
          {question.emoji}
        </Text>
      </View>

      <Text style={[styles.question, {color: theme.text}]}>{question.question}</Text>

      <View style={styles.answers}>
        {question.answers.map(answer => {
          const isPicked = selected === answer;
          const isCorrect = answer === question.correctAnswer;
          let bg = theme.tile2;
          if (feedback) {
            if (isCorrect && (isPicked || feedback.correct)) {
              bg = theme.success;
            } else if (isPicked && !feedback.correct) {
              bg = theme.error;
            }
          }
          return (
            <PressableScale
              key={answer}
              onPress={() => handlePress(answer)}
              accessibilityLabel={`Answer ${answer}`}
              style={[styles.answer, SHADOW, {backgroundColor: bg}]}>
              <Text style={[styles.answerText, {color: theme.text}]}>{answer}</Text>
            </PressableScale>
          );
        })}
      </View>

      {feedback ? (
        <Animated.View
          style={[
            styles.feedback,
            feedback.correct
              ? {transform: [{scale: pop.interpolate({inputRange: [0, 1], outputRange: [0.8, 1]})}]}
              : null,
          ]}>
          <Text
            style={[
              styles.feedbackText,
              {color: feedback.correct ? theme.success : theme.primaryDark},
            ]}>
            {feedback.correct ? `🎉 ${feedback.message}` : `🙂 ${feedback.message}`}
          </Text>
        </Animated.View>
      ) : (
        <View style={styles.feedback} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {borderRadius: SIZES.radius, padding: 20},
  emojiBanner: {alignItems: 'center', marginBottom: 8},
  bannerEmoji: {fontSize: 40, letterSpacing: 4},
  question: {fontSize: SIZES.body + 4, fontWeight: '700', textAlign: 'center', marginBottom: 18},
  answers: {flexDirection: 'row', justifyContent: 'space-between', gap: 12},
  answer: {
    flex: 1,
    height: 78,
    borderRadius: SIZES.radiusSmall,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerText: {fontSize: SIZES.big, fontWeight: '800'},
  feedback: {minHeight: 40, alignItems: 'center', justifyContent: 'center', marginTop: 14},
  feedbackText: {fontSize: 22, fontWeight: '800'},
});
