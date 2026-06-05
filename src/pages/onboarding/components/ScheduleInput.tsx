import DayChip from '@/shared/ui/Tag/DayChip';
import TimeRangePicker from '@/shared/ui/TimeRangePicker/TimeRangePicker';
import Button from '@/shared/ui/Button/Button';
import Input from '@/shared/ui/Input/Input';
import { DAYS, type DayId } from '@/shared/constants/subjects';

interface ScheduleInputProps {
  scheduleName: string;
  selectedDays: DayId[];
  startTime: string;
  endTime: string;
  onNameChange: (value: string) => void;
  onToggleDay: (day: DayId) => void;
  onStartChange: (time: string) => void;
  onEndChange: (time: string) => void;
  onAdd: () => void;
}

const ScheduleInput = ({
  scheduleName,
  selectedDays,
  startTime,
  endTime,
  onNameChange,
  onToggleDay,
  onStartChange,
  onEndChange,
  onAdd,
}: ScheduleInputProps) => {
  const isValid = selectedDays.length > 0 && scheduleName.trim() !== '';

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-body font-sans font-bold text-text">공부 일정</h2>
      <div className="flex justify-between">
        {DAYS.map(({ id, label }) => (
          <DayChip
            key={id}
            label={label}
            isSelected={selectedDays.includes(id)}
            onClick={() => onToggleDay(id)}
          />
        ))}
      </div>
      <Input
        placeholder="일정 이름을 입력하세요"
        value={scheduleName}
        onChange={(e) => onNameChange(e.target.value)}
      />
      <TimeRangePicker
        startTime={startTime}
        endTime={endTime}
        onStartChange={onStartChange}
        onEndChange={onEndChange}
      />
      <Button
        label="+ 일정 추가"
        onClick={onAdd}
        isActive={isValid}
      />
    </section>
  );
};

export default ScheduleInput;
