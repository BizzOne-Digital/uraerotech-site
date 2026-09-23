import ScrollReveal from '../components/ui/ScrollReveal';
import { IconClipboard, IconGear, IconWrench, IconShield } from '../components/icons';
import { homeImages } from '../assets/homeImages';

const steps = [
  {
    step: '01',
    title: 'Assessment',
    description: 'Damage evaluation, documentation, and preliminary repair scheme development.',
    icon: IconClipboard,
    image: homeImages.process[0],
  },
  {
    step: '02',
    title: 'Engineering',
    description: 'Structural analysis per SRM/AMM specifications and regulatory requirements.',
    icon: IconGear,
    image: homeImages.process[1],
  },
  {
    step: '03',
    title: 'Repair',
    description: 'Precision execution with certified materials, tooling, and approved processes.',
    icon: IconWrench,
    image: homeImages.process[2],
  },
  {
    step: '04',
    title: 'Inspection',
    description: 'NDT inspection, dimensional verification, and complete documentation.',
    icon: IconShield,
    image: homeImages.process[3],
  },
];

export default function ProcessSection() {
  return (
    <section className="relative bg-[#0A0E14] border-y border-white/[0.06] overflow-hidden">
      <img
        src={homeImages.sections.hangarNight}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12]"
        aria-hidden
      />
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold mb-4">Our Process</p>
            <h2 className="font-display text-[clamp(1.85rem,4vw,2.85rem)] font-semibold text-white leading-tight">
              A Proven Path to Aircraft Readiness
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative mb-12 md:mb-16">
          <div className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-px bg-gold/25" aria-hidden />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {steps.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.08}>
                <div className="text-center">
                  <div className="relative inline-flex flex-col items-center mb-5">
                    <div className="relative z-10 w-14 h-14 rounded-full border-2 border-gold/55 flex items-center justify-center text-gold bg-[#0A0E14]">
                      <item.icon size={22} />
                    </div>
                    <span className="absolute -bottom-2 font-mono text-[10px] text-gold bg-[#0A0E14] px-2">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-semibold text-white mb-2">{item.title}</h3>
                  <p className="font-body text-sm text-white/50 leading-relaxed max-w-xs mx-auto">{item.description}</p>
                  <div className="mt-4 overflow-hidden border border-white/[0.06] aspect-[16/10] max-w-[200px] mx-auto opacity-80">
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.15}>
          <div className="grid md:grid-cols-2 gap-4">
            <img
              src={homeImages.productsFeature}
              alt=""
              className="w-full h-44 md:h-52 object-cover border border-white/[0.06] opacity-90"
            />
            <img
              src={homeImages.whyChoose}
              alt=""
              className="w-full h-44 md:h-52 object-cover border border-white/[0.06] opacity-90"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
