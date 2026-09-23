import { Link } from 'react-router-dom';

const LOGO_SRC = '/images/logo.jpg';

interface LogoProps {
  className?: string;
  height?: 'sm' | 'md' | 'lg';
}

const heights = {
  sm: 'h-9 sm:h-10',
  md: 'h-11 sm:h-12 md:h-14 max-w-[min(100%,14rem)] sm:max-w-[16rem] md:max-w-[18rem]',
  lg: 'h-12 sm:h-14 md:h-16 max-w-[min(100%,16rem)] sm:max-w-[18rem] md:max-w-[20rem]',
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
