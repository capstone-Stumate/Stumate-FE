import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface FocusChartItem {
  label: string;
  hour: number;
  focusScore: number;
}

interface FocusByTimeChartProps {
  data: FocusChartItem[];
  focusPeakLabel: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: FocusChartItem }[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="rounded-lg bg-text px-3 py-2 text-center shadow">
      <p className="font-sans text-xs font-semibold text-white">{item.label}</p>
      <p className="font-sans text-xs text-white">집중도 {item.focusScore}</p>
    </div>
  );
};

const FocusByTimeChart = ({ data, focusPeakLabel }: FocusByTimeChartProps) => {
  return (
    <section>
      <h2 className="mb-1 font-sans text-body font-semibold text-text">시간대별 평균 집중도</h2>
      <p className="mb-3 font-sans text-xs text-text-gray">
        — 집중도 피크: {focusPeakLabel} (이간 ↑)
      </p>
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: '#747474', fontFamily: 'sans-serif' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="focusScore"
            stroke="#9DDE78"
            strokeWidth={2.5}
            dot={{ fill: '#9DDE78', r: 3 }}
            activeDot={{ r: 5, fill: '#84C95F' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default FocusByTimeChart;
