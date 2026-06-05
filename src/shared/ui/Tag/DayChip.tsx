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
      className={`text-body flex h-10 w-10 items-center justify-center rounded-full font-sans transition-colors duration-200 ${
        isSelected ? 'bg-primary text-white' : 'bg-bg text-text-gray'
      }`}
    >
      {label}
    </button>
  );
};

export default DayChip;
