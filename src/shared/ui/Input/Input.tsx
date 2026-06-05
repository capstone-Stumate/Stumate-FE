interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password' | 'email';
  className?: string;
}

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  className = '',
}: InputProps) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-body text-text-gray font-sans">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-bg text-body text-text placeholder:text-text-gray focus:outline-primary h-11 w-full rounded-lg px-4 font-sans transition-all duration-200 outline-none focus:outline-1"
      />
    </div>
  );
};

export default Input;
