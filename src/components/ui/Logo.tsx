import { Link } from 'react-router-dom';

const LOGO_SRC = '/images/logo.png';

interface LogoProps {
  className?: string;
  height?: 'sm' | 'md' | 'lg';
  /** Show white backing on dark headers */
  framed?: boolean;
}

const heights = {
  sm: 'h-9 sm:h-10',
  md: 'h-11 sm:h-12 md:h-14 max-w-[min(100%,14rem)] sm:max-w-[16rem] md:max-w-[18rem]',
  lg: 'h-12 sm:h-14 md:h-16 max-w-[min(100%,16rem)] sm:max-w-[18rem] md:max-w-[20rem]',
};

export default function Logo({ className = '', height = 'md', framed = true }: LogoProps) {
  return (
    <Link to="/" className={`inline-block shrink-0 ${className}`} aria-label="UR Aerotech home">
      <span
        className={`inline-flex items-center ${framed ? 'rounded-md bg-white px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-sm shadow-black/10' : ''}`}
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
