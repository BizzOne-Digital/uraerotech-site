import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  slug: string;
  tagline: string;
  overview: string;
  whatWeDo: string;
  whyItMatters: string;
  capabilities: string[];
  process: { step: number; title: string; description: string }[];
  heroImage?: string;
  gallery: string[];
  order: number;
  isActive: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

const serviceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    tagline: { type: String, required: true },
    overview: { type: String, required: true },
    whatWeDo: { type: String, required: true },
    whyItMatters: { type: String, required: true },
    capabilities: [String],
    process: [{ step: Number, title: String, description: String }],
    heroImage: String,
    gallery: [String],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    seoTitle: String,
    seoDescription: String,
  },
  { timestamps: true }
);

export const Service = mongoose.model<IService>('Service', serviceSchema);
