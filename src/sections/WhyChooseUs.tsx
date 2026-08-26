import SectionHeader from '../components/ui/SectionHeader';
import { images } from '../assets/images';

const reasons = [
  { title: 'Certified Excellence', description: 'FAA and international aviation standards compliance.' },
  { title: 'Fast Turnaround', description: 'Efficient processes to minimize aircraft downtime.' },
  { title: 'Expert Team', description: '20+ years of combined aviation experience.' },
  { title: 'Extensive Inventory', description: '50,000+ certified parts ready for delivery.' },
  { title: 'Global Reach', description: 'Serving clients worldwide with reliable service.' },
  { title: 'Quality Guaranteed', description: 'Premium materials and precision craftsmanship.' },
];

export default function WhyChooseUs() {
  return (
    <section className="section-muted">
      <div className="section-pad">
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <img
                src={images.whyChoose}
                alt="Aircraft maintenance hangar"
                className="w-full aspect-[4/3] object-cover mb-8 lg:mb-0"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = '1';
                    target.src = '/images/services/aircraft-structural-repair.jpg';
                  }
                }}
              />
            </div>
            <div>
              <SectionHeader
                label="Why UR Aerotech"
                title="Built on precision and trust"
                description="Decades of experience delivering unmatched structural repair services."
              />
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                {reasons.map((r) => (
                  <div key={r.title}>
                    <h3 className="font-heading text-base text-white mb-1.5">{r.title}</h3>
                    <p className="text-sm text-steel leading-relaxed">{r.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
