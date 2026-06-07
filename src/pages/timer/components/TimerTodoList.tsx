import { useState, useRef, useEffect } from 'react';
import type { Todo } from '@/shared/types/todo';
import TodoItem from '@/shared/ui/TodoItem/TodoItem';

interface TimerTodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onAdd: (content: string) => void;
  onDelete: (id: string) => void;
}

const TimerTodoList = ({ todos, onToggle, onAdd, onDelete }: TimerTodoListProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAdding) {
      inputRef.current?.focus();
    }
  }, [isAdding]);

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputValue.trim()) {
        onAdd(inputValue.trim());
      }
      setInputValue('');
      setIsAdding(false);
    } else if (e.key === 'Escape') {
      setInputValue('');
      setIsAdding(false);
    }
  };

  const handleBlur = () => {
    setInputValue('');
    setIsAdding(false);
  };

  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-sans text-body font-semibold text-text">오늘 todo list</h2>
        <button type="button" onClick={handleAddClick} className="font-sans text-body text-primary">
          추가 +
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            label={todo.content}
            isChecked={todo.isCompleted}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
        {isAdding && (
          <li className="flex items-center gap-3 py-2">
            <input type="checkbox" disabled className="h-4 w-4 accent-primary" />
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder="할 일 입력 후 Enter"
              className="flex-1 bg-transparent font-sans text-body text-text outline-none placeholder:text-text-gray"
            />
          </li>
        )}
      </ul>
    </section>
  );
};

export default TimerTodoList;
