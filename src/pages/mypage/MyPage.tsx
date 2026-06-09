import { useNavigate } from 'react-router-dom';
import logoSmall from '@/assets/logo-small.svg';
import { ROUTE_PATH } from '@/app/router/path';
import useMypage from './hooks/useMypage';
import PlanLevel from '@/pages/onboarding/components/PlanLevel';
import SubjectSelect from '@/pages/onboarding/components/SubjectSelect';
import ScheduleInput from '@/pages/onboarding/components/ScheduleInput';
import ScheduleList from '@/pages/onboarding/components/ScheduleList';
import navPolygon from '@/assets/nav-polygon.svg';
import Button from '@/shared/ui/Button/Button';

const MyPage = () => {
  const navigate = useNavigate();
  const {
    user,
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
    handleSave,
  } = useMypage();

  return (
    <>
      <header className="pt-10">
        <img src={logoSmall} alt="Stumate" />
        <div className="relative flex items-center justify-center py-4">
          <h1 className="text-header2 text-text font-sans font-bold">
            내 정보
          </h1>
        </div>
      </header>

      <div className="flex flex-col gap-4">
        <section className="flex flex-col gap-1">
          <span className="text-text font-sans text-[17px] font-bold">
            {user.name}
          </span>
          <span className="text-body text-text-gray font-sans">
            {user.username}
          </span>

          <div className="mb-2 flex items-center gap-1">
            <button
              type="button"
              className="text-primary text-body self-start font-sans font-medium underline"
              onClick={() => navigate(ROUTE_PATH.TODOLIST)}
            >
              투두리스트
            </button>
            <img src={navPolygon} alt="navpolygon" />
          </div>
        </section>

        <PlanLevel
          value={difficulty}
          onChange={setDifficulty}
          action={
            <Button label="변경 상태 저장" onClick={handleSave} size="sm" />
          }
        />

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
    </>
  );
};

export default MyPage;
