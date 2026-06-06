import BarChart from '@/shared/ui/BarChart/BarChart';

interface LocationChartProps {
  data: { label: string; value: number }[];
}

const LocationChart = ({ data }: LocationChartProps) => {
  return (
    <section>
      <h2 className="mb-3 font-sans text-body font-semibold text-text">장소별 효율</h2>
      <BarChart data={data} showValueLabel={false} />
    </section>
  );
};

export default LocationChart;
