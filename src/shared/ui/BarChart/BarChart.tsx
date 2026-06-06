interface BarChartItem {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarChartItem[];
  showValueLabel?: boolean;
  formatValue?: (value: number) => string;
  colorScheme?: 'green' | 'dark';
}

const BAR_MAX_HEIGHT = 80;

// 3-stop 보간: stop1 → stop2 → stop3
const interpolate3 = (
  ratio: number,
  c1: [number, number, number],
  c2: [number, number, number],
  c3: [number, number, number],
): string => {
  let r: number, g: number, b: number;
  if (ratio <= 0.5) {
    const t = ratio / 0.5;
    r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
    g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
    b = Math.round(c1[2] + (c2[2] - c1[2]) * t);
  } else {
    const t = (ratio - 0.5) / 0.5;
    r = Math.round(c2[0] + (c3[0] - c2[0]) * t);
    g = Math.round(c2[1] + (c3[1] - c2[1]) * t);
    b = Math.round(c2[2] + (c3[2] - c2[2]) * t);
  }
  return `rgb(${r}, ${g}, ${b})`;
};

// green: #EAF7E2(234,247,226) → #9DDE78(157,222,120) → #84C95F(132,201,95)
const getGreenColor = (ratio: number): string =>
  interpolate3(ratio, [234, 247, 226], [157, 222, 120], [132, 201, 95]);

// dark: #F7F8F6(247,248,246) → #2F3431 50%(47,52,49 * 0.5 blend on white) → #2F3431(47,52,49)
// 50% blend on white: (247+47)/2, (248+52)/2, (246+49)/2 = (147, 150, 147)
const getDarkColor = (ratio: number): string =>
  interpolate3(ratio, [247, 248, 246], [147, 150, 147], [47, 52, 49]);

const BarChart = ({
  data,
  showValueLabel = false,
  formatValue,
  colorScheme = 'green',
}: BarChartProps) => {
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);

  const items = data.map(({ label, value }, index) => {
    const height = max === 0 ? 4 : Math.max((value / max) * BAR_MAX_HEIGHT, 4);
    const ratio = max === min ? 1 : (value - min) / (max - min);
    const bgColor = colorScheme === 'dark' ? getDarkColor(ratio) : getGreenColor(ratio);
    const displayValue = formatValue ? formatValue(value) : String(value);
    const isDarkLight = colorScheme === 'dark' && ratio < 0.3;
    return { label, height, bgColor, displayValue, isDarkLight, index };
  });

  return (
    <div>
      {/* 막대 영역 - items-end로 바닥 기준 정렬 */}
      <div className="flex items-end justify-between gap-1" style={{ height: `${BAR_MAX_HEIGHT + (showValueLabel ? 20 : 0)}px` }}>
        {items.map(({ height, bgColor, displayValue, isDarkLight, index }) => (
          <div key={index} className="flex flex-1 flex-col items-center justify-end gap-1 h-full">
            {showValueLabel && (
              <span className="font-sans text-xs text-text-gray">{displayValue}</span>
            )}
            <div
              style={{
                height: `${height}px`,
                backgroundColor: bgColor,
                border: isDarkLight ? '1px solid #E5E9E2' : undefined,
              }}
              className="w-full rounded-t-sm"
            />
          </div>
        ))}
      </div>
      {/* 라벨 영역 - 막대와 분리 */}
      <div className="flex justify-between gap-1 mt-1">
        {items.map(({ label, index }) => (
          <span key={index} className="flex-1 whitespace-pre text-center font-sans text-xs text-text-gray">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
