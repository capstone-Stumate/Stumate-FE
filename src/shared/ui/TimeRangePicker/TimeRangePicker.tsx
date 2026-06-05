interface TimeRangePickerProps {
  startTime: string;
  endTime: string;
  onStartChange: (time: string) => void;
  onEndChange: (time: string) => void;
}

const TimeRangePicker = ({
  startTime,
  endTime,
  onStartChange,
  onEndChange,
}: TimeRangePickerProps) => {
  return (
    <div className="flex items-center gap-3">
      <input
        type="time"
        value={startTime}
        onChange={(e) => onStartChange(e.target.value)}
        className="flex-1 rounded-lg border border-border px-3 py-2 text-body font-sans text-text outline-none focus:border-primary transition-colors duration-200"
      />
      <span className="text-body text-text-gray">~</span>
      <input
        type="time"
        value={endTime}
        onChange={(e) => onEndChange(e.target.value)}
        className="flex-1 rounded-lg border border-border px-3 py-2 text-body font-sans text-text outline-none focus:border-primary transition-colors duration-200"
      />
    </div>
  );
};

export default TimeRangePicker;
