interface TodoItemProps {
  id: string;
  label: string;
  isChecked: boolean;
  onToggle: (id: string) => void;
  onDelete?: (id: string) => void;
}

const TodoItem = ({ id, label, isChecked, onToggle, onDelete }: TodoItemProps) => {
  return (
    <li className="flex items-center gap-3 py-2">
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={() => onToggle(id)}
        className="h-4 w-4 accent-primary cursor-pointer"
      />
      <label
        htmlFor={id}
        className={`flex-1 text-body font-sans cursor-pointer ${isChecked ? 'text-text-gray' : 'text-text'}`}
      >
        {label}
      </label>
      {onDelete && (
        <button
          type="button"
          onClick={() => onDelete(id)}
          className="text-text-gray hover:text-text"
          aria-label="삭제"
        >
          ✕
        </button>
      )}
    </li>
  );
};

export default TodoItem;
