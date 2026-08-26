import { useCounter } from '../animations/scrollAnimations';

const defaultStats = [
  { label: 'Years of Experience', value: '20', suffix: '+', numeric: 20 },
  { label: 'Projects Completed', value: '5000', suffix: '+', numeric: 5000 },
  { label: 'Satisfied Clients', value: '1000', suffix: '+', numeric: 1000 },
  { label: 'Parts in Inventory', value: '50', suffix: 'K+', numeric: 50 },
];

export default function Statistics({
  statistics,
}: {
  statistics?: { label: string; value: string; suffix?: string }[];
}) {
  const stats = statistics
    ? statistics.map((s) => ({ ...s, suffix: s.suffix ?? '', numeric: parseInt(s.value) || 0 }))
    : defaultStats;

  return (
    <section className="section-muted border-y border-white/[0.06]">
      <div className="section-pad !py-16 md:!py-20">
        <div className="site-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat) => (
              <StatItem key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat }: { stat: typeof defaultStats[0] }) {
  const ref = useCounter(stat.numeric);

  return (
    <div className="text-center lg:text-left">
      <div className="flex items-baseline justify-center lg:justify-start gap-0.5">
        <span ref={ref} className="font-heading text-4xl md:text-5xl text-white tabular-nums">0</span>
        {stat.suffix && <span className="font-heading text-2xl text-technical">{stat.suffix}</span>}
      </div>
      <p className="font-mono text-[10px] text-steel uppercase tracking-wider mt-2">{stat.label}</p>
    </div>
  );
}
