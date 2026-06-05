import chevronDown from '@/assets/chevron-down.svg';
import chevronUp from '@/assets/chevron-up.svg';
import TodoItem from '@/shared/ui/TodoItem/TodoItem';
import type { Todo } from '@/shared/types/todo';
import { formatDateLabel, getDayLabel } from '@/shared/utils/formatDate';

interface DateAccordionProps {
  date: string;
  todos: Todo[];
  isOpen: boolean;
  isDisabled: boolean;
  onToggle: () => void;
  onToggleTodo: (todoId: string) => void;
}

const DateAccordion = ({
  date,
  todos,
  isOpen,
  isDisabled,
  onToggle,
  onToggleTodo,
}: DateAccordionProps) => {
  const dateLabel = formatDateLabel(date);
  const dayLabel = getDayLabel(date);

  return (
    <div className="overflow-hidden rounded-xl">
      <button
        type="button"
        disabled={isDisabled}
        onClick={onToggle}
        className={`flex w-full items-center justify-between px-4 py-3 ${
          isOpen
            ? 'bg-primary-light'
            : isDisabled
              ? 'cursor-not-allowed bg-white opacity-40'
              : 'bg-white'
        }`}
      >
        <span
          className={`text-body font-sans font-bold ${isOpen ? 'text-text' : 'text-text-gray'}`}
        >
          {dateLabel} ({dayLabel})
        </span>
        <img
          src={isOpen ? chevronUp : chevronDown}
          alt={isOpen ? '접기' : '펼치기'}
          className="h-4 w-4"
        />
      </button>

      {isOpen && (
        <ul className="bg-primary-light px-4 pb-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              label={`[${todo.subject}] ${todo.content}`}
              isChecked={todo.isCompleted}
              onToggle={() => onToggleTodo(todo.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default DateAccordion;
