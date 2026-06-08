interface TodoInputProps {
  content: string;
  date: string;
  onContentChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onSubmit: () => void;
}

const TodoInput = ({ content, date, onContentChange, onDateChange, onSubmit }: TodoInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSubmit();
  };

  return (
    <div className="flex flex-col gap-2 rounded-xl bg-white p-4">
      <input
        type="date"
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        className="text-body font-sans text-text-gray w-fit cursor-pointer outline-none"
      />
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="할 일을 입력하세요"
          className="text-body font-sans text-text placeholder:text-text-gray flex-1 outline-none"
        />
        <button
          type="button"
          onClick={onSubmit}
          disabled={!content.trim()}
          className="text-body font-sans text-primary font-semibold disabled:opacity-40"
        >
          추가
        </button>
      </div>
    </div>
  );
};

export default TodoInput;
