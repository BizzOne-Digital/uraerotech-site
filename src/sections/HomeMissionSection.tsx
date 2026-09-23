import { IconShield, IconGlobe, IconDiamond, IconGear } from '../components/icons';
import ScrollReveal from '../components/ui/ScrollReveal';
import { homeImages } from '../assets/homeImages';

const values = [
  { icon: IconShield, title: 'Certified Professionals', description: 'FAA-aligned processes and experienced structural specialists.' },
  { icon: IconGlobe, title: 'Global Support Network', description: 'Serving operators and MRO partners across regions worldwide.' },
  { icon: IconDiamond, title: 'Quality You Can Trust', description: 'Certified materials, documented workflows, and rigorous inspection.' },
  { icon: IconGear, title: 'Built for What\'s Next', description: 'Continuous improvement in repair techniques and capabilities.' },
];

export default function HomeMissionSection({ mission }: { mission?: string }) {
  const text =
    mission ??
    'We deliver aircraft structural repair and modification with an unwavering commitment to safety, compliance, and precision — so every aircraft returns to service stronger than before.';

  return (
    <section className="relative bg-[#0A0E14] overflow-hidden border-t border-white/[0.06]">
      <img
        src={homeImages.sections.structuralOpen}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.22]"
        aria-hidden
      />
      <img
        src={homeImages.heroBlueprint}
        alt=""
        className="absolute inset-0 w-full h-full object-contain object-center opacity-[0.04] pointer-events-none"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E14]/95 via-[#0A0E14]/88 to-[#0A0E14]/92" aria-hidden />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-16 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start">
          <ScrollReveal>
            <div className="flex gap-6 sm:gap-8 min-w-0">
              <div
                className="hidden sm:flex shrink-0 flex-col items-center pt-1 pr-6 sm:pr-8 border-r border-gold/25"
                aria-hidden
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold/90 [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
                  People · Expertise · Quality · Flight Ready
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold mb-4 sm:hidden">Our Mission</p>
                <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.65rem)] font-semibold text-white mb-5 leading-[1.15] max-w-xl">
                  Engineering Confidence in the Skies
                </h2>
                <p className="font-body text-[15px] md:text-base text-white/70 leading-relaxed max-w-xl">{text}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="lg:border-l lg:border-gold/15 lg:pl-10 xl:pl-14">
            <ul className="space-y-6 md:space-y-7 max-w-lg lg:max-w-none lg:ml-auto lg:mr-0 xl:pr-4">
              {values.map((v) => (
                <li key={v.title} className="flex gap-4 md:gap-5">
                  <div className="shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full border border-gold/50 flex items-center justify-center text-gold bg-[#0A0E14]/40">
                    <v.icon size={20} />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="font-heading text-sm md:text-[15px] font-semibold text-gold mb-1.5">{v.title}</h3>
                    <p className="font-body text-sm text-white/60 leading-relaxed">{v.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
