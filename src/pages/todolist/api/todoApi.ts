import instance from '@/shared/api/instance';
import type { DayTodos } from '@/shared/types/todo';

export const getTodos = async (date: string): Promise<DayTodos> => {
  const response = await instance.get(`/todos?date=${date}`);
  return response.data;
};

export const toggleTodoComplete = async (
  todoId: string,
  isCompleted: boolean,
): Promise<void> => {
  await instance.patch(`/todos/${todoId}`, { isCompleted });
};

export const getWeekStudyHours = async (startDate: string): Promise<number[]> => {
  const response = await instance.get(`/study-hours?startDate=${startDate}`);
  return response.data;
};
