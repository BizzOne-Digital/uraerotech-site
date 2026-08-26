import mongoose, { Document, Schema } from 'mongoose';

export interface IIndustry extends Document {
  title: string;
  slug: string;
  description: string;
  capabilities: string[];
  image?: string;
  order: number;
  isActive: boolean;
}

const industrySchema = new Schema<IIndustry>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    capabilities: [String],
    image: String,
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Industry = mongoose.model<IIndustry>('Industry', industrySchema);
