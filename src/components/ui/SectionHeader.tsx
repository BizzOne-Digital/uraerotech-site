interface SectionHeaderProps {
  number?: string;
  label: string;
  title: string;
  description?: string;
  light?: boolean;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  number,
  label,
  title,
  description,
  light = false,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <div className={`mb-14 md:mb-20 ${align === 'center' ? 'text-center' : ''}`}>
      {number && (
        <p className="font-mono text-[10px] text-technical/60 mb-3">{number}</p>
      )}
      <p className={`eyebrow mb-5 ${light ? 'text-technical' : ''}`}>{label}</p>
      <h2
        className={`display-title text-[clamp(2rem,5vw,3.5rem)] max-w-3xl ${
          align === 'center' ? 'mx-auto' : ''
        } ${light ? 'text-graphite' : 'text-offwhite'}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`body-lg mt-5 max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${
            light ? 'text-muted' : ''
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
