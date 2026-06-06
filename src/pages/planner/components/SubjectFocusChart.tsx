import BarChart from '@/shared/ui/BarChart/BarChart';

interface SubjectFocusChartProps {
  data: { label: string; value: number }[];
}

const SubjectFocusChart = ({ data }: SubjectFocusChartProps) => {
  return (
    <section>
      <h2 className="mb-3 font-sans text-body font-semibold text-text">과목별 집중도</h2>
      <BarChart data={data} showValueLabel={false} colorScheme="dark" />
    </section>
  );
};

export default SubjectFocusChart;
