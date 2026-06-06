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
      <header className="relative flex items-center py-4">
        <img src={logoSmall} alt="Stumate" />
        <h1 className="absolute left-1/2 -translate-x-1/2 font-sans text-header2 font-bold text-text">
          플래너
        </h1>
      </header>
      <div className="flex flex-col gap-6 pb-8">
        {learningType && <AiLearningType learningType={learningType} />}
        <FocusByTimeChart data={focusChartData} focusPeakLabel={focusPeakLabel} />
        <PomodoroAnalysis data={pomodoroData} />
        <StudyAvgRate stats={studyStats} />
        <div className="flex gap-4">
          <LocationChart data={locationChartData} />
          <SubjectFocusChart data={subjectChartData} />
        </div>
      </div>
    </>
  );
};

export default PlannerPage;
