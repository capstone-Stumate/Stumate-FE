interface DayChipProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const DayChip = ({ label, isSelected, onClick }: DayChipProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-full text-body font-sans transition-colors duration-200 ${
        isSelected ? 'bg-primary text-white' : 'bg-border text-text-gray'
      }`}
    >
      {label}
    </button>
  );
};

export default DayChip;
