// Local persistence using AsyncStorage. All data stays on device.
import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEY = '@numiland/settings';
const PROGRESS_KEY = '@numiland/progress';

export const DEFAULT_SETTINGS = {
  difficulty: 'easy',
  calcMode: 'full',
  sound: true,
  vibration: true,
  theme: 'sunny',
  language: 'en',
};

export const DEFAULT_PROGRESS = {
  totalAnswered: 0,
  correct: 0,
  wrong: 0,
  dailyChallengesCompleted: 0,
  bestDailyScore: 0,
  lastDailyDate: null,
};

export async function loadSettings() {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      return {...DEFAULT_SETTINGS};
    }
    return {...DEFAULT_SETTINGS, ...JSON.parse(raw)};
  } catch (e) {
    return {...DEFAULT_SETTINGS};
  }
}

export async function saveSettings(settings) {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    // ignore write errors silently; app keeps working in memory
  }
}

export async function loadProgress() {
  try {
    const raw = await AsyncStorage.getItem(PROGRESS_KEY);
    if (!raw) {
      return {...DEFAULT_PROGRESS};
    }
    return {...DEFAULT_PROGRESS, ...JSON.parse(raw)};
  } catch (e) {
    return {...DEFAULT_PROGRESS};
  }
}

export async function saveProgress(progress) {
  try {
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    // ignore
  }
}

export async function clearProgress() {
  try {
    await AsyncStorage.removeItem(PROGRESS_KEY);
  } catch (e) {
    // ignore
  }
  return {...DEFAULT_PROGRESS};
}
