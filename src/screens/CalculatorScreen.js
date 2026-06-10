import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useApp} from '../context/AppContext';
import ScreenHeader from '../components/ScreenHeader';
import PressableScale from '../components/PressableScale';
import {SIZES, SHADOW} from '../theme/typography';
import {computeExpression} from '../utils/calculator';

export default function CalculatorScreen({navigation}) {
  const {theme, settings} = useApp();
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');
  const [message, setMessage] = useState('');

  const kidMode = settings.calcMode === 'kid';

  const operators = kidMode ? ['+', '-'] : ['+', '-', '×', '÷'];

  const lastChar = expression.slice(-1);
  const isOperator = c => ['+', '-', '×', '÷'].includes(c);

  const pressDigit = d => {
    setMessage('');
    setExpression(prev => prev + d);
  };

  const pressOperator = op => {
    setMessage('');
    if (expression === '') {
      return; // do not start with an operator
    }
    if (isOperator(lastChar)) {
      // replace the trailing operator instead of stacking
      setExpression(prev => prev.slice(0, -1) + op);
    } else {
      setExpression(prev => prev + op);
    }
  };

  const clearAll = () => {
    setExpression('');
    setResult('0');
    setMessage('');
  };

  const deleteLast = () => {
    setMessage('');
    setExpression(prev => prev.slice(0, -1));
  };

  const equals = () => {
    if (expression === '' || isOperator(lastChar)) {
      setMessage('Try another number!');
      return;
    }
    const r = computeExpression(expression);
    if (r.ok) {
      setResult(r.value);
      setMessage('');
    } else {
      setMessage(r.message);
    }
  };

  const digits = useMemo(
    () => ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'],
    [],
  );

  return (
    <SafeAreaView style={[styles.safe, {backgroundColor: theme.background}]}>
      <View style={styles.container}>
        <ScreenHeader
          title="Calculator"
          emoji="🔢"
          theme={theme}
          onBack={() => navigation.goBack()}
        />

        <View style={[styles.display, SHADOW, {backgroundColor: theme.card}]}>
          <Text style={[styles.modeTag, {color: theme.textSoft}]}>
            {kidMode ? 'Kid Mode (+ and -)' : 'Full Mode'}
          </Text>
          <Text style={[styles.expression, {color: theme.textSoft}]} numberOfLines={1}>
            {expression || ' '}
          </Text>
          <Text style={[styles.result, {color: theme.text}]} numberOfLines={1}>
            {result}
          </Text>
          {message ? (
            <Text style={[styles.message, {color: theme.primaryDark}]}>😊 {message}</Text>
          ) : (
            <Text style={styles.message}> </Text>
          )}
        </View>

        <ScrollView contentContainerStyle={styles.pad} showsVerticalScrollIndicator={false}>
          <View style={styles.topRow}>
            <CalcKey label="C" onPress={clearAll} color={theme.accent} textColor="#FFFFFF" theme={theme} />
            <CalcKey label="⌫" onPress={deleteLast} color={theme.accent} textColor="#FFFFFF" theme={theme} />
            <View style={styles.opColumn}>
              {operators.map(op => (
                <CalcKey
                  key={op}
                  label={op}
                  onPress={() => pressOperator(op)}
                  color={theme.secondary}
                  textColor="#FFFFFF"
                  theme={theme}
                  small={!kidMode}
                />
              ))}
            </View>
          </View>

          <View style={styles.digitGrid}>
            {digits.map(d => (
              <CalcKey
                key={d}
                label={d}
                onPress={() => pressDigit(d)}
                color={theme.card}
                textColor={theme.text}
                theme={theme}
                wide={d === '0'}
              />
            ))}
            <CalcKey label="=" onPress={equals} color={theme.primary} textColor="#FFFFFF" theme={theme} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function CalcKey({label, onPress, color, textColor, theme, wide, small}) {
  return (
    <PressableScale
      onPress={onPress}
      accessibilityLabel={label}
      style={[
        styles.key,
        SHADOW,
        wide ? styles.keyWide : null,
        {backgroundColor: color},
      ]}>
      <Text style={[styles.keyText, small ? styles.keyTextSmall : null, {color: textColor}]}>
        {label}
      </Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  container: {flex: 1, padding: SIZES.paddingScreen},
  display: {borderRadius: SIZES.radius, padding: 18, marginBottom: 16},
  modeTag: {fontSize: 14, fontWeight: '700'},
  expression: {fontSize: 22, textAlign: 'right', marginTop: 8, minHeight: 28},
  result: {fontSize: SIZES.huge, fontWeight: '900', textAlign: 'right'},
  message: {fontSize: 16, fontWeight: '700', textAlign: 'right', minHeight: 22},
  pad: {paddingBottom: 20},
  topRow: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, gap: 12},
  opColumn: {flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'flex-end'},
  digitGrid: {flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between'},
  key: {
    width: '30%',
    aspectRatio: 1.3,
    borderRadius: SIZES.radiusSmall,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyWide: {width: '63%'},
  keyText: {fontSize: 34, fontWeight: '900'},
  keyTextSmall: {fontSize: 26},
});
