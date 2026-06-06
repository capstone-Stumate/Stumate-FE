import logoSmall from '@/assets/logo-small.svg';
import usePlanner from './hooks/usePlanner';
import AiLearningType from './components/AiLearningType';
import FocusByTimeChart from './components/FocusByTimeChart';
import PomodoroAnalysis from './components/PomodoroAnalysis';
import StudyAvgRate from './components/StudyAvgRate';
import LocationChart from './components/LocationChart';
import SubjectFocusChart from './components/SubjectFocusChart';

const PlannerPage = () => {
  const {
    learningType,
    focusPeakLabel,
    focusChartData,
    pomodoroData,
    studyStats,
    locationChartData,
    subjectChartData,
  } = usePlanner();

  return (
    <>
      <header className="pt-10">
        <img src={logoSmall} alt="Stumate" />
        <div className="relative flex items-center justify-center py-4">
          <h1 className="text-header2 text-text font-sans font-bold">플래너</h1>
        </div>
      </header>

      <div className="flex flex-col gap-6 pb-8">
        {learningType && <AiLearningType learningType={learningType} />}
        <FocusByTimeChart
          data={focusChartData}
          focusPeakLabel={focusPeakLabel}
        />
        <PomodoroAnalysis data={pomodoroData} />
        <StudyAvgRate stats={studyStats} />
        <LocationChart data={locationChartData} />
        <SubjectFocusChart data={subjectChartData} />
      </div>
    </>
  );
};

export default PlannerPage;
