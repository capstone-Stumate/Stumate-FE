export interface Todo {
  id: string;
  subject: string;
  content: string;
  isCompleted: boolean;
}

export interface DayTodos {
  date: string; // 'YYYY-MM-DD'
  todos: Todo[];
}
