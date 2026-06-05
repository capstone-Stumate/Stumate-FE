interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button = ({
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
}: ButtonProps) => {
  const baseStyle =
    'rounded-full font-sans font-medium transition-colors duration-200';

  const variantStyle = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary:
      'border border-border text-text-gray bg-transparent hover:bg-border/30',
  };

  const sizeStyle = {
    sm: 'w-auto px-4 py-2 text-sm',
    md: 'w-full py-3 text-body',
    lg: 'w-full py-4 text-body',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variantStyle[variant]} ${sizeStyle[size]} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
