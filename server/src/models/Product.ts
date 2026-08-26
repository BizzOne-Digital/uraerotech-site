import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  sku: string;
  partNumber?: string;
  manufacturer?: string;
  category: mongoose.Types.ObjectId;
  description: string;
  specifications: { key: string; value: string }[];
  condition: 'new' | 'overhauled' | 'serviceable' | 'as-removed';
  saleOrRental: 'sale' | 'rental' | 'both';
  quantity: number;
  availability: 'in-stock' | 'low-stock' | 'out-of-stock' | 'on-order';
  price?: number;
  showPrice: boolean;
  quoteOnly: boolean;
  featured: boolean;
  images: { url: string; publicId: string; alt?: string }[];
  documents: { name: string; url: string; publicId: string }[];
  certifications?: string;
  seoTitle?: string;
  seoDescription?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    sku: { type: String, required: true, unique: true, uppercase: true },
    partNumber: { type: String, trim: true, index: true },
    manufacturer: { type: String, trim: true, index: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String, required: true },
    specifications: [{ key: String, value: String }],
    condition: {
      type: String,
      enum: ['new', 'overhauled', 'serviceable', 'as-removed'],
      default: 'serviceable',
    },
    saleOrRental: { type: String, enum: ['sale', 'rental', 'both'], default: 'sale' },
    quantity: { type: Number, default: 0, min: 0 },
    availability: {
      type: String,
      enum: ['in-stock', 'low-stock', 'out-of-stock', 'on-order'],
      default: 'in-stock',
    },
    price: { type: Number, min: 0 },
    showPrice: { type: Boolean, default: false },
    quoteOnly: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    images: [{ url: String, publicId: String, alt: String }],
    documents: [{ name: String, url: String, publicId: String }],
    certifications: String,
    seoTitle: String,
    seoDescription: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', sku: 'text', partNumber: 'text', manufacturer: 'text' });

export const Product = mongoose.model<IProduct>('Product', productSchema);
