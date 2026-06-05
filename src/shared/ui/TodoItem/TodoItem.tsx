interface TodoItemProps {
  id: string;
  label: string;
  isChecked: boolean;
  onToggle: (id: string) => void;
}

const TodoItem = ({ id, label, isChecked, onToggle }: TodoItemProps) => {
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
        className={`flex-1 text-body font-sans cursor-pointer ${isChecked ? 'text-text-gray line-through' : 'text-text'}`}
      >
        {label}
      </label>
    </li>
  );
};

export default TodoItem;
