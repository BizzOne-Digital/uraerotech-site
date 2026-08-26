import Button from '../components/ui/Button';
import { images } from '../assets/images';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden">
      <img src={images.cta} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden />
      <div className="absolute inset-0 bg-graphite/85" />
      <div className="relative section-pad">
        <div className="site-container text-center max-w-2xl mx-auto">
          <p className="eyebrow mb-5">Get Started</p>
          <h2 className="display-title text-[clamp(2rem,4vw,3rem)] text-white mb-6">
            Ready to discuss your repair needs?
          </h2>
          <p className="body-lg mb-10">
            Contact our team for structural repairs, modifications, or parts inquiries.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/quote" variant="fill">Request a Quote</Button>
            <Button to="/contact" variant="outline">Contact Us</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
