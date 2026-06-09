import { useState } from 'react';
import type { LevelId } from '@/shared/constants/level';
import type { DayId } from '@/shared/constants/subjects';

interface Schedule {
  id: string;
  name: string;
  days: DayId[];
  startTime: string;
  endTime: string;
}

const MOCK_USER = {
  name: '학생',
  email: 'student@stumate.io',
};

const MOCK_SCHEDULES: Schedule[] = [
  { id: '1', name: '오전 공부', days: ['MON', 'WED', 'FRI'], startTime: '09:00', endTime: '12:00' },
  { id: '2', name: '저녁 복습', days: ['TUE', 'THU'], startTime: '19:00', endTime: '21:00' },
];

const useMypage = () => {
  const [difficulty, setDifficulty] = useState<LevelId>('EASY');
  const [subjects, setSubjects] = useState<string[]>(['수학', '영어', '과학']);
  const [subjectInput, setSubjectInput] = useState('');
  const [schedules, setSchedules] = useState<Schedule[]>(MOCK_SCHEDULES);
  const [scheduleName, setScheduleName] = useState('');
  const [selectedDays, setSelectedDays] = useState<DayId[]>([]);
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('12:00');

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
      {
        id: crypto.randomUUID(),
        name: scheduleName.trim(),
        days: selectedDays,
        startTime,
        endTime,
      },
    ]);
    setScheduleName('');
    setSelectedDays([]);
    setStartTime('08:00');
    setEndTime('12:00');
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedules(schedules.filter((s) => s.id !== id));
  };

  return {
    user: MOCK_USER,
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
  };
};

export default useMypage;
