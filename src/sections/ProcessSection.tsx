import SectionHeader from '../components/ui/SectionHeader';
import { images } from '../assets/images';

const steps = [
  { step: '01', title: 'Assessment', description: 'Damage evaluation, documentation, and preliminary repair scheme development.' },
  { step: '02', title: 'Engineering Review', description: 'Structural analysis per SRM/AMM specifications and regulatory requirements.' },
  { step: '03', title: 'Repair & Modification', description: 'Precision execution with certified materials, tooling, and approved processes.' },
  { step: '04', title: 'Inspection & Release', description: 'NDT inspection, dimensional verification, and complete documentation.' },
];

export default function ProcessSection() {
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
                <div key={item.step} className={`py-8 ${i < steps.length - 1 ? 'border-b border-black/[0.08]' : ''}`}>
                  <p className="font-mono text-[11px] text-technical mb-3">{item.step}</p>
                  <h3 className="font-heading text-xl text-graphite mb-2">{item.title}</h3>
                  <p className="body-lg !text-muted">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="sticky top-32">
              <img
                src={images.inspection}
                alt="Aircraft inspection and structural assessment"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
