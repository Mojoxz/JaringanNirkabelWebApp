import { useState, useEffect } from 'react';

export function useProgress() {
  const [completedMaterials, setCompletedMaterials] = useState(() => {
    const saved = localStorage.getItem('wireless_completed_materials');
    return saved ? JSON.parse(saved) : [];
  });

  const [quizScore, setQuizScore] = useState(() => {
    const saved = localStorage.getItem('wireless_quiz_score');
    return saved ? JSON.parse(saved) : null;
  });

  const [lastVisitedChapter, setLastVisitedChapter] = useState(() => {
    const saved = localStorage.getItem('wireless_last_chapter');
    return saved || "01";
  });

  useEffect(() => {
    localStorage.setItem('wireless_completed_materials', JSON.stringify(completedMaterials));
  }, [completedMaterials]);

  useEffect(() => {
    if (quizScore !== null) {
      localStorage.setItem('wireless_quiz_score', JSON.stringify(quizScore));
    }
  }, [quizScore]);

  useEffect(() => {
    localStorage.setItem('wireless_last_chapter', lastVisitedChapter);
  }, [lastVisitedChapter]);

  const markAsComplete = (chapterId) => {
    if (!completedMaterials.includes(chapterId)) {
      setCompletedMaterials([...completedMaterials, chapterId]);
    }
  };

  const isCompleted = (chapterId) => {
    return completedMaterials.includes(chapterId);
  };

  const resetProgress = () => {
    setCompletedMaterials([]);
    setQuizScore(null);
    setLastVisitedChapter("01");
    localStorage.removeItem('wireless_completed_materials');
    localStorage.removeItem('wireless_quiz_score');
    localStorage.removeItem('wireless_last_chapter');
  };

  return {
    completedMaterials,
    markAsComplete,
    isCompleted,
    quizScore,
    setQuizScore,
    lastVisitedChapter,
    setLastVisitedChapter,
    resetProgress
  };
}
