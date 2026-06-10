// Safe calculator evaluation. No eval(). Supports + - x /.
// Returns {ok, value, message}.
export function computeExpression(expression) {
  if (!expression) {
    return {ok: true, value: '0'};
  }
  const tokens = tokenize(expression);
  if (!tokens || tokens.length === 0) {
    return {ok: false, message: 'Try another number!'};
  }
  // Expect: number (op number)*
  if (typeof tokens[0] !== 'number') {
    return {ok: false, message: 'Try another number!'};
  }
  let result = tokens[0];
  let i = 1;
  // First pass: handle x and / (left to right) for child-simple precedence.
  const flat = [tokens[0]];
  while (i < tokens.length - 1) {
    const op = tokens[i];
    const next = tokens[i + 1];
    if (typeof op !== 'string' || typeof next !== 'number') {
      return {ok: false, message: 'Try another number!'};
    }
    if (op === '×') {
      flat[flat.length - 1] = flat[flat.length - 1] * next;
    } else if (op === '÷') {
      if (next === 0) {
        return {ok: false, message: 'Try another number!'};
      }
      flat[flat.length - 1] = flat[flat.length - 1] / next;
    } else {
      flat.push(op, next);
    }
    i += 2;
  }
  // Second pass: + and -
  result = flat[0];
  for (let j = 1; j < flat.length - 1; j += 2) {
    const op = flat[j];
    const num = flat[j + 1];
    if (op === '+') {
      result += num;
    } else if (op === '-') {
      result -= num;
    }
  }
  // Round to avoid long floats from division.
  const rounded = Math.round(result * 1000) / 1000;
  return {ok: true, value: String(rounded)};
}

function tokenize(expr) {
  const tokens = [];
  let numberBuffer = '';
  for (const ch of expr) {
    if (ch >= '0' && ch <= '9') {
      numberBuffer += ch;
    } else if (ch === '.') {
      numberBuffer += ch;
    } else if (ch === '+' || ch === '-' || ch === '×' || ch === '÷') {
      if (numberBuffer === '') {
        // leading minus or malformed
        if (ch === '-' && tokens.length === 0) {
          numberBuffer = '-';
          continue;
        }
        return null;
      }
      tokens.push(parseFloat(numberBuffer));
      numberBuffer = '';
      tokens.push(ch);
    } else {
      return null;
    }
  }
  if (numberBuffer !== '' && numberBuffer !== '-') {
    tokens.push(parseFloat(numberBuffer));
  }
  return tokens;
}
