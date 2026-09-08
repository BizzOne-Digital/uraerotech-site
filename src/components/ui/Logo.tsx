import { Link } from 'react-router-dom';

const LOGO_SRC = '/images/logo.png';

interface LogoProps {
  className?: string;
  height?: 'sm' | 'md' | 'lg';
  /** Show white backing on dark headers */
  framed?: boolean;
}

const heights = {
  sm: 'h-8 sm:h-9',
  md: 'h-9 sm:h-10 md:h-12 max-w-[min(100%,12rem)] sm:max-w-[14rem] md:max-w-[16rem]',
  lg: 'h-10 sm:h-11 md:h-14 max-w-[min(100%,14rem)] sm:max-w-[16rem] md:max-w-[18rem]',
};

export default function Logo({ className = '', height = 'md', framed = true }: LogoProps) {
  return (
    <Link to="/" className={`inline-block shrink-0 ${className}`} aria-label="UR Aerotech home">
      <span
        className={`inline-flex items-center ${framed ? 'rounded-md bg-white px-2 py-1 shadow-sm shadow-black/10' : ''}`}
      >
        <img
          src={LOGO_SRC}
          alt="UR Aerotech — Aircraft Structure Repair"
          className={`${heights[height]} w-auto object-contain object-left`}
        />
      </span>
    </Link>
  );
}
