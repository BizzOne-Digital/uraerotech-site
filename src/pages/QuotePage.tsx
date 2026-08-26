import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import SEO from '../components/ui/SEO';
import Button from '../components/ui/Button';
import { inquiryApi, serviceApi } from '../services';
import type { Service } from '../types';

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
    serviceApi.getAll().then((r) => setServices(r.data.data)).catch(() => {});
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
      <section className="min-h-screen flex items-center justify-center bg-graphite section-padding">
        <div className="data-plate p-12 text-center max-w-lg">
          <p className="technical-label text-technical mb-4">Quote Submitted</p>
          <h1 className="heading-md mb-4">Thank You</h1>
          <p className="text-steel mb-6">Your quote request has been received. Our team will review it shortly.</p>
          <div className="data-plate p-4 mb-6">
            <p className="font-mono text-[10px] text-steel">Reference Number</p>
            <p className="font-heading text-2xl text-technical">{reference}</p>
          </div>
          <Button to="/dashboard" variant="primary">Track Your Request</Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <SEO title="Request a Quote — UR Aerotech" description="Submit a detailed quote request for aircraft structural repair or parts." />

      <section className="pt-32 pb-16 bg-navy">
        <div className="section-padding !pt-8">
          <div className="container-custom">
            <p className="technical-label text-technical mb-4">Quote Request</p>
            <h1 className="heading-xl mb-6">Request a Quote</h1>
            <p className="text-steel text-lg max-w-2xl">Fill out the form below and our team will respond with a detailed quote.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-graphite">
        <div className="container-custom max-w-3xl">
          <form onSubmit={handleSubmit(onSubmit)} className="data-plate p-8 space-y-6">
            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="technical-label block mb-2">Full Name *</label>
                <input {...register('fullName', { required: true })} className="input-field" />
              </div>
              <div>
                <label className="technical-label block mb-2">Email *</label>
                <input {...register('email', { required: true })} type="email" className="input-field" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="technical-label block mb-2">Phone *</label>
                <input {...register('phone', { required: true })} className="input-field" />
              </div>
              <div>
                <label className="technical-label block mb-2">Company</label>
                <input {...register('company')} className="input-field" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="technical-label block mb-2">Account Type</label>
                <select {...register('accountType')} className="input-field">
                  <option value="individual">Individual</option>
                  <option value="business">Business</option>
                </select>
              </div>
              <div>
                <label className="technical-label block mb-2">Request Type</label>
                <select {...register('requestType')} className="input-field">
                  <option value="service">Service</option>
                  <option value="product">Product</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>
            </div>

            <div>
              <label className="technical-label block mb-2">Service</label>
              <select {...register('service')} className="input-field">
                <option value="">Select a service</option>
                {services.map((s) => (
                  <option key={s._id} value={s.slug}>{s.title}</option>
                ))}
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="technical-label block mb-2">Aircraft Manufacturer</label>
                <input {...register('aircraftManufacturer')} className="input-field" placeholder="e.g. Boeing, Airbus" />
              </div>
              <div>
                <label className="technical-label block mb-2">Aircraft Model</label>
                <input {...register('aircraftModel')} className="input-field" placeholder="e.g. 737-800" />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="technical-label block mb-2">Part Number</label>
                <input {...register('partNumber')} className="input-field" />
              </div>
              <div>
                <label className="technical-label block mb-2">Urgency</label>
                <select {...register('urgency')} className="input-field">
                  <option value="standard">Standard</option>
                  <option value="urgent">Urgent</option>
                  <option value="aog">AOG</option>
                </select>
              </div>
              <div>
                <label className="technical-label block mb-2">Response Method</label>
                <select {...register('responseMethod')} className="input-field">
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>

            <div>
              <label className="technical-label block mb-2">Detailed Message *</label>
              <textarea {...register('message', { required: true })} className="textarea-field" rows={5} />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input {...register('isAOG')} type="checkbox" className="w-4 h-4 accent-amber" />
              <span className="text-sm text-amber">AOG — Aircraft on Ground emergency</span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input {...register('consent', { required: true })} type="checkbox" className="w-4 h-4 accent-technical mt-1" />
              <span className="text-sm text-steel">I consent to UR Aerotech processing my data to respond to this inquiry. *</span>
            </label>

            <Button type="submit" variant="amber" disabled={isSubmitting} className="w-full justify-center">
              {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
