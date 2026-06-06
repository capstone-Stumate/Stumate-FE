// TODO: import instance from '@/shared/api/instance';
import type { DayTodos } from '@/shared/types/todo';

export const getTodos = async (_date: string): Promise<DayTodos> => {
  // TODO: const response = await instance.get(`/todos?date=${_date}`);
  throw new Error('Not implemented');
};

export const toggleTodoComplete = async (
  _todoId: string,
  _isCompleted: boolean,
): Promise<void> => {
  // TODO: await instance.patch(`/todos/${_todoId}`, { isCompleted: _isCompleted });
};

export const getWeekStudyHours = async (_startDate: string): Promise<number[]> => {
  // TODO: const response = await instance.get(`/study-hours?startDate=${_startDate}`);
  throw new Error('Not implemented');
};
