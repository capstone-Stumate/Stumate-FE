export interface Todo {
  id: string;
  content: string;
  isCompleted: boolean;
}

export interface DayTodos {
  date: string; // 'YYYY-MM-DD'
  todos: Todo[];
}
