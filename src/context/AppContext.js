// Central app state: settings + progress, persisted to local storage.
import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {
  loadSettings,
  saveSettings,
  loadProgress,
  saveProgress,
  clearProgress,
  DEFAULT_SETTINGS,
  DEFAULT_PROGRESS,
} from '../storage/storage';
import {getTheme} from '../theme/themes';
import {todayKey} from '../utils/date';

const AppContext = createContext(null);

export function AppProvider({children}) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const [s, p] = await Promise.all([loadSettings(), loadProgress()]);
      setSettings(s);
      setProgress(p);
      setReady(true);
    })();
  }, []);

  const updateSetting = (key, value) => {
    setSettings(prev => {
      const next = {...prev, [key]: value};
      saveSettings(next);
      return next;
    });
  };

  // Record a single answered question into lifetime progress.
  const recordAnswer = isCorrect => {
    setProgress(prev => {
      const next = {
        ...prev,
        totalAnswered: prev.totalAnswered + 1,
        correct: prev.correct + (isCorrect ? 1 : 0),
        wrong: prev.wrong + (isCorrect ? 0 : 1),
      };
      saveProgress(next);
      return next;
    });
  };

  // Record a finished daily challenge.
  const recordDailyChallenge = correctCount => {
    setProgress(prev => {
      const next = {
        ...prev,
        dailyChallengesCompleted: prev.dailyChallengesCompleted + 1,
        bestDailyScore: Math.max(prev.bestDailyScore, correctCount),
        lastDailyDate: todayKey(),
      };
      saveProgress(next);
      return next;
    });
  };

  const resetProgress = async () => {
    const fresh = await clearProgress();
    setProgress(fresh);
  };

  const theme = useMemo(() => getTheme(settings.theme), [settings.theme]);

  const value = useMemo(
    () => ({
      ready,
      settings,
      progress,
      theme,
      updateSetting,
      recordAnswer,
      recordDailyChallenge,
      resetProgress,
    }),
    [ready, settings, progress, theme],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return ctx;
}
