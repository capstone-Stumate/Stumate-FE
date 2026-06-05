interface TagProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
  variant?: 'subject' | 'day';
}

const Tag = ({ label, isSelected = false, onClick, variant = 'subject' }: TagProps) => {
  const baseStyle = 'inline-flex items-center justify-center font-sans text-body transition-colors duration-200 cursor-pointer';

  const variantStyle = {
    subject: `px-3 py-1 rounded-full ${isSelected ? 'bg-primary text-white' : 'border border-border text-text-gray bg-white'}`,
    day: `w-8 h-8 rounded-full text-xs ${isSelected ? 'bg-primary text-white' : 'border border-border text-text-gray bg-white'}`,
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyle} ${variantStyle[variant]}`}
    >
      {label}
    </button>
  );
};

export default Tag;
