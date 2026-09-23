import { IconShield, IconGlobe, IconBox, IconClock } from '../icons';

export type StatItem = { value: string; label: string };

export const defaultPageStats: StatItem[] = [
  { value: '20+', label: 'Years of Excellence' },
  { value: '50,000+', label: 'Parts in Stock' },
  { value: '99.8%', label: 'On-Time Delivery' },
  { value: '24/7', label: 'AOG Support' },
];

const statIcons = [IconShield, IconGlobe, IconBox, IconClock];

export default function StatsBar({
  stats = defaultPageStats,
  className = '',
  sideTagline,
}: {
  stats?: StatItem[];
  className?: string;
  sideTagline?: string;
}) {
  return (
    <div className={`border-t border-white/[0.08] bg-midnight/75 backdrop-blur-md min-w-0 ${className}`}>
      <div className="max-w-[1440px] mx-auto page-x">
        <div className="flex items-stretch min-w-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 flex-1 min-w-0 gap-px bg-white/[0.08] overflow-hidden">
            {stats.slice(0, 4).map((s, i) => {
              const StatIcon = statIcons[i] ?? IconShield;
              return (
                <div
                  key={s.label}
                  className="flex flex-col xs:flex-row items-center xs:items-center gap-1.5 xs:gap-3 sm:gap-4 py-4 sm:py-6 md:py-8 px-2 xs:px-3 sm:px-6 bg-midnight/90 min-w-0 text-center xs:text-left"
                >
                  <div className="hidden xs:flex w-9 h-9 sm:w-10 sm:h-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                    <StatIcon size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-lg xs:text-xl sm:text-2xl md:text-3xl text-white leading-none">{s.value}</p>
                    <p className="text-[9px] xs:text-[10px] sm:text-[11px] text-white/55 mt-1.5 leading-snug break-anywhere line-clamp-2">
                      {s.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          {sideTagline && (
            <div className="hidden xl:flex items-center pl-6 border-l border-white/[0.08] shrink-0">
              <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-gold/70 [writing-mode:vertical-rl] rotate-180 break-anywhere">
                {sideTagline}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
