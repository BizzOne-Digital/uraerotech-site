import { Link } from 'react-router-dom';
import { IconArrowRight } from '../icons';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  variant?: 'fill' | 'outline' | 'accent' | 'primary' | 'secondary' | 'amber';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function Button({
  children,
  to,
  href,
  variant = 'accent',
  className = '',
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const variants = {
    fill: 'btn-fill',
    outline: 'btn-outline',
    accent: 'btn-accent',
    primary: 'btn-accent',
    secondary: 'btn-outline',
    amber: 'btn-fill',
  };

  const classes = `${variants[variant]} ${className} ${disabled ? 'opacity-40 pointer-events-none' : ''}`;

  const inner = (
    <>
      {children}
      <IconArrowRight size={15} />
    </>
  );

  if (to) return <Link to={to} className={classes}>{inner}</Link>;
  if (href) return <a href={href} className={classes} target="_blank" rel="noopener noreferrer">{inner}</a>;
  return <button type={type} className={classes} onClick={onClick} disabled={disabled}>{inner}</button>;
}
