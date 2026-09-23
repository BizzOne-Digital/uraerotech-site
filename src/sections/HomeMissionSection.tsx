import { IconShield, IconGlobe, IconDiamond, IconGear } from '../components/icons';
import ScrollReveal from '../components/ui/ScrollReveal';
import { images } from '../assets/images';

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
    <section className="bg-offwhite">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal>
            <div className="relative aspect-square max-w-lg mx-auto lg:mx-0 bg-midnight/5 border border-midnight/10 p-6 md:p-10">
              <img
                src={images.about}
                alt="Aircraft engineering"
                className="w-full h-full object-cover mix-blend-multiply opacity-90"
              />
              <div className="absolute inset-6 md:inset-10 border border-gold/30 pointer-events-none" aria-hidden />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-4">Our Mission</p>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] text-midnight mb-6 leading-tight">
              Engineering Confidence in the Skies
            </h2>
            <p className="text-muted leading-relaxed mb-10">{text}</p>

            <ul className="space-y-6">
              {values.map((v) => (
                <li key={v.title} className="flex gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-full border border-gold/40 flex items-center justify-center text-gold">
                    <v.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading text-base text-midnight mb-1">{v.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{v.description}</p>
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
