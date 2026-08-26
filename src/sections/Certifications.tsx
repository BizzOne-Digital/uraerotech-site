import SectionHeader from '../components/ui/SectionHeader';
import { images } from '../assets/images';

const defaultCerts = [
  { title: 'FAA Standards Compliance', description: 'All repairs performed to FAA and international aviation standards.' },
  { title: 'EASA Recognition', description: 'European Aviation Safety Agency recognized repair capabilities.' },
];

export default function Certifications({
  certifications = defaultCerts,
}: {
  certifications?: { title: string; description: string }[];
}) {
  return (
    <section className="section-dark border-t border-white/[0.06]">
      <div className="section-pad">
        <div className="site-container grid lg:grid-cols-2 gap-12 items-center">
          <img
            src={images.certification}
            alt="Aviation certification and quality standards"
            className="w-full aspect-[4/3] object-cover"
          />
          <div>
            <SectionHeader label="Certifications" title="Regulatory compliance & expertise" />
            <div className="space-y-6">
              {certifications.map((c) => (
                <div key={c.title} className="border-l-2 border-technical pl-5">
                  <h3 className="font-heading text-lg text-white mb-1">{c.title}</h3>
                  <p className="text-sm text-steel leading-relaxed">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
