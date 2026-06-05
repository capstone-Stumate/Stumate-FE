interface SubjectTagProps {
  label: string;
  onDelete: () => void;
}

const SubjectTag = ({ label, onDelete }: SubjectTagProps) => {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-primary bg-primary-light px-3 py-1">
      <span className="text-body font-sans text-text">{label}</span>
      <button
        type="button"
        onClick={onDelete}
        className="text-text-gray hover:text-text transition-colors"
      >
        ×
      </button>
    </div>
  );
};

export default SubjectTag;
