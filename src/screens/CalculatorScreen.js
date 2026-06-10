import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useApp} from '../context/AppContext';
import ScreenHeader from '../components/ScreenHeader';
import PressableScale from '../components/PressableScale';
import {SIZES, SHADOW} from '../theme/typography';
import {computeExpression} from '../utils/calculator';

const OPERATORS = ['+', '-', '×', '÷'];
const isOperator = c => OPERATORS.includes(c);

export default function CalculatorScreen({navigation}) {
  const {theme, settings} = useApp();
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');
  const [message, setMessage] = useState('');

  const kidMode = settings.calcMode === 'kid';
  const lastChar = expression.slice(-1);

  const pressDigit = d => {
    setMessage('');
    setExpression(prev => prev + d);
  };

  const pressDot = () => {
    setMessage('');
    const segments = expression.split(/[+\-×÷]/);
    const current = segments[segments.length - 1];
    if (current.includes('.')) {
      return; // only one dot per number
    }
    if (expression === '') {
      setExpression('0.');
    } else if (isOperator(lastChar)) {
      setExpression(prev => prev + '0.');
    } else {
      setExpression(prev => prev + '.');
    }
  };

  const pressOperator = opValue => {
    setMessage('');
    if (expression === '') {
      return; // never start with an operator
    }
    if (isOperator(lastChar)) {
      setExpression(prev => prev.slice(0, -1) + opValue); // replace trailing operator
    } else {
      setExpression(prev => prev + opValue);
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

  const handleKey = item => {
    switch (item.kind) {
      case 'num':
        pressDigit(item.label);
        break;
      case 'dot':
        pressDot();
        break;
      case 'op':
        pressOperator(item.value);
        break;
      case 'equals':
        equals();
        break;
      case 'clear':
        clearAll();
        break;
      case 'del':
        deleteLast();
        break;
      default:
        break;
    }
  };

  // Keypad as a fixed 4-column grid so every key has an equal, readable size.
  const num = n => ({label: n, kind: 'num'});
  const clearKey = {label: 'C', kind: 'clear'};
  const delKey = {label: '⌫', kind: 'del'};
  const dotKey = {label: '.', kind: 'dot'};
  const equalsKey = {label: '=', kind: 'equals'};
  const op = (label, value) => ({label, value, kind: 'op'});
  const blank = {kind: 'blank'};

  const topRow = kidMode
    ? [clearKey, delKey, blank, blank]
    : [clearKey, delKey, op('÷', '÷'), op('×', '×')];

  const rows = [
    topRow,
    [num('7'), num('8'), num('9'), op('-', '-')],
    [num('4'), num('5'), num('6'), op('+', '+')],
    [num('1'), num('2'), num('3'), equalsKey],
    [{...num('0'), flex: 3}, dotKey],
  ];

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
            {kidMode ? 'Kid Mode (+ and -)' : 'Full Mode (+ - × ÷)'}
          </Text>
          <Text
            style={[styles.expression, {color: theme.textSoft}]}
            numberOfLines={1}>
            {expression || ' '}
          </Text>
          <Text
            style={[styles.result, {color: theme.text}]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.4}>
            {result}
          </Text>
          <Text style={[styles.message, {color: theme.primaryDark}]}>
            {message ? `😊 ${message}` : ' '}
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.pad}
          showsVerticalScrollIndicator={false}>
          {rows.map((row, rIdx) => (
            <View key={`row-${rIdx}`} style={styles.row}>
              {row.map((item, cIdx) => (
                <Key
                  key={`key-${rIdx}-${cIdx}`}
                  item={item}
                  theme={theme}
                  onPress={handleKey}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function Key({item, theme, onPress}) {
  if (item.kind === 'blank') {
    return <View style={[styles.keyBlank, {flex: item.flex || 1}]} />;
  }

  let bg = theme.card;
  let color = theme.text;
  if (item.kind === 'op') {
    bg = theme.secondary;
    color = '#FFFFFF';
  } else if (item.kind === 'clear' || item.kind === 'del') {
    bg = theme.accent;
    color = '#FFFFFF';
  } else if (item.kind === 'equals') {
    bg = theme.primary;
    color = '#FFFFFF';
  }

  return (
    <PressableScale
      onPress={() => onPress(item)}
      accessibilityLabel={item.label}
      style={[styles.key, SHADOW, {flex: item.flex || 1, backgroundColor: bg}]}>
      <Text style={[styles.keyText, {color}]}>{item.label}</Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  container: {flex: 1, padding: SIZES.paddingScreen},
  display: {borderRadius: SIZES.radius, padding: 18, marginBottom: 16},
  modeTag: {fontSize: 14, fontWeight: '700'},
  expression: {fontSize: 22, textAlign: 'right', marginTop: 8, minHeight: 28},
  result: {fontSize: 52, fontWeight: '900', textAlign: 'right'},
  message: {fontSize: 16, fontWeight: '700', textAlign: 'right', minHeight: 22},
  pad: {paddingBottom: 20},
  row: {flexDirection: 'row', marginBottom: 12, gap: 12},
  key: {
    flex: 1,
    height: 66,
    borderRadius: SIZES.radiusSmall,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyBlank: {height: 66},
  keyText: {fontSize: 30, fontWeight: '900'},
});
