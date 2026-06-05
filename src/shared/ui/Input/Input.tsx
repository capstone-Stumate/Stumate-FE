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
        <label className="text-body font-sans text-text-gray">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg bg-bg px-4 text-body font-sans text-text outline-none placeholder:text-text-gray focus:outline-1 focus:outline-primary transition-all duration-200"
      />
    </div>
  );
};

export default Input;
