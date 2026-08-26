import mongoose, { Document, Schema } from 'mongoose';

export interface ISiteSettings extends Document {
  key: string;
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    image: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    mission: string;
    vision: string;
    history: string;
    values: { title: string; description: string }[];
  };
  statistics: { label: string; value: string; suffix?: string }[];
  certifications: { title: string; description: string; validUntil?: string }[];
  contact: {
    email: string;
    phones: string[];
    address: string;
    mapUrl: string;
    hours: { day: string; hours: string }[];
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  navigation: { label: string; href: string; children?: { label: string; href: string }[] }[];
  footer: {
    tagline: string;
    copyright: string;
    socialLinks: { platform: string; url: string }[];
  };
}

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    key: { type: String, default: 'main', unique: true },
    hero: {
      eyebrow: String,
      headline: String,
      subheadline: String,
      image: String,
      ctaPrimary: String,
      ctaSecondary: String,
    },
    about: {
      mission: String,
      vision: String,
      history: String,
      values: [{ title: String, description: String }],
    },
    statistics: [{ label: String, value: String, suffix: String }],
    certifications: [{ title: String, description: String, validUntil: String }],
    contact: {
      email: String,
      phones: [String],
      address: String,
      mapUrl: String,
      hours: [{ day: String, hours: String }],
    },
    seo: {
      title: String,
      description: String,
      keywords: [String],
      ogImage: String,
    },
    navigation: [
      {
        label: String,
        href: String,
        children: [{ label: String, href: String }],
      },
    ],
    footer: {
      tagline: String,
      copyright: String,
      socialLinks: [{ platform: String, url: String }],
    },
  },
  { timestamps: true }
);

export const SiteSettings = mongoose.model<ISiteSettings>('SiteSettings', siteSettingsSchema);
