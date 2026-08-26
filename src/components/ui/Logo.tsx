import { Link } from 'react-router-dom';

const LOGO_SRC = '/images/logo.png';

interface LogoProps {
  className?: string;
  height?: 'sm' | 'md' | 'lg';
}

const heights = {
  sm: 'h-7 sm:h-8',
  md: 'h-8 sm:h-9 md:h-11 max-w-[min(100%,11.5rem)] sm:max-w-[14rem] md:max-w-none',
  lg: 'h-10 sm:h-11 md:h-14 max-w-[min(100%,13rem)] sm:max-w-[16rem] md:max-w-none',
};

export default function Logo({ className = '', height = 'md' }: LogoProps) {
  return (
    <Link to="/" className={`inline-block shrink-0 ${className}`} aria-label="UR Aerotech home">
      <img
        src={LOGO_SRC}
        alt="UR Aerotech — Aircraft Structure Repair"
        className={`${heights[height]} w-auto object-contain object-left`}
      />
    </Link>
  );
}
