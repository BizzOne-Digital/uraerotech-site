const items = [
  'FAA STANDARDS',
  'EASA COMPLIANT',
  'STRUCTURAL REPAIR',
  '50K+ PARTS',
  'AOG RESPONSE',
  'CERTIFIED TOOLS',
  'GLOBAL COVERAGE',
  '20+ YEARS',
];

export default function MarqueeStrip({ dark = true }: { dark?: boolean }) {
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden border-y ${dark ? 'border-steel/10 bg-graphite' : 'border-steel/20 bg-offwhite'}`}>
      <div className="flex animate-marquee whitespace-nowrap py-3">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center mx-8 shrink-0">
            <span className={`font-mono text-[10px] tracking-[0.25em] ${dark ? 'text-steel/60' : 'text-steel'}`}>
              {item}
            </span>
            <span className={`mx-8 w-1 h-1 rounded-full ${dark ? 'bg-technical/40' : 'bg-technical'}`} />
          </span>
        ))}
      </div>
    </div>
  );
}
