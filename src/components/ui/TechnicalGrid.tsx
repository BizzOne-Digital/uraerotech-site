export default function TechnicalGrid({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 technical-grid pointer-events-none ${className}`} aria-hidden />
  );
}

export function BlueprintOverlay() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]" aria-hidden>
      <defs>
        <pattern id="blueprint" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38A7D8" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#blueprint)" />
    </svg>
  );
}

export function CoordinateLabel({ x, y, label }: { x: string; y: string; label: string }) {
  return (
    <div className="absolute font-mono text-[9px] text-steel/40 tracking-wider" style={{ left: x, top: y }}>
      {label}
    </div>
  );
}

export function RivetPattern({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none opacity-20 ${className}`}
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(141,153,159,0.3) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
      aria-hidden
    />
  );
}
