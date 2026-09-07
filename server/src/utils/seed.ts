import bcrypt from 'bcryptjs';
import { connectDB } from '../config/database.js';
import { User } from '../models/User.js';
import { Category } from '../models/Category.js';
import { Service } from '../models/Service.js';
import { Industry } from '../models/Industry.js';
import { SiteSettings } from '../models/SiteSettings.js';
import { Product } from '../models/Product.js';
import { slugify } from './helpers.js';

const seed = async () => {
  await connectDB();
  console.log('Seeding database...');

  // Admin user
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@uraerotech.com';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!';
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      email: adminEmail,
      password: await bcrypt.hash(adminPassword, 12),
      firstName: 'Admin',
      lastName: 'User',
      role: 'superadmin',
      isVerified: true,
      isActive: true,
    });
    console.log(`Admin created: ${adminEmail}`);
  }

  // Categories
  const categories = [
    { name: 'Aircraft Structural Components', slug: 'structural-components', order: 1 },
    { name: 'Certified Aircraft Parts', slug: 'certified-parts', order: 2 },
    { name: 'Aviation Tools', slug: 'aviation-tools', order: 3 },
    { name: 'Precision Instruments', slug: 'precision-instruments', order: 4 },
    { name: 'Tool Rentals', slug: 'tool-rentals', order: 5 },
    { name: 'Avionics', slug: 'avionics', order: 6 },
    { name: 'Landing Gear Components', slug: 'landing-gear', order: 7 },
    { name: 'Interior Fittings', slug: 'interior-fittings', order: 8 },
    { name: 'Other Aviation Equipment', slug: 'other-equipment', order: 9 },
  ];

  for (const cat of categories) {
    await Category.findOneAndUpdate({ slug: cat.slug }, cat, { upsert: true });
  }
  console.log('Categories seeded');

  // Services
  const services = [
    {
      title: 'Aircraft Structural Repair',
      slug: 'aircraft-structural-repair',
      tagline: 'Keep your aircraft safe, reliable, and airworthy with expert structural repairs.',
      overview: 'Our certified structural repair team delivers precision repairs for all types of aircraft damage — from minor skin repairs to major structural restoration. Every repair is performed to manufacturer specifications and regulatory standards.',
      whatWeDo: 'We assess structural damage, develop repair schemes, fabricate replacement parts, and execute repairs using certified materials and processes. Our capabilities include corrosion treatment, doubler installations, frame repairs, and composite structural repairs.',
      whyItMatters: 'Structural integrity is fundamental to flight safety. Compromised structure can lead to catastrophic failure. Professional repair ensures your aircraft remains airworthy and maintains its value.',
      capabilities: ['Damage assessment & reporting', 'Sheet metal repair', 'Composite repair', 'Corrosion treatment', 'Doubler installations', 'Frame & spar repair', 'Leading edge restoration', 'Bird strike repair'],
      process: [
        { step: 1, title: 'Assessment', description: 'Thorough damage evaluation and documentation' },
        { step: 2, title: 'Engineering Review', description: 'Repair scheme development per SRM/AMM' },
        { step: 3, title: 'Repair Execution', description: 'Certified materials and precision workmanship' },
        { step: 4, title: 'Inspection & Documentation', description: 'NDT, dimensional checks, and release paperwork' },
      ],
      heroImage: '/images/services/aircraft-structural-repair.jpg',
      gallery: [
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
        'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
      ],
      order: 1,
    },
    {
      title: 'Aircraft Structure Modification',
      slug: 'aircraft-structure-modification',
      tagline: "Tailored structural modifications to enhance your aircraft's performance and capabilities.",
      overview: 'We design and implement structural modifications that meet regulatory requirements while achieving your operational objectives. From STC compliance to custom reinforcement solutions.',
      whatWeDo: 'Our engineering team develops modification packages including structural analysis, material selection, fabrication drawings, and installation procedures. We handle the complete modification lifecycle.',
      whyItMatters: 'Structural modifications enable aircraft to meet evolving operational requirements, extend service life, and comply with updated airworthiness directives.',
      capabilities: ['STC compliance', 'Reinforcement doublers', 'Cargo door modifications', 'Antenna installations', 'Interior structural changes', 'Weight reduction programs'],
      process: [
        { step: 1, title: 'Requirements Analysis', description: 'Define modification objectives and constraints' },
        { step: 2, title: 'Engineering Design', description: 'Structural analysis and drawing package' },
        { step: 3, title: 'Fabrication & Installation', description: 'Precision manufacturing and fitment' },
        { step: 4, title: 'Certification', description: 'Documentation and regulatory approval' },
      ],
      heroImage: '/images/services/aircraft-structure-modification.jpg',
      order: 2,
    },
    {
      title: 'Aircraft Service Bulletin Compliance',
      slug: 'service-bulletin-compliance',
      tagline: 'Keep your aircraft safe, up to date, and fully compliant.',
      overview: 'We ensure your fleet meets all applicable Service Bulletins (SBs) and Airworthiness Directives (ADs) with documented compliance and traceable records.',
      whatWeDo: 'Our team tracks applicable SBs and ADs, plans compliance work, sources required parts, and executes modifications per manufacturer instructions with full documentation.',
      whyItMatters: 'Non-compliance with mandatory airworthiness directives can ground your aircraft and create liability. Proactive compliance protects safety and operational continuity.',
      capabilities: ['SB/AD tracking', 'Compliance planning', 'Parts sourcing', 'Modification execution', 'Record keeping', 'Fleet compliance audits'],
      process: [
        { step: 1, title: 'Compliance Review', description: 'Identify applicable SBs and ADs' },
        { step: 2, title: 'Work Planning', description: 'Schedule and resource allocation' },
        { step: 3, title: 'Execution', description: 'Perform required modifications' },
        { step: 4, title: 'Documentation', description: 'Compliance records and sign-off' },
      ],
      heroImage: '/images/services/service-bulletin-compliance.jpg',
      order: 3,
    },
    {
      title: 'Aircraft Parts Supply',
      slug: 'aircraft-parts-supply',
      tagline: 'Reliable sourcing of certified aircraft parts from trusted manufacturers.',
      overview: 'Access our extensive inventory of 50,000+ certified aircraft parts. We source OEM and PMA parts with full traceability documentation.',
      whatWeDo: 'We maintain a comprehensive parts inventory, source hard-to-find components, and provide certification documentation with every part sold.',
      whyItMatters: 'AOG situations demand immediate parts availability. Our inventory and sourcing network minimize downtime and keep your fleet operational.',
      capabilities: ['OEM parts sourcing', 'PMA parts supply', 'Traceability documentation', 'AOG parts expediting', 'Exchange programs', 'Consignment inventory'],
      process: [
        { step: 1, title: 'Parts Inquiry', description: 'Submit part number and requirements' },
        { step: 2, title: 'Sourcing', description: 'Locate from inventory or supplier network' },
        { step: 3, title: 'Verification', description: 'Certification and condition check' },
        { step: 4, title: 'Delivery', description: 'Worldwide shipping with documentation' },
      ],
      heroImage: '/images/services/aircraft-parts-supply.jpg',
      order: 4,
    },
    {
      title: 'Aviation Tools Sales',
      slug: 'aviation-tools-sales',
      tagline: 'Premium tools and equipment for professional aircraft maintenance.',
      overview: 'Professional-grade aviation tools from leading manufacturers. Calibrated, certified, and ready for precision maintenance work.',
      whatWeDo: 'We supply specialized aviation tooling including torque wrenches, rivet guns, sheet metal tools, composite repair kits, and precision measuring instruments.',
      whyItMatters: 'Proper tooling is essential for regulatory compliance and quality workmanship. Using certified tools ensures repairs meet specification.',
      capabilities: ['Specialized aviation tools', 'Calibrated instruments', 'Composite repair kits', 'Sheet metal tooling', 'NDT equipment', 'Tool calibration services'],
      process: [
        { step: 1, title: 'Consultation', description: 'Identify tooling requirements' },
        { step: 2, title: 'Selection', description: 'Recommend appropriate tools' },
        { step: 3, title: 'Procurement', description: 'Source from authorized distributors' },
        { step: 4, title: 'Delivery', description: 'Calibrated and ready to use' },
      ],
      heroImage: '/images/services/aviation-tools-sales.jpg',
      order: 5,
    },
    {
      title: 'Aviation Tool Rental',
      slug: 'aviation-tool-rental',
      tagline: 'Flexible tool solutions for short-term projects and specialized maintenance.',
      overview: 'Rent specialized aviation tools for project-based work without capital investment. Full calibration certificates included.',
      whatWeDo: 'Our rental fleet includes specialized tooling for structural repairs, composite work, and engine maintenance. Flexible terms from daily to monthly.',
      whyItMatters: 'Tool rental eliminates capital expenditure for infrequent operations while ensuring access to specialized equipment when needed.',
      capabilities: ['Short-term rentals', 'Long-term leasing', 'Calibration included', 'Delivery & pickup', 'Damage waiver options', 'Technical support'],
      process: [
        { step: 1, title: 'Tool Request', description: 'Specify tools and rental period' },
        { step: 2, title: 'Availability Check', description: 'Confirm fleet availability' },
        { step: 3, title: 'Agreement', description: 'Rental terms and insurance' },
        { step: 4, title: 'Delivery', description: 'Calibrated tools delivered on-site' },
      ],
      heroImage: '/images/services/aviation-tool-rental.jpg',
      order: 6,
    },
  ];

  for (const svc of services) {
    await Service.findOneAndUpdate({ slug: svc.slug }, svc, { upsert: true });
  }
  console.log('Services seeded');

  // Industries
  const industries = [
    {
      title: 'Commercial Aviation',
      slug: 'commercial-aviation',
      description: 'Supporting airlines and MRO facilities with structural repairs, modifications, and parts supply for commercial fleet operations.',
      capabilities: ['Fleet structural repairs', 'AOG response', 'SB/AD compliance', 'Line maintenance support', 'Heavy check assistance'],
      image: '/images/industries/commercial-aviation.jpg',
      order: 1,
    },
    {
      title: 'Private & General Aviation',
      slug: 'private-general-aviation',
      description: 'Expert structural services for business jets, turboprops, and general aviation aircraft owners and operators.',
      capabilities: ['Business jet repairs', 'Annual inspection support', 'Modification STCs', 'Parts supply', 'Damage assessment'],
      image: '/images/industries/private-general-aviation.jpg',
      order: 2,
    },
    {
      title: 'Cargo & Freight',
      slug: 'cargo-freight',
      description: 'Structural solutions for cargo operators including freighter conversions, door modifications, and heavy-use repairs.',
      capabilities: ['Freighter conversions', 'Cargo door mods', 'Floor reinforcement', 'Heavy landing repairs', 'Fleet maintenance'],
      image: '/images/industries/cargo-freight.jpg',
      order: 3,
    },
    {
      title: 'Military & Defense',
      slug: 'military-defense',
      description: 'Structural repair and modification services for military aircraft meeting defense quality standards.',
      capabilities: ['Military airframe repair', 'Field repair kits', 'Modification programs', 'Specialized tooling', 'Expedited delivery'],
      image: '/images/industries/military-defense.jpg',
      order: 4,
    },
    {
      title: 'Helicopter Services',
      slug: 'helicopter-services',
      description: 'Rotorcraft structural repairs including airframe, transmission mounts, and composite blade repairs.',
      capabilities: ['Airframe repairs', 'Transmission support', 'Composite blade repair', 'Landing gear service', 'Parts supply'],
      image: '/images/industries/helicopter-services.jpg',
      order: 5,
    },
    {
      title: 'Aerospace Manufacturing',
      slug: 'aerospace-manufacturing',
      description: 'Supporting aerospace manufacturers with structural components, tooling, and precision fabrication services.',
      capabilities: ['Component fabrication', 'Tooling supply', 'Quality documentation', 'Prototype support', 'Production assistance'],
      image: '/images/industries/aerospace-manufacturing.jpg',
      order: 6,
    },
  ];

  for (const ind of industries) {
    await Industry.findOneAndUpdate({ slug: ind.slug }, ind, { upsert: true });
  }
  console.log('Industries seeded');

  // Site Settings
  await SiteSettings.findOneAndUpdate(
    { key: 'main' },
    {
      hero: {
        eyebrow: 'EXPERT AIRCRAFT STRUCTURE REPAIR',
        headline: 'Structure Repair & Sales',
        subheadline:
          '20+ Years of Excellence in Aircraft Structural Repairs and Modifications. Supplying certified aircraft parts, aviation tools, and industry-leading services — all in one place.',
        image: '/images/hero-hangar.jpg',
        ctaPrimary: 'Get a Quote',
        ctaSecondary: 'Browse Inventory',
      },
      about: {
        mission:
          'To provide world-class aircraft structural repair services and parts, ensuring the highest standards of safety, quality, and reliability for our clients in the aviation industry.',
        vision:
          'To be the global leader in aircraft structural repair and modification services, recognized for our innovation, expertise, and unwavering commitment to safety.',
        history:
          'With over 20 years of experience in aircraft structural repair and modification, UR Aerotech has built a reputation for excellence in the aviation maintenance industry.',
        values: [
          { title: 'Safety First', description: 'Every decision prioritizes flight safety and regulatory compliance.' },
          { title: 'Quality Excellence', description: 'Precision workmanship using certified materials and processes.' },
          { title: 'Customer Focus', description: 'Responsive service tailored to your operational requirements.' },
          { title: 'Innovation', description: 'Continuous improvement in repair techniques and capabilities.' },
          { title: 'Integrity', description: 'Transparent communication and honest assessments.' },
          { title: 'Reliability', description: 'Consistent delivery on time and to specification.' },
        ],
      },
      statistics: [
        { label: 'Years of Experience', value: '20', suffix: '+' },
        { label: 'Projects Completed', value: '5000', suffix: '+' },
        { label: 'Satisfied Clients', value: '1000', suffix: '+' },
        { label: 'Parts in Inventory', value: '50', suffix: 'K+' },
      ],
      certifications: [
        { title: 'FAA Standards Compliance', description: 'All repairs performed to FAA and international aviation standards.' },
        { title: 'EASA Recognition', description: 'European Aviation Safety Agency recognized repair capabilities.' },
      ],
      contact: {
        email: 'info@uraerotech.com',
        phones: ['+49 173 250 4540', '+49 173 249 8648'],
        address: 'Gaterstr. 66B, 52538 Gangelt, Germany',
        mapUrl: 'https://maps.google.com/?q=Gaterstr.+66B,+52538+Gangelt,+Germany',
        hours: [
          { day: 'Monday – Friday', hours: '08:00 – 17:00' },
          { day: 'Saturday', hours: 'Closed' },
          { day: 'Sunday', hours: 'Closed' },
        ],
      },
      seo: {
        title: 'UR Aerotech — Aircraft Structural Repair & Aviation Parts',
        description:
          '20+ years of excellence in aircraft structural repairs, modifications, and certified parts supply. Expert aviation maintenance services in Germany.',
        keywords: ['aircraft structural repair', 'aviation parts', 'aircraft modification', 'aviation tools'],
      },
      footer: {
        tagline: 'Excellence in Aircraft Structural Repair',
        copyright: `© ${new Date().getFullYear()} UR Aerotech GmbH. All rights reserved.`,
        socialLinks: [],
      },
    },
    { upsert: true }
  );
  console.log('Site settings seeded');

  // Sample products
  const structuralCat = await Category.findOne({ slug: 'structural-components' });
  const toolsCat = await Category.findOne({ slug: 'aviation-tools' });

  if (structuralCat && toolsCat) {
    const sampleProducts = [
      {
        name: 'Boeing 737 Wing Skin Panel',
        slug: 'boeing-737-wing-skin-panel',
        sku: 'UR-WS-737-001',
        partNumber: '65C12345-1',
        manufacturer: 'Boeing',
        category: structuralCat._id,
        description: 'Certified wing skin panel for Boeing 737 series aircraft. Serviceable condition with full traceability.',
        condition: 'serviceable' as const,
        saleOrRental: 'sale' as const,
        quantity: 3,
        availability: 'in-stock' as const,
        quoteOnly: true,
        featured: true,
        images: [{ url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80', publicId: 'sample-1', alt: 'Aircraft wing skin panel' }],
      },
      {
        name: 'Airbus A320 Fuselage Frame Section',
        slug: 'airbus-a320-fuselage-frame',
        sku: 'UR-FF-A320-002',
        partNumber: 'D531-12345',
        manufacturer: 'Airbus',
        category: structuralCat._id,
        description: 'Fuselage frame section for Airbus A320 family. Overhauled condition with EASA Form 1.',
        condition: 'overhauled' as const,
        saleOrRental: 'sale' as const,
        quantity: 1,
        availability: 'in-stock' as const,
        quoteOnly: true,
        featured: true,
        images: [{ url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80', publicId: 'sample-2', alt: 'Aircraft fuselage frame section' }],
      },
      {
        name: 'Professional Rivet Gun Set',
        slug: 'professional-rivet-gun-set',
        sku: 'UR-TG-RVG-003',
        partNumber: 'CHERRY-G704B',
        manufacturer: 'Cherry Aerospace',
        category: toolsCat._id,
        description: 'Complete rivet gun set for aircraft sheet metal work. Includes bucking bars and rivet sets.',
        condition: 'new' as const,
        saleOrRental: 'both' as const,
        quantity: 5,
        availability: 'in-stock' as const,
        quoteOnly: false,
        showPrice: false,
        featured: true,
        images: [{ url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', publicId: 'sample-3', alt: 'Aviation rivet gun tool set' }],
      },
    ];

    for (const prod of sampleProducts) {
      await Product.findOneAndUpdate({ slug: prod.slug }, prod, { upsert: true });
    }
    console.log('Sample products seeded');
  }

  console.log('Seed completed successfully!');
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
