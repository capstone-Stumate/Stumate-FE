import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/app/router/path';
import useOnboarding from './hooks/useOnboarding';
import PlanLevel from './components/PlanLevel';
import SubjectSelect from './components/SubjectSelect';
import ScheduleInput from './components/ScheduleInput';
import ScheduleList from './components/ScheduleList';
import Button from '@/shared/ui/Button/Button';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const {
    difficulty,
    setDifficulty,
    subjects,
    subjectInput,
    setSubjectInput,
    handleAddSubject,
    handleDeleteSubject,
    selectedDays,
    handleToggleDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    scheduleName,
    setScheduleName,
    schedules,
    handleAddSchedule,
    handleDeleteSchedule,
  } = useOnboarding();

  return (
    <main className="flex min-h-screen flex-col py-10">
      <h1 className="text-header2 text-text mb-8 font-sans">학습 정보 입력</h1>
      <div className="flex flex-col gap-5">
        <PlanLevel value={difficulty} onChange={setDifficulty} />
        <SubjectSelect
          subjects={subjects}
          subjectInput={subjectInput}
          onInputChange={setSubjectInput}
          onKeyDown={handleAddSubject}
          onDelete={handleDeleteSubject}
        />
        <ScheduleInput
          scheduleName={scheduleName}
          selectedDays={selectedDays}
          startTime={startTime}
          endTime={endTime}
          onNameChange={setScheduleName}
          onToggleDay={handleToggleDay}
          onStartChange={setStartTime}
          onEndChange={setEndTime}
          onAdd={handleAddSchedule}
        />
        <ScheduleList schedules={schedules} onDelete={handleDeleteSchedule} />
      </div>
      <div className="mt-auto pt-8">
        <Button label="완료" onClick={() => navigate(ROUTE_PATH.TIMER)} />
      </div>
    </main>
  );
};

export default OnboardingPage;
