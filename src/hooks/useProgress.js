import { useState, useEffect, useCallback } from 'react';

const STORAGE_EVENT = 'wireless-progress-sync';

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    if (Array.isArray(fallback) && !Array.isArray(parsed)) {
      return fallback;
    }
    return parsed;
  } catch {
    return fallback;
  }
}

export function useProgress() {
  const [completedMaterials, setCompletedMaterials] = useState(() =>
    readStorage('wireless_completed_materials', [])
  );

  const [quizScore, setQuizScoreState] = useState(() =>
    readStorage('wireless_quiz_score', null)
  );

  const [quizHistory, setQuizHistory] = useState(() =>
    readStorage('wireless_quiz_history', [])
  );

  const [lastVisitedChapter, setLastVisitedChapterState] = useState(() =>
    localStorage.getItem('wireless_last_chapter') || '01'
  );

  const [bookmarkedChapters, setBookmarkedChapters] = useState(() =>
    readStorage('wireless_bookmarks', [])
  );

  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem('wireless_theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('wireless_theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleSync = () => {
      setCompletedMaterials(readStorage('wireless_completed_materials', []));
      setQuizScoreState(readStorage('wireless_quiz_score', null));
      setQuizHistory(readStorage('wireless_quiz_history', []));
      setLastVisitedChapterState(localStorage.getItem('wireless_last_chapter') || '01');
      setBookmarkedChapters(readStorage('wireless_bookmarks', []));
      const savedTheme = localStorage.getItem('wireless_theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setThemeState(savedTheme);
      }
    };
    window.addEventListener(STORAGE_EVENT, handleSync);
    return () => window.removeEventListener(STORAGE_EVENT, handleSync);
  }, []);

  const broadcast = useCallback(() => {
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }, []);

  const markAsComplete = useCallback((chapterId) => {
    setCompletedMaterials((prev) => {
      if (prev.includes(chapterId)) return prev;
      const next = [...prev, chapterId];
      localStorage.setItem('wireless_completed_materials', JSON.stringify(next));
      setTimeout(broadcast, 0);
      return next;
    });
  }, [broadcast]);

  const isCompleted = useCallback(
    (chapterId) => completedMaterials.includes(chapterId),
    [completedMaterials]
  );

  const toggleBookmark = useCallback((chapterId) => {
    setBookmarkedChapters((prev) => {
      const next = prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId];
      localStorage.setItem('wireless_bookmarks', JSON.stringify(next));
      setTimeout(broadcast, 0);
      return next;
    });
  }, [broadcast]);

  const isBookmarked = useCallback(
    (chapterId) => bookmarkedChapters.includes(chapterId),
    [bookmarkedChapters]
  );

  const recordQuizAttempt = useCallback((attempt) => {
    if (!attempt) return;
    setQuizHistory((prev) => {
      const entry = {
        score: attempt.score,
        correct: attempt.correct,
        total: attempt.total,
        mode: attempt.mode || 'Latihan',
        topic: attempt.topic || 'Semua Topik',
        date: new Date().toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      const next = [entry, ...prev].slice(0, 8);
      localStorage.setItem('wireless_quiz_history', JSON.stringify(next));
      setTimeout(broadcast, 0);
      return next;
    });
  }, [broadcast]);

  const setQuizScore = useCallback((score, meta = null) => {
    setQuizScoreState(score);
    if (score === null) {
      localStorage.removeItem('wireless_quiz_score');
    } else {
      localStorage.setItem('wireless_quiz_score', JSON.stringify(score));
      if (meta) {
        recordQuizAttempt({ score, ...meta });
      }
    }
    setTimeout(broadcast, 0);
  }, [broadcast, recordQuizAttempt]);

  const setLastVisitedChapter = useCallback((chapterId) => {
    setLastVisitedChapterState(chapterId);
    localStorage.setItem('wireless_last_chapter', chapterId);
    setTimeout(broadcast, 0);
  }, [broadcast]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('wireless_theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      setTimeout(broadcast, 0);
      return next;
    });
  }, [broadcast]);

  const resetProgress = useCallback(() => {
    setCompletedMaterials([]);
    setQuizScoreState(null);
    setQuizHistory([]);
    setLastVisitedChapterState('01');
    setBookmarkedChapters([]);
    localStorage.removeItem('wireless_completed_materials');
    localStorage.removeItem('wireless_quiz_score');
    localStorage.removeItem('wireless_quiz_history');
    localStorage.removeItem('wireless_last_chapter');
    localStorage.removeItem('wireless_bookmarks');
    setTimeout(broadcast, 0);
  }, [broadcast]);

  return {
    completedMaterials,
    markAsComplete,
    isCompleted,
    bookmarkedChapters,
    toggleBookmark,
    isBookmarked,
    quizScore,
    quizHistory,
    setQuizScore,
    recordQuizAttempt,
    lastVisitedChapter,
    setLastVisitedChapter,
    theme,
    toggleTheme,
    resetProgress,
  };
}
