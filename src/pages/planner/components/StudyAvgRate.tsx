import type { StudyStats } from '@/shared/types/ai';

interface StudyAvgRateProps {
  stats: StudyStats;
}

interface StatItemProps {
  label: string;
  value: string;
}

const StatItem = ({ label, value }: StatItemProps) => (
  <div className="flex flex-1 flex-col items-center gap-1 rounded-xl bg-white px-2 py-3">
    <span className="text-center font-sans text-[10px] text-text-gray">{label}</span>
    <span className="font-sans text-sm font-bold text-text">{value}</span>
  </div>
);

const StudyAvgRate = ({ stats }: StudyAvgRateProps) => {
  return (
    <div className="flex gap-2">
      <StatItem label="오늘 공부" value={stats.todayStudyTime} />
      <StatItem label="총 공부시간" value={stats.totalStudyTime} />
      <StatItem label="수행률" value={`${stats.completionRate}%`} />
      <StatItem label="추천 사이클" value={`${stats.recommendCycleMinutes}분`} />
    </div>
  );
};

export default StudyAvgRate;
