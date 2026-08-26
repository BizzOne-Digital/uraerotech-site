export default function CornerBrackets({ className = '' }: { className?: string }) {
  return (
    <>
      <span className={`absolute top-0 left-0 w-4 h-4 border-t border-l border-technical/40 ${className}`} aria-hidden />
      <span className={`absolute top-0 right-0 w-4 h-4 border-t border-r border-technical/40 ${className}`} aria-hidden />
      <span className={`absolute bottom-0 left-0 w-4 h-4 border-b border-l border-technical/40 ${className}`} aria-hidden />
      <span className={`absolute bottom-0 right-0 w-4 h-4 border-b border-r border-technical/40 ${className}`} aria-hidden />
    </>
  );
}
