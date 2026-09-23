import ScrollReveal from '../components/ui/ScrollReveal';
import { IconShield, IconGear, IconWrench, IconCheck } from '../components/icons';
import { images } from '../assets/images';

const steps = [
  {
    step: '01',
    title: 'Assessment',
    description: 'Damage evaluation, documentation, and preliminary repair scheme development.',
    icon: IconShield,
  },
  {
    step: '02',
    title: 'Engineering',
    description: 'Structural analysis per SRM/AMM specifications and regulatory requirements.',
    icon: IconGear,
  },
  {
    step: '03',
    title: 'Repair',
    description: 'Precision execution with certified materials, tooling, and approved processes.',
    icon: IconWrench,
  },
  {
    step: '04',
    title: 'Inspection',
    description: 'NDT inspection, dimensional verification, and complete documentation.',
    icon: IconCheck,
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-midnight border-y border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-4">Our Process</p>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] text-white">
              Precision at Every Stage
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="hidden lg:block absolute top-[2.75rem] left-[8%] right-[8%] h-px bg-gold/30" aria-hidden />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {steps.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.08}>
                <div className="text-center lg:text-left">
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="relative z-10 w-14 h-14 rounded-full border border-gold/50 flex items-center justify-center text-gold bg-midnight mb-5">
                      <item.icon size={22} />
                    </div>
                    <span className="font-mono text-[11px] text-gold/80 mb-2">{item.step}</span>
                    <h3 className="font-heading text-lg text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal className="mt-14 hidden md:block" delay={0.2}>
          <img
            src={images.process[1]}
            alt=""
            className="w-full max-h-64 object-cover opacity-40"
            aria-hidden
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
