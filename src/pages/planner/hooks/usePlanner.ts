import { AI_LEARNING_TYPES } from '@/shared/constants/ai-learning-types';
import { LOCATIONS } from '@/shared/constants/locations';
import type { PlannerInfo } from '@/shared/api/generated/stumateAPI.schemas';
import { useGetPlanner } from '@/shared/api/generated/planner-controller/planner-controller';
import useAuthStore from '@/shared/store/authStore';

const formatStudyTime = (seconds?: number): string => {
  if (!seconds) return '0분';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}분`;
};

const formatTotalStudyTime = (seconds?: number): string => {
  if (!seconds) return '00:00:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const getShortLabel = (name?: string): string => {
  if (!name) return '';
  return name.length > 2 ? name.slice(0, 2) : name;
};

const usePlanner = () => {
  const user = useAuthStore((state) => state.user);

  const { data: plannerData } = useGetPlanner(user?.userId ?? 0, {
    query: { enabled: !!user?.userId },
  });

  const planner = plannerData as unknown as PlannerInfo | undefined;

  const learningType = AI_LEARNING_TYPES.find((t) => t.id === planner?.learningTypeId);
  const mergedLearningType = planner
    ? {
        ...(learningType ?? { id: 'analyzing', emoji: '🔍', name: '분석 중' }),
        description: planner.studyTypeDescription ?? learningType?.description ?? '',
      }
    : undefined;

  const focusPeakLabel = planner
    ? `${planner.focusPeakStart}~${planner.focusPeakEnd}시`
    : '';

  const focusChartData = (planner?.focusTimeData ?? []).map((d) => ({
    label: `${d.hour}시`,
    hour: d.hour ?? 0,
    focusScore: d.focusScore ?? 0,
  }));

  const locationChartData = (planner?.locationEfficiencies ?? []).map((l) => {
    const location = LOCATIONS.find((loc) => loc.id === l.locationId);
    return {
      label: location?.shortLabel ?? l.locationId ?? '',
      value: l.score ?? 0,
    };
  });
  // Mock 데이터 (API 응답 없을 때 참고용)
  // const locationChartData = LOCATIONS.map((loc, i) => ({
  //   label: loc.shortLabel,
  //   value: [8.5, 6.2, 7.8, 9.1, 7.0, 4.3][i] ?? 0,
  // }));

  const subjectChartData = (planner?.subjectFocuses ?? []).map((s) => ({
    label: getShortLabel(s.subjectName),
    value: s.score ?? 0,
  }));
  // Mock 데이터 (API 응답 없을 때 참고용)
  // const subjectChartData = [
  //   { label: '수', value: 9 },
  //   { label: '국', value: 5 },
  //   { label: '물', value: 3 },
  //   { label: '영', value: 7 },
  //   { label: '화', value: 2 },
  // ];

  const pomodoroData = {
    avgFocusMinutes: planner?.pomodoroData?.avgFocusMinutes ?? 0,
    avgPauseCount: planner?.pomodoroData?.avgPauseCount ?? 0,
    recommendFocusMinutes: planner?.pomodoroData?.recommendFocusMinutes ?? 0,
    recommendBreakMinutes: planner?.pomodoroData?.recommendBreakMinutes ?? 0,
  };

  const studyStats = {
    todayStudyTime: formatStudyTime(planner?.studyStats?.todayStudyTime),
    totalStudyTime: formatTotalStudyTime(planner?.studyStats?.totalStudyTime),
    completionRate: planner?.studyStats?.completionRate ?? 0,
    recommendCycleMinutes: planner?.pomodoroData?.recommendFocusMinutes ?? 0,
  };

  return {
    learningType: mergedLearningType,
    focusPeakLabel,
    focusChartData,
    pomodoroData,
    studyStats,
    locationChartData,
    subjectChartData,
    aiPlanner: planner?.aiPlanner ?? '',
  };
};

export default usePlanner;
