import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdatePlanInfo } from '@/shared/api/generated/user-controller/user-controller';
import { addSubject } from '@/shared/api/generated/user-subject-controller/user-subject-controller';
import { createSchedule } from '@/shared/api/generated/fixed-schedule-controller/fixed-schedule-controller';
import useAuthStore from '@/shared/store/authStore';
import { ROUTE_PATH } from '@/app/router/path';
import type { LevelId } from '@/shared/constants/level';
import type { DayId } from '@/shared/constants/subjects';
import type { UpdatePlanInfoPlanLevel } from '@/shared/api/generated/stumateAPI.schemas';

interface Schedule {
  id: string;
  name: string;
  days: DayId[];
  startTime: string;
  endTime: string;
}

const useOnboarding = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [difficulty, setDifficulty] = useState<LevelId>('EASY');
  const [subjects, setSubjects] = useState<string[]>([]);
  const [subjectInput, setSubjectInput] = useState('');
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [scheduleName, setScheduleName] = useState('');
  const [selectedDays, setSelectedDays] = useState<DayId[]>([]);
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('12:00');

  const { mutate: updatePlanMutate } = useUpdatePlanInfo();

  const handleAddSubject = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && subjectInput.trim() && subjects.length < 5) {
      setSubjects([...subjects, subjectInput.trim()]);
      setSubjectInput('');
    }
  };

  const handleDeleteSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const handleToggleDay = (day: DayId) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleAddSchedule = () => {
    if (selectedDays.length === 0 || !scheduleName.trim()) return;
    setSchedules([
      ...schedules,
      { id: crypto.randomUUID(), name: scheduleName.trim(), days: selectedDays, startTime, endTime },
    ]);
    setScheduleName('');
    setSelectedDays([]);
    setStartTime('08:00');
    setEndTime('12:00');
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedules(schedules.filter((s) => s.id !== id));
  };

  const handleComplete = async () => {
    if (!user) return;

    await Promise.all(
      subjects.map((name) => addSubject(user.userId, { subjectName: name })),
    );

    await Promise.all(
      schedules.map((s) =>
        createSchedule(user.userId, {
          scheduleName: s.name,
          days: s.days,
          startTime: s.startTime,
          endTime: s.endTime,
        }),
      ),
    );

    updatePlanMutate(
      { userId: user.userId, data: { planLevel: difficulty as UpdatePlanInfoPlanLevel } },
      {
        onSuccess: () => {
          setUser({ ...user, planLevel: difficulty as UpdatePlanInfoPlanLevel });
          navigate(ROUTE_PATH.TIMER);
        },
      },
    );
  };

  return {
    difficulty,
    setDifficulty,
    subjects,
    subjectInput,
    setSubjectInput,
    handleAddSubject,
    handleDeleteSubject,
    scheduleName,
    setScheduleName,
    selectedDays,
    handleToggleDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    schedules,
    handleAddSchedule,
    handleDeleteSchedule,
    handleComplete,
  };
};

export default useOnboarding;
