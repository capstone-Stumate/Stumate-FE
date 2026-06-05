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
        className="border-b border-border bg-transparent py-2 text-body font-sans text-text outline-none placeholder:text-text-gray focus:border-primary transition-colors duration-200"
      />
    </div>
  );
};

export default Input;
