import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import SEO from '../components/ui/SEO';
import PageHero from '../components/ui/PageHero';
import ScrollReveal from '../components/ui/ScrollReveal';
import CTASection from '../sections/CTASection';
import { IconPhone, IconMail, IconMapPin, IconClock, IconArrowRight, IconShield, IconCheck, IconGlobe, IconBolt } from '../components/icons';
import { pageHero } from '../assets/images';
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

const faqs = [
  { q: 'What is your typical response time?', a: 'General inquiries within one business day; urgent and AOG requests prioritized immediately.' },
  { q: 'Do you support international clients?', a: 'Yes — we coordinate repair and parts supply for operators and MROs worldwide.' },
  { q: 'Can I request a quote online?', a: 'Use our quote form with aircraft and service details for a tailored response.' },
  { q: 'What certifications do you follow?', a: 'Repairs align with FAA and EASA recognized processes and quality standards.' },
];

const contactCards = [
  { title: 'General Inquiries', email: 'info@uraerotech.com', phone: '+49 173 250 4540', icon: IconMail },
  { title: 'Parts & Tools', email: 'info@uraerotech.com', phone: '+49 173 250 4540', icon: IconShield },
  { title: 'Engineering Support', email: 'info@uraerotech.com', phone: '+49 173 249 8648', icon: IconCheck },
  { title: 'Emergency AOG Support', email: 'info@uraerotech.com', phone: '+49 173 250 4540', icon: IconBolt, urgent: true },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
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

      <PageHero
        eyebrow="Get in Touch"
        headline="Let's Keep Your Aircraft Flying"
        subheadline="Repair inquiries, parts requests, engineering support, and AOG coordination — our team is ready to help."
        image={pageHero.contact}
        showStats={false}
      />

      <section className="bg-midnight border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <ScrollReveal>
              {submitted ? (
                <div className="border border-gold/30 p-10 text-center">
                  <h2 className="font-display text-2xl text-gold mb-4">Message Sent</h2>
                  <p className="text-white/60 mb-6">Thank you — we will respond as soon as possible.</p>
                  <button type="button" onClick={() => setSubmitted(false)} className="btn-hero-ghost border-gold/40 text-gold">
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <h2 className="font-display text-xl text-white mb-2">Send Us an Inquiry</h2>
                  {error && <p className="text-red-400 text-sm">{error}</p>}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[9px] uppercase text-gold tracking-widest mb-2 block">Full Name *</label>
                      <input {...register('name', { required: true })} className="input border-white/10 focus:border-gold/50" />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase text-gold tracking-widest mb-2 block">Company</label>
                      <input {...register('company')} className="input border-white/10 focus:border-gold/50" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[9px] uppercase text-gold tracking-widest mb-2 block">Email *</label>
                      <input {...register('email', { required: true })} type="email" className="input border-white/10 focus:border-gold/50" />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase text-gold tracking-widest mb-2 block">Phone</label>
                      <input {...register('phone')} className="input border-white/10 focus:border-gold/50" />
                    </div>
                  </div>
                  <div>
                    <label className="font-mono text-[9px] uppercase text-gold tracking-widest mb-2 block">Subject *</label>
                    <input {...register('subject', { required: true })} className="input border-white/10 focus:border-gold/50" />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] uppercase text-gold tracking-widest mb-2 block">Message *</label>
                    <textarea {...register('message', { required: true })} className="textarea-field border-white/10 focus:border-gold/50" rows={5} />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input {...register('isAOG')} type="checkbox" className="w-4 h-4 accent-gold" />
                    <span className="text-sm text-gold">AOG — Aircraft on Ground emergency</span>
                  </label>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-midnight text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-amber transition-colors disabled:opacity-60"
                  >
                    {isSubmitting ? 'Sending…' : 'Submit Inquiry'}
                    <IconArrowRight size={16} />
                  </button>
                </form>
              )}
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="space-y-4">
              {contactCards.map((card) => (
                <div
                  key={card.title}
                  className={`flex gap-4 p-5 border ${card.urgent ? 'border-gold/50 bg-gold/5' : 'border-white/[0.08] bg-[#0d1522]'}`}
                >
                  <card.icon size={22} className="text-gold shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-medium text-sm mb-1">{card.title}</h3>
                    <a href={`mailto:${contact.email}`} className="block text-xs text-white/55 hover:text-gold">{contact.email}</a>
                    <a href={`tel:${card.phone.replace(/\s/g, '')}`} className="block text-xs text-white/55 hover:text-gold mt-1">{card.phone}</a>
                  </div>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-[#0d1522] border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-20">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-2xl text-white">A Worldwide Partner in Aviation Support</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { value: '20+', label: 'Years of Excellence', icon: IconShield },
              { value: '50+', label: 'Countries Served', icon: IconMapPin },
              { value: '24/7', label: 'Global Support', icon: IconPhone },
            ].map((s) => (
              <ScrollReveal key={s.label}>
                <s.icon size={28} className="text-gold mx-auto mb-3" />
                <p className="font-display text-2xl text-white">{s.value}</p>
                <p className="text-xs text-white/50 mt-1">{s.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-midnight border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-20 grid md:grid-cols-2 gap-12 md:divide-x md:divide-gold/20">
          <ScrollReveal className="md:pr-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-6">Operating Hours</p>
            {contact.hours.map((h) => (
              <div key={h.day} className="flex justify-between py-3 border-b border-white/[0.06] text-sm">
                <span className="text-white/50">{h.day}</span>
                <span className="text-white">{h.hours}</span>
              </div>
            ))}
            <p className="flex items-start gap-2 text-sm text-white/55 mt-6">
              <IconMapPin size={16} className="text-gold shrink-0" />
              {contact.address}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="md:pl-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-6">Response Times</p>
            <h3 className="font-display text-xl text-white mb-8">Fast Answers. Faster Solutions.</h3>
            {[
              { time: 'Within 1 Hour', label: 'Urgent / AOG', icon: IconBolt },
              { time: 'Within 4 Hours', label: 'General priority', icon: IconClock },
              { time: 'Within 1 Business Day', label: 'Technical quotes', icon: IconMail },
            ].map((r) => (
              <div key={r.label} className="flex gap-4 mb-6">
                <r.icon size={20} className="text-gold shrink-0" />
                <div>
                  <p className="text-white font-medium">{r.time}</p>
                  <p className="text-xs text-white/50">{r.label}</p>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-[#0d1522] border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-16 md:py-24 grid lg:grid-cols-2 gap-12">
          <ScrollReveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-4">FAQ</p>
            <h2 className="font-display text-2xl text-white mb-8">Quick Answers, Clear Support</h2>
            <div className="space-y-2">
              {faqs.map((item, i) => (
                <div key={item.q} className="border border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left text-sm text-white hover:bg-white/[0.03]"
                  >
                    {item.q}
                    <span className="text-gold text-lg">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && <p className="px-4 pb-4 text-sm text-white/55">{item.a}</p>}
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="hidden lg:flex items-center justify-center opacity-20">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold [writing-mode:vertical-rl] rotate-180">
              People · Expertise · Quality · Flight Ready
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-b border-white/[0.06] bg-midnight">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 py-10">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {['Certified Professionals', 'Quality', 'Global Network', 'Industry Compliant', 'Trusted Operators'].map((label) => (
              <span key={label} className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/45">
                <IconCheck size={14} className="text-gold" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Immediate Support"
        title="Need Immediate Aircraft Support?"
        description="Call for AOG coordination or submit a quote for planned maintenance."
        primaryLabel="Get a Quote"
        secondaryLabel="Call AOG Now"
        secondaryTo="tel:+491732504540"
      />
    </>
  );
}
