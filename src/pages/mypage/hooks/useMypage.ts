import { useState } from 'react';
import { useGetSubjects, useAddSubject, useDeleteSubject } from '@/shared/api/generated/user-subject-controller/user-subject-controller';
import { useGetSchedules, useCreateSchedule, useDeleteSchedule } from '@/shared/api/generated/fixed-schedule-controller/fixed-schedule-controller';
import { useUpdatePlanInfo } from '@/shared/api/generated/user-controller/user-controller';
import type { SubjectInfo, ScheduleInfo, UpdatePlanInfoPlanLevel } from '@/shared/api/generated/stumateAPI.schemas';
import useAuthStore from '@/shared/store/authStore';
import type { LevelId } from '@/shared/constants/level';
import type { DayId } from '@/shared/constants/subjects';

const useMypage = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [difficulty, setDifficulty] = useState<LevelId>((user?.planLevel as LevelId) ?? 'EASY');
  const [subjectInput, setSubjectInput] = useState('');
  const [scheduleName, setScheduleName] = useState('');
  const [selectedDays, setSelectedDays] = useState<DayId[]>([]);
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('12:00');

  const { data: subjectsData, refetch: refetchSubjects } = useGetSubjects(user?.userId ?? 0, {
    query: { enabled: !!user?.userId },
  });
  const subjectInfos = subjectsData as unknown as SubjectInfo[] | undefined;
  const subjects = (subjectInfos ?? []).map((s) => s.subjectName ?? '');

  const { data: schedulesData, refetch: refetchSchedules } = useGetSchedules(user?.userId ?? 0, {
    query: { enabled: !!user?.userId },
  });
  const scheduleInfos = schedulesData as unknown as ScheduleInfo[] | undefined;
  const schedules = (scheduleInfos ?? []).map((s) => ({
    id: String(s.scheduleId),
    name: s.scheduleName ?? '',
    days: (s.days ?? []) as DayId[],
    startTime: s.startTime ?? '',
    endTime: s.endTime ?? '',
  }));

  const { mutate: addSubjectMutate } = useAddSubject();
  const { mutate: deleteSubjectMutate } = useDeleteSubject();
  const { mutate: createScheduleMutate } = useCreateSchedule();
  const { mutate: deleteScheduleMutate } = useDeleteSchedule();
  const { mutate: updatePlanMutate } = useUpdatePlanInfo();

  const handleAddSubject = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || !subjectInput.trim() || (subjectInfos?.length ?? 0) >= 5) return;
    if (!user) return;
    addSubjectMutate(
      { userId: user.userId, data: { subjectName: subjectInput.trim() } },
      {
        onSuccess: () => {
          refetchSubjects();
          setSubjectInput('');
        },
      },
    );
  };

  const handleDeleteSubject = (index: number) => {
    if (!user || !subjectInfos) return;
    const subject = subjectInfos[index];
    if (!subject?.userSubjectId) return;
    deleteSubjectMutate(
      { userId: user.userId, userSubjectId: subject.userSubjectId },
      { onSuccess: () => refetchSubjects() },
    );
  };

  const handleToggleDay = (day: DayId) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleAddSchedule = () => {
    if (selectedDays.length === 0 || !scheduleName.trim() || !user) return;
    createScheduleMutate(
      {
        userId: user.userId,
        data: { scheduleName: scheduleName.trim(), days: selectedDays, startTime, endTime },
      },
      {
        onSuccess: () => {
          refetchSchedules();
          setScheduleName('');
          setSelectedDays([]);
          setStartTime('08:00');
          setEndTime('12:00');
        },
      },
    );
  };

  const handleDeleteSchedule = (id: string) => {
    if (!user) return;
    deleteScheduleMutate(
      { userId: user.userId, scheduleId: Number(id) },
      { onSuccess: () => refetchSchedules() },
    );
  };

  const handleSave = () => {
    if (!user) return;
    updatePlanMutate(
      { userId: user.userId, data: { planLevel: difficulty as UpdatePlanInfoPlanLevel } },
      {
        onSuccess: () => {
          setUser({ ...user, planLevel: difficulty as UpdatePlanInfoPlanLevel });
        },
      },
    );
  };

  return {
    user: { name: user?.name ?? '', username: user?.username ?? '' },
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
    handleSave,
  };
};

export default useMypage;
