import { useState } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import ScrollReveal from '../components/ui/ScrollReveal';
import { images } from '../assets/images';

const steps = [
  { step: '01', title: 'Assessment', description: 'Damage evaluation, documentation, and preliminary repair scheme development.', image: images.process[0] },
  { step: '02', title: 'Engineering Review', description: 'Structural analysis per SRM/AMM specifications and regulatory requirements.', image: images.process[1] },
  { step: '03', title: 'Repair & Modification', description: 'Precision execution with certified materials, tooling, and approved processes.', image: images.process[2] },
  { step: '04', title: 'Inspection & Release', description: 'NDT inspection, dimensional verification, and complete documentation.', image: images.process[3] },
];

export default function ProcessSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="section-light">
      <div className="section-pad">
        <div className="site-container">
          <SectionHeader
            label="Process"
            title="How we work"
            description="A systematic approach ensuring quality, safety, and compliance at every stage."
            light
          />

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-0">
              {steps.map((item, i) => (
                <ScrollReveal key={item.step} delay={i * 0.05}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`w-full text-left py-8 transition-colors ${i < steps.length - 1 ? 'border-b border-black/[0.08]' : ''} ${active === i ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                  >
                    <p className="font-mono text-[11px] text-technical mb-3">{item.step}</p>
                    <h3 className="font-heading text-xl text-graphite mb-2">{item.title}</h3>
                    <p className="body-lg !text-muted">{item.description}</p>
                  </button>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal className="sticky top-32" delay={0.1}>
              <img
                src={steps[active].image}
                alt={steps[active].title}
                className="w-full aspect-[4/5] object-cover transition-opacity duration-500"
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
