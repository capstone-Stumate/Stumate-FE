interface BarChartItem {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarChartItem[];
  showValueLabel?: boolean;
  formatValue?: (value: number) => string;
}

const BAR_MAX_HEIGHT = 80;

// primary: #9DDE78 (157, 222, 120) → primary-dark: #84C95F (132, 201, 95)
const getBarColor = (value: number, min: number, max: number): string => {
  if (max === min) return '#9DDE78';
  const ratio = (value - min) / (max - min);
  const r = Math.round(157 + (132 - 157) * ratio);
  const g = Math.round(222 + (201 - 222) * ratio);
  const b = Math.round(120 + (95 - 120) * ratio);
  return `rgb(${r}, ${g}, ${b})`;
};

const BarChart = ({ data, showValueLabel = false, formatValue }: BarChartProps) => {
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);

  return (
    <div className="flex items-end justify-between gap-1">
      {data.map(({ label, value }, index) => {
        const height = max === 0 ? 4 : Math.max((value / max) * BAR_MAX_HEIGHT, 4);
        const color = getBarColor(value, min, max);
        const displayValue = formatValue ? formatValue(value) : String(value);

        return (
          <div key={index} className="flex flex-1 flex-col items-center gap-1">
            {showValueLabel && (
              <span className="font-sans text-xs text-text-gray">{displayValue}</span>
            )}
            <div
              style={{ height: `${height}px`, backgroundColor: color }}
              className="w-full rounded-t-sm"
            />
            <span className="font-sans text-xs text-text-gray">{label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BarChart;
