import { Link } from 'react-router-dom';

const LOGO_SRC = '/images/logo.jpg';

interface LogoProps {
  className?: string;
  height?: 'sm' | 'md' | 'lg' | 'xl';
}

const heights = {
  sm: 'h-10 sm:h-11',
  md: 'h-12 sm:h-14 md:h-16 max-w-[min(100%,16rem)] sm:max-w-[18rem] md:max-w-[20rem]',
  lg: 'h-16 sm:h-[4.5rem] md:h-20 max-w-[min(100%,20rem)] sm:max-w-[22rem] md:max-w-[26rem]',
  xl: 'h-[4.75rem] sm:h-[5.25rem] md:h-24 max-w-[min(100%,22rem)] sm:max-w-[28rem] md:max-w-[32rem]',
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
