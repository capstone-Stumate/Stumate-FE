import type { PomodoroData } from '@/shared/types/ai';

interface PomodoroAnalysisProps {
  data: PomodoroData;
}

const PomodoroAnalysis = ({ data }: PomodoroAnalysisProps) => {
  return (
    <section>
      <h2 className="mb-3 font-sans text-body font-semibold text-text">포모도로 분석</h2>
      <div className="flex gap-3">
        <div className="flex flex-1 flex-col items-center gap-1 rounded-xl bg-primary-light px-4 py-3">
          <span className="font-sans text-xs text-text-gray">평균 집중 유지</span>
          <span className="font-sans text-2xl font-bold text-text">{data.avgFocusMinutes}분</span>
        </div>
        <div className="flex flex-1 flex-col items-center gap-1 rounded-xl bg-primary-light px-4 py-3">
          <span className="font-sans text-xs text-text-gray">평균 일시정지</span>
          <span className="font-sans text-2xl font-bold text-text">{data.avgPauseCount}회</span>
        </div>
      </div>
      <div className="mt-3 rounded-xl bg-primary px-4 py-3">
        <p className="font-sans text-xs font-semibold text-text">맞춤 추천 사이클</p>
        <p className="mt-0.5 font-sans text-sm text-text">
          집중 {data.recommendFocusMinutes}분 → 휴식 {data.recommendBreakMinutes}분 반복
        </p>
      </div>
    </section>
  );
};

export default PomodoroAnalysis;
