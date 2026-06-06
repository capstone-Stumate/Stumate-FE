import { AI_LEARNING_TYPES } from '@/shared/constants/ai-learning-types';
import { LOCATIONS } from '@/shared/constants/locations';
import type { PlannerData } from '@/shared/types/ai';

const MOCK_PLANNER_DATA: PlannerData = {
  learningTypeId: 'night-owl',
  focusPeakStart: 22,
  focusPeakEnd: 24,
  focusTimeData: [
    { hour: 6, focusScore: 4.2 },
    { hour: 9, focusScore: 6.1 },
    { hour: 12, focusScore: 7.9 },
    { hour: 15, focusScore: 6.5 },
    { hour: 18, focusScore: 7.2 },
    { hour: 21, focusScore: 8.4 },
    { hour: 24, focusScore: 9.2 },
  ],
  pomodoroData: {
    avgFocusMinutes: 28,
    avgPauseCount: 1.8,
    recommendFocusMinutes: 28,
    recommendBreakMinutes: 7,
  },
  studyStats: {
    todayStudyTime: '3h 45m',
    totalStudyTime: '25:04:53',
    completionRate: 80,
    recommendCycleMinutes: 28,
  },
  locationEfficiencies: LOCATIONS.map((loc, i) => ({
    locationId: loc.id,
    label: loc.shortLabel,
    score: [8.5, 6.2, 7.8, 9.1, 7.0, 4.3][i] ?? 0,
  })),
  subjectFocuses: [
    { subject: '수학', shortLabel: '수', score: 9 },
    { subject: '국어', shortLabel: '국', score: 5 },
    { subject: '물리', shortLabel: '물', score: 3 },
    { subject: '영어', shortLabel: '영', score: 7 },
    { subject: '화학', shortLabel: '화', score: 2 },
  ],
};

const usePlanner = () => {
  const data = MOCK_PLANNER_DATA;

  const learningType = AI_LEARNING_TYPES.find((t) => t.id === data.learningTypeId);

  const focusPeakLabel = `${data.focusPeakStart}~${data.focusPeakEnd}시`;

  const focusChartData = data.focusTimeData.map((d) => ({
    label: `${d.hour}시`,
    hour: d.hour,
    focusScore: d.focusScore,
  }));

  const locationChartData = data.locationEfficiencies.map((l) => ({
    label: l.label,
    value: l.score,
  }));

  const subjectChartData = data.subjectFocuses.map((s) => ({
    label: s.shortLabel,
    value: s.score,
  }));

  return {
    learningType,
    focusPeakLabel,
    focusChartData,
    pomodoroData: data.pomodoroData,
    studyStats: data.studyStats,
    locationChartData,
    subjectChartData,
  };
};

export default usePlanner;
