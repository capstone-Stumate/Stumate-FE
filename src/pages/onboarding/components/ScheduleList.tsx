import { DAYS } from '@/shared/constants/subjects';

interface Schedule {
  id: string;
  name: string;
  days: string[];
  startTime: string;
  endTime: string;
}

interface ScheduleListProps {
  schedules: Schedule[];
  onDelete: (id: string) => void;
}

const ScheduleList = ({ schedules, onDelete }: ScheduleListProps) => {
  if (schedules.length === 0) return null;

  return (
    <div className="flex max-h-40 scrollbar-none flex-col gap-2 overflow-y-auto">
      {schedules.map(({ id, name, days, startTime, endTime }) => {
        const dayLabels = days
          .map((d) => DAYS.find((day) => day.id === d)?.label)
          .join(', ');
        return (
          <div
            key={id}
            className="bg-bg flex items-center justify-between rounded-lg px-3 py-2"
          >
            <span className="text-body text-text font-sans">
              {name} · {dayLabels} · {startTime} ~ {endTime}
            </span>
            <button
              type="button"
              onClick={() => onDelete(id)}
              className="text-body text-text-gray"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleList;
