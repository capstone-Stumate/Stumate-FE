import { useState } from 'react';
import type { Todo, DayTodos } from '@/shared/types/todo';
import type { DailyGroup } from '@/shared/api/generated/stumateAPI.schemas';
import { getWeekDates, getTodayString } from '@/shared/utils/formatDate';
import {
  useGetWeeklyTodos,
  useCreateTodo,
  useCompleteTodo,
  useDeleteTodo,
} from '@/shared/api/generated/todo-controller/todo-controller';
import useAuthStore from '@/shared/store/authStore';

const MOCK_STUDY_HOURS = [3, 2, 5, 1, 4, 0, 0];

const useTodolist = () => {
  const user = useAuthStore((state) => state.user);
  const weekDates = getWeekDates();
  const today = getTodayString();

  const [openDates, setOpenDates] = useState<Set<string>>(new Set());
  const [newTodoContent, setNewTodoContent] = useState('');
  const [newTodoDate, setNewTodoDate] = useState(today);

  const { data: weeklyTodosData, refetch } = useGetWeeklyTodos(
    user?.userId ?? 0,
    { startDate: weekDates[0], endDate: weekDates[6] },
    { query: { enabled: !!user?.userId } },
  );

  const { mutate: createTodoMutate } = useCreateTodo();
  const { mutate: completeTodoMutate } = useCompleteTodo();
  const { mutate: deleteTodoMutate } = useDeleteTodo();

  const weeklyTodos = weeklyTodosData as unknown as DailyGroup[] | undefined;

  const dayTodosList: DayTodos[] = weekDates.map((date) => {
    const group = weeklyTodos?.find((g) => g.todoDate === date);
    const todos: Todo[] = (group?.todos ?? []).map((info) => ({
      id: String(info.todoId),
      content: info.content ?? '',
      isCompleted: info.isCompleted ?? false,
    }));
    return { date, todos };
  });

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

  const handleCompleteTodo = (todoId: string) => {
    if (!user) return;
    completeTodoMutate(
      { userId: user.userId, todoId: Number(todoId) },
      { onSuccess: () => refetch() },
    );
  };

  const handleDeleteTodo = (todoId: string) => {
    if (!user) return;
    deleteTodoMutate(
      { userId: user.userId, todoId: Number(todoId) },
      { onSuccess: () => refetch() },
    );
  };

  const handleCreateTodo = () => {
    if (!user || !newTodoContent.trim()) return;
    createTodoMutate(
      { userId: user.userId, data: { content: newTodoContent.trim(), todoDate: newTodoDate } },
      {
        onSuccess: () => {
          setNewTodoContent('');
          refetch();
        },
      },
    );
  };

  return {
    dayTodosList,
    openDates,
    studyHourData,
    newTodoContent,
    setNewTodoContent,
    newTodoDate,
    setNewTodoDate,
    isDateDisabled,
    handleToggleDate,
    handleCompleteTodo,
    handleDeleteTodo,
    handleCreateTodo,
  };
};

export default useTodolist;
