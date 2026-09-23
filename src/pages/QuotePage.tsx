import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import SEO from '../components/ui/SEO';
import PageHero from '../components/ui/PageHero';
import { pageHero } from '../assets/images';
import { inquiryApi } from '../services';
import { getServices } from '../services/content';
import type { Service } from '../types';
import { IconArrowRight } from '../components/icons';

interface QuoteForm {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  accountType: 'individual' | 'business';
  service?: string;
  aircraftManufacturer?: string;
  aircraftModel?: string;
  partNumber?: string;
  requestType: 'service' | 'product' | 'general';
  urgency: 'standard' | 'urgent' | 'aog';
  isAOG: boolean;
  responseMethod: 'email' | 'phone' | 'both';
  message: string;
  consent: boolean;
}

export default function QuotePage() {
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');
  const [services, setServices] = useState<Service[]>([]);

  const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm<QuoteForm>({
    defaultValues: {
      accountType: 'individual',
      requestType: (searchParams.get('type') as QuoteForm['requestType']) || 'service',
      urgency: 'standard',
      responseMethod: 'email',
      service: searchParams.get('service') || '',
      consent: false,
    },
  });

  useEffect(() => {
    getServices().then(setServices);
    const service = searchParams.get('service');
    if (service) setValue('service', service);
  }, [searchParams, setValue]);

  const onSubmit = async (data: QuoteForm) => {
    try {
      setError('');
      const payload = { ...data, consent: true, product: searchParams.get('product') || undefined };
      const res = await inquiryApi.createQuote(payload);
      setReference(res.data.data.reference);
      setSubmitted(true);
    } catch {
      setError('Failed to submit quote request. Please try again or contact us directly.');
    }
  };

  if (submitted) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-midnight px-4">
        <div className="border border-gold/30 p-12 text-center max-w-lg w-full">
          <p className="font-mono text-[10px] uppercase tracking-widest text-gold mb-4">Quote Submitted</p>
          <h1 className="font-display text-2xl text-white mb-4">Thank You</h1>
          <p className="text-white/60 mb-6">Your quote request has been received. Our team will review it shortly.</p>
          <div className="border border-gold/20 p-4 mb-6">
            <p className="font-mono text-[10px] text-white/40">Reference Number</p>
            <p className="font-display text-2xl text-gold">{reference}</p>
          </div>
          <Link to="/contact" className="btn-hero-gold inline-flex justify-center">
            Contact Us
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <SEO title="Request a Quote — UR Aerotech" description="Submit a detailed quote request for aircraft structural repair or parts." />

      <PageHero
        eyebrow="Get a Quote"
        headline="Request a Detailed Quote"
        subheadline="Share your aircraft, service, or parts requirements — we respond with clear scope and timing."
        image={pageHero.quote}
        showStats={false}
      />

      <section className="bg-midnight border-t border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24">
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-6">
            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[9px] uppercase text-gold tracking-widest mb-2 block">Full Name *</label>
                <input {...register('fullName', { required: true })} className="input border-white/10 focus:border-gold/50" />
              </div>
              <div>
                <label className="font-mono text-[9px] uppercase text-gold tracking-widest mb-2 block">Email *</label>
                <input {...register('email', { required: true })} type="email" className="input border-white/10 focus:border-gold/50" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[9px] uppercase text-gold tracking-widest mb-2 block">Phone *</label>
                <input {...register('phone', { required: true })} className="input border-white/10 focus:border-gold/50" />
              </div>
              <div>
                <label className="font-mono text-[9px] uppercase text-gold tracking-widest mb-2 block">Company</label>
                <input {...register('company')} className="input border-white/10 focus:border-gold/50" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[9px] uppercase text-gold tracking-widest mb-2 block">Account Type</label>
                <select {...register('accountType')} className="input border-white/10 focus:border-gold/50">
                  <option value="individual">Individual</option>
                  <option value="business">Business</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[9px] uppercase text-gold tracking-widest mb-2 block">Request Type</label>
                <select {...register('requestType')} className="input border-white/10 focus:border-gold/50">
                  <option value="service">Service</option>
                  <option value="product">Product</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-mono text-[9px] uppercase text-gold tracking-widest mb-2 block">Service</label>
              <select {...register('service')} className="input border-white/10 focus:border-gold/50">
                <option value="">Select a service</option>
                {services.map((s) => (
                  <option key={s._id} value={s.slug}>{s.title}</option>
                ))}
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[9px] uppercase text-gold tracking-widest mb-2 block">Aircraft Manufacturer</label>
                <input {...register('aircraftManufacturer')} className="input border-white/10 focus:border-gold/50" placeholder="e.g. Boeing, Airbus" />
              </div>
              <div>
                <label className="font-mono text-[9px] uppercase text-gold tracking-widest mb-2 block">Aircraft Model</label>
                <input {...register('aircraftModel')} className="input border-white/10 focus:border-gold/50" placeholder="e.g. 737-800" />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="font-mono text-[9px] uppercase text-gold tracking-widest mb-2 block">Part Number</label>
                <input {...register('partNumber')} className="input border-white/10 focus:border-gold/50" />
              </div>
              <div>
                <label className="font-mono text-[9px] uppercase text-gold tracking-widest mb-2 block">Urgency</label>
                <select {...register('urgency')} className="input border-white/10 focus:border-gold/50">
                  <option value="standard">Standard</option>
                  <option value="urgent">Urgent</option>
                  <option value="aog">AOG</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[9px] uppercase text-gold tracking-widest mb-2 block">Response Method</label>
                <select {...register('responseMethod')} className="input border-white/10 focus:border-gold/50">
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-mono text-[9px] uppercase text-gold tracking-widest mb-2 block">Detailed Message *</label>
              <textarea {...register('message', { required: true })} className="textarea-field border-white/10 focus:border-gold/50" rows={5} />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input {...register('isAOG')} type="checkbox" className="w-4 h-4 accent-gold" />
              <span className="text-sm text-gold">AOG — Aircraft on Ground emergency</span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input {...register('consent', { required: true })} type="checkbox" className="w-4 h-4 accent-gold mt-1" />
              <span className="text-sm text-white/50">I consent to UR Aerotech processing my data to respond to this inquiry. *</span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-midnight text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-amber transition-colors disabled:opacity-60"
            >
              {isSubmitting ? 'Submitting…' : 'Submit Quote Request'}
              <IconArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
