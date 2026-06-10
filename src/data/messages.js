// Friendly feedback messages. Always positive and encouraging for children.
export const POSITIVE = ['Great job!', 'Well done!', 'You got it!', 'Awesome!', 'Super!'];
export const TRY_AGAIN = ['Almost! Try again!', 'So close! Try again!', 'Give it another go!'];

export const REWARDS = [
  {key: 'star', emoji: '⭐', label: 'Gold Star'},
  {key: 'sticker', emoji: '🌈', label: 'Rainbow Sticker'},
  {key: 'medal', emoji: '🏅', label: 'Shiny Medal'},
  {key: 'trophy', emoji: '🏆', label: 'Happy Trophy'},
  {key: 'balloon', emoji: '🎉', label: 'Party Popper'},
];

export function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// Reward is based on score (not random gambling). Higher score => nicer reward.
export function rewardForScore(correct, total) {
  if (total === 0) {
    return REWARDS[0];
  }
  const ratio = correct / total;
  if (ratio >= 1) {
    return REWARDS[3];
  }
  if (ratio >= 0.8) {
    return REWARDS[2];
  }
  if (ratio >= 0.5) {
    return REWARDS[1];
  }
  return REWARDS[0];
}
