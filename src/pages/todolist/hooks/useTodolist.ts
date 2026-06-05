import { useState } from 'react';
import type { Todo, DayTodos } from '@/shared/types/todo';
import { getWeekDates, getTodayString } from '@/shared/utils/formatDate';

// Mock 데이터 (요일 인덱스 기준: 0=월 ~ 6=일)
const MOCK_TODOS_BY_DAY: Todo[][] = [
  [
    { id: '1', subject: '수학', content: '문제집 50-60p 풀기', isCompleted: true },
    { id: '2', subject: '영어', content: '단어 100개 암기', isCompleted: false },
  ],
  [
    { id: '3', subject: '과학', content: '실험 노트 정리', isCompleted: false },
  ],
  [
    { id: '4', subject: '수학', content: '오답노트 작성', isCompleted: true },
    { id: '5', subject: '영어', content: '문법 복습', isCompleted: true },
    { id: '6', subject: '과학', content: '핵심 개념 정리', isCompleted: false },
  ],
  [
    { id: '7', subject: '수학', content: '문제집 61-70p 풀기', isCompleted: false },
    { id: '8', subject: '과학', content: '과학 문제 풀기', isCompleted: false },
  ],
  [
    { id: '9', subject: '영어', content: '독해 지문 3개 풀기', isCompleted: false },
  ],
  [],
  [],
];

const MOCK_STUDY_HOURS = [3, 2, 5, 1, 4, 0, 0];

const useTodolist = () => {
  const weekDates = getWeekDates();
  const today = getTodayString();

  const initialDayTodos: DayTodos[] = weekDates.map((date, i) => ({
    date,
    todos: MOCK_TODOS_BY_DAY[i] ?? [],
  }));

  const [dayTodosList, setDayTodosList] = useState<DayTodos[]>(initialDayTodos);
  const [openDates, setOpenDates] = useState<Set<string>>(new Set());

  const studyHourData = weekDates.map((_, i) => ({
    label: ['월', '화', '수', '목', '금', '토', '일'][i],
    value: MOCK_STUDY_HOURS[i] ?? 0,
  }));

  const isDateDisabled = (date: string, todos: Todo[]): boolean => {
    return date > today || todos.length === 0;
  };

  const handleToggleDate = (date: string) => {
    setOpenDates((prev) => {
      const next = new Set(prev);
      if (next.has(date)) {
        next.delete(date);
      } else {
        next.add(date);
      }
      return next;
    });
  };

  const handleToggleTodo = (date: string, todoId: string) => {
    setDayTodosList((prev) =>
      prev.map((day) => {
        if (day.date !== date) return day;
        return {
          ...day,
          todos: day.todos.map((todo) =>
            todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo,
          ),
        };
      }),
    );
    // TODO: API 연동 시 toggleTodoComplete(todoId, !currentIsCompleted) 호출
  };

  return {
    dayTodosList,
    openDates,
    studyHourData,
    isDateDisabled,
    handleToggleDate,
    handleToggleTodo,
  };
};

export default useTodolist;
