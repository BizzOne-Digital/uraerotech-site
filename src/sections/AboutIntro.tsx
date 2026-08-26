import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import { images } from '../assets/images';

const defaultAbout = {
  mission: 'To provide world-class aircraft structural repair services and parts, ensuring the highest standards of safety, quality, and reliability for our clients in the aviation industry.',
  vision: 'To be the global leader in aircraft structural repair and modification services, recognized for our innovation, expertise, and unwavering commitment to safety.',
};

export default function AboutIntro({
  mission = defaultAbout.mission,
  vision = defaultAbout.vision,
}: {
  mission?: string;
  vision?: string;
}) {
  return (
    <section className="section-light">
      <div className="section-pad">
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={images.about}
                alt="Aviation engineer inspecting aircraft structure"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeader
                label="About"
                title="Excellence in aircraft structural repair"
                light
              />
              <div className="space-y-8">
                <div>
                  <h3 className="font-heading text-lg text-graphite mb-3">Mission</h3>
                  <p className="body-lg !text-muted">{mission}</p>
                </div>
                <div>
                  <h3 className="font-heading text-lg text-graphite mb-3">Vision</h3>
                  <p className="body-lg !text-muted">{vision}</p>
                </div>
              </div>
              <div className="mt-10">
                <Button to="/about" variant="accent">Learn More</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
