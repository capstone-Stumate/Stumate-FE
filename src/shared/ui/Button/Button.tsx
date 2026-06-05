interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  isActive?: boolean;
  className?: string;
}

const Button = ({
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  type = 'button',
  isActive = true,
  className = '',
}: ButtonProps) => {
  const baseStyle =
    'rounded-full font-sans font-medium transition-colors duration-200';

  const variantStyle = {
    primary: isActive
      ? 'bg-primary text-white hover:bg-primary-dark'
      : 'bg-primary-light text-text-gray cursor-not-allowed',
    secondary: 'border border-border text-text-gray bg-transparent hover:bg-border/30',
  };

  const sizeStyle = {
    sm: 'w-auto px-4 py-2 text-sm',
    md: 'w-full py-3 text-body',
    lg: 'w-full py-4 text-body',
  };

  return (
    <button
      type={type}
      onClick={isActive ? onClick : undefined}
      className={`${baseStyle} ${variantStyle[variant]} ${sizeStyle[size]} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
