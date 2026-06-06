export interface FocusTimeData {
  hour: number; // 6, 9, 12, 15, 18, 21, 24
  focusScore: number; // 0~10
}

export interface PomodoroData {
  avgFocusMinutes: number;
  avgPauseCount: number;
  recommendFocusMinutes: number;
  recommendBreakMinutes: number;
}

export interface StudyStats {
  todayStudyTime: string; // e.g. "3h 45m"
  totalStudyTime: string; // e.g. "25:04:53"
  completionRate: number; // 0~100
  recommendCycleMinutes: number;
}

export interface LocationEfficiency {
  locationId: string;
  label: string;
  score: number;
}

export interface SubjectFocus {
  subject: string;
  shortLabel: string;
  score: number;
}

export interface PlannerData {
  learningTypeId: string;
  focusPeakStart: number;
  focusPeakEnd: number;
  focusTimeData: FocusTimeData[];
  pomodoroData: PomodoroData;
  studyStats: StudyStats;
  locationEfficiencies: LocationEfficiency[];
  subjectFocuses: SubjectFocus[];
}
