interface SubjectTagProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}

const SubjectTag = ({ label, isSelected = false, onClick, onDelete }: SubjectTagProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-body font-sans transition-colors duration-200 ${
        isSelected
          ? 'border border-primary bg-primary-light text-text'
          : 'border border-border bg-white text-text-gray'
      }`}
    >
      {label}
      {onDelete && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-text-gray hover:text-text transition-colors"
        >
          ×
        </span>
      )}
    </button>
  );
};

export default SubjectTag;
