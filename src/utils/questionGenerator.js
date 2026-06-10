// Local question generator. No network needed. Generates child-friendly
// math questions by difficulty, with 3 shuffled answer options.
import {randInt, pickOne, shuffle} from './random';
import {QUESTION_THEMES} from '../data/themes';

let counter = 0;
const recent = []; // stores recent question signatures to avoid repeats

function remember(signature) {
  recent.push(signature);
  if (recent.length > 12) {
    recent.shift();
  }
}

function isRecent(signature) {
  return recent.includes(signature);
}

// Build 3 unique answer options that always include the correct answer.
function buildAnswers(correct) {
  const options = new Set([correct]);
  let guard = 0;
  while (options.size < 3 && guard < 40) {
    guard += 1;
    const delta = pickOne([-3, -2, -1, 1, 2, 3]);
    const candidate = correct + delta;
    if (candidate >= 0) {
      options.add(candidate);
    }
  }
  // Fallback if numbers were too small to create variety.
  let filler = correct + 1;
  while (options.size < 3) {
    options.add(filler);
    filler += 1;
  }
  return shuffle([...options]);
}

function makeQuestion(text, correct, difficulty, theme) {
  counter += 1;
  return {
    id: `q_${String(counter).padStart(4, '0')}`,
    question: text,
    answers: buildAnswers(correct),
    correctAnswer: correct,
    difficulty,
    theme: theme.key,
    emoji: theme.emoji,
  };
}

function easyQuestion() {
  const theme = pickOne(QUESTION_THEMES);
  const a = randInt(1, 10);
  const b = randInt(1, 10);
  if (randInt(0, 1) === 0) {
    const text = `There are ${a} ${theme.noun} and ${b} more appear. How many ${theme.noun} are there?`;
    return makeQuestion(text, a + b, 'easy', theme);
  }
  const big = Math.max(a, b);
  const small = Math.min(a, b);
  const text = `There are ${big} ${theme.noun}. ${small} go away. How many ${theme.noun} are left?`;
  return makeQuestion(text, big - small, 'easy', theme);
}

function mediumQuestion() {
  const theme = pickOne(QUESTION_THEMES);
  const roll = randInt(0, 2);
  if (roll === 0) {
    const a = randInt(5, 20);
    const b = randInt(1, 15);
    const text = `Mia has ${a} ${theme.noun} and gets ${b} more. How many ${theme.noun} now?`;
    return makeQuestion(text, a + b, 'medium', theme);
  }
  if (roll === 1) {
    const a = randInt(8, 20);
    const b = randInt(1, a);
    const text = `There are ${a} ${theme.noun}. ${b} fly away. How many ${theme.noun} are left?`;
    return makeQuestion(text, a - b, 'medium', theme);
  }
  const groups = randInt(2, 4);
  const each = pickOne([2, 3, 4, 5]);
  const text = `There are ${groups} boxes with ${each} ${theme.noun} in each. How many ${theme.noun} are there?`;
  return makeQuestion(text, groups * each, 'medium', theme);
}

function hardQuestion() {
  const theme = pickOne(QUESTION_THEMES);
  const roll = randInt(0, 2);
  if (roll === 0) {
    const friends = pickOne([2, 3, 4, 5]);
    const each = randInt(2, 10);
    const total = friends * each;
    const text = `Liam has ${total} ${theme.noun}. He shares them equally between ${friends} friends. How many ${theme.noun} does each friend get?`;
    return makeQuestion(text, each, 'hard', theme);
  }
  if (roll === 1) {
    const a = randInt(10, 50);
    const b = randInt(5, 25);
    const text = `There are ${a} ${theme.noun}. ${b} more are added. How many ${theme.noun} in total?`;
    return makeQuestion(text, a + b, 'hard', theme);
  }
  const groups = randInt(2, 6);
  const each = randInt(2, 8);
  const text = `${groups} friends each hold ${each} ${theme.noun}. How many ${theme.noun} altogether?`;
  return makeQuestion(text, groups * each, 'hard', theme);
}

export function generateQuestion(difficulty = 'easy') {
  let q;
  let guard = 0;
  do {
    guard += 1;
    if (difficulty === 'hard') {
      q = hardQuestion();
    } else if (difficulty === 'medium') {
      q = mediumQuestion();
    } else {
      q = easyQuestion();
    }
  } while (isRecent(q.question) && guard < 8);
  remember(q.question);
  return q;
}

export function generateQuestions(count, difficulty = 'easy') {
  const list = [];
  for (let i = 0; i < count; i++) {
    list.push(generateQuestion(difficulty));
  }
  return list;
}
