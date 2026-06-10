// Visual themes used by math questions. Each provides an emoji and a plural noun.
export const QUESTION_THEMES = [
  {key: 'fruit', emoji: '🍎', noun: 'fruits', singular: 'fruit'},
  {key: 'toys', emoji: '🧸', noun: 'toys', singular: 'toy'},
  {key: 'stars', emoji: '⭐', noun: 'stars', singular: 'star'},
  {key: 'balloons', emoji: '🎈', noun: 'balloons', singular: 'balloon'},
  {key: 'pencils', emoji: '✏️', noun: 'pencils', singular: 'pencil'},
  {key: 'blocks', emoji: '🧊', noun: 'blocks', singular: 'block'},
  {key: 'candy', emoji: '🍬', noun: 'candies', singular: 'candy'},
  {key: 'robots', emoji: '🤖', noun: 'robots', singular: 'robot'},
  {key: 'dinos', emoji: '🦕', noun: 'dinosaurs', singular: 'dinosaur'},
];

export function themeByKey(key) {
  return QUESTION_THEMES.find(t => t.key === key) || QUESTION_THEMES[0];
}
