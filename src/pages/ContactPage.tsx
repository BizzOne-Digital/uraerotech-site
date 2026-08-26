import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import SEO from '../components/ui/SEO';
import Button from '../components/ui/Button';
import { IconPhone, IconMail, IconMapPin, IconClock } from '../components/icons';
import { inquiryApi, settingsApi } from '../services';

interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  isAOG: boolean;
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [contact, setContact] = useState({
    email: 'info@uraerotech.com',
    phones: ['+49 173 250 4540', '+49 173 249 8648'],
    address: 'Gaterstr. 66B, 52538 Gangelt, Germany',
    mapUrl: 'https://maps.google.com/?q=Gaterstr.+66B,+52538+Gangelt,+Germany',
    hours: [
      { day: 'Monday – Friday', hours: '08:00 – 17:00' },
      { day: 'Saturday', hours: 'Closed' },
      { day: 'Sunday', hours: 'Closed' },
    ],
  });

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<ContactForm>();

  useEffect(() => {
    settingsApi.get().then((r) => {
      if (r.data.data.contact) setContact(r.data.data.contact);
    }).catch(() => {});
  }, []);

  const onSubmit = async (data: ContactForm) => {
    try {
      setError('');
      await inquiryApi.createContact(data as unknown as Record<string, unknown>);
      setSubmitted(true);
      reset();
    } catch {
      setError('Failed to send message. Please try again or call us directly.');
    }
  };

  return (
    <>
      <SEO title="Contact — UR Aerotech" description="Get in touch with UR Aerotech for aircraft structural repair inquiries." />

      <section className="pt-32 pb-16 bg-navy">
        <div className="section-padding !pt-8">
          <div className="container-custom">
            <p className="technical-label text-technical mb-4">Contact</p>
            <h1 className="heading-xl mb-6">Get In Touch</h1>
            <p className="text-steel text-lg max-w-2xl">
              Contact us for repair inquiries, parts requests, or general information.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-graphite">
        <div className="container-custom grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="data-plate p-6">
              <IconMail size={20} className="text-technical mb-3" />
              <p className="technical-label mb-2">Email</p>
              <a href={`mailto:${contact.email}`} className="text-offwhite hover:text-technical transition-colors">{contact.email}</a>
            </div>
            {contact.phones.map((phone) => (
              <div key={phone} className="data-plate p-6">
                <IconPhone size={20} className="text-technical mb-3" />
                <p className="technical-label mb-2">Phone</p>
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-offwhite hover:text-technical transition-colors">{phone}</a>
              </div>
            ))}
            <div className="data-plate p-6">
              <IconMapPin size={20} className="text-technical mb-3" />
              <p className="technical-label mb-2">Address</p>
              <p className="text-offwhite">{contact.address}</p>
              <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer" className="text-technical text-sm mt-2 inline-block hover:underline">
                View on Google Maps →
              </a>
            </div>
            <div className="data-plate p-6">
              <IconClock size={20} className="text-technical mb-3" />
              <p className="technical-label mb-2">Business Hours</p>
              {contact.hours.map((h) => (
                <div key={h.day} className="flex justify-between text-sm py-1">
                  <span className="text-steel">{h.day}</span>
                  <span className="text-offwhite">{h.hours}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <div className="data-plate p-12 text-center">
                <h2 className="heading-md text-technical mb-4">Message Sent</h2>
                <p className="text-steel mb-6">Thank you for contacting us. We will respond within one business day.</p>
                <Button onClick={() => setSubmitted(false)} variant="secondary">Send Another Message</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="data-plate p-8 space-y-6">
                <h2 className="font-heading text-xl mb-2">Send a Message</h2>
                {error && <p className="text-red-400 text-sm">{error}</p>}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="technical-label block mb-2">Full Name *</label>
                    <input {...register('name', { required: true })} className="input-field" />
                  </div>
                  <div>
                    <label className="technical-label block mb-2">Email *</label>
                    <input {...register('email', { required: true })} type="email" className="input-field" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="technical-label block mb-2">Phone</label>
                    <input {...register('phone')} className="input-field" />
                  </div>
                  <div>
                    <label className="technical-label block mb-2">Company</label>
                    <input {...register('company')} className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="technical-label block mb-2">Subject *</label>
                  <input {...register('subject', { required: true })} className="input-field" />
                </div>
                <div>
                  <label className="technical-label block mb-2">Message *</label>
                  <textarea {...register('message', { required: true })} className="textarea-field" rows={5} />
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input {...register('isAOG')} type="checkbox" className="w-4 h-4 accent-amber" />
                  <span className="text-sm text-amber">This is an AOG (Aircraft on Ground) emergency inquiry</span>
                </label>
                <Button type="submit" variant="amber" disabled={isSubmitting} className="w-full justify-center">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
