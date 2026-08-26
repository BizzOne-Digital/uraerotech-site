import CornerBrackets from './CornerBrackets';

interface ImageFrameProps {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
  overlay?: boolean;
  label?: string;
}

export default function ImageFrame({
  src,
  alt,
  className = '',
  aspect = 'aspect-[4/3]',
  overlay = true,
  label,
}: ImageFrameProps) {
  return (
    <div className={`relative group ${className}`}>
      <div className={`${aspect} overflow-hidden relative`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-graphite/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        )}
        {label && (
          <div className="absolute bottom-4 left-4 data-plate px-3 py-1.5">
            <span className="font-mono text-[9px] text-technical tracking-widest">{label}</span>
          </div>
        )}
      </div>
      <CornerBrackets />
    </div>
  );
}
