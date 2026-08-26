import mongoose, { Document, Schema } from 'mongoose';

export type QuoteStatus =
  | 'new'
  | 'under-review'
  | 'contacted'
  | 'quote-prepared'
  | 'quote-sent'
  | 'approved'
  | 'declined'
  | 'closed';

export interface IQuoteRequest extends Document {
  reference: string;
  user?: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  accountType: 'individual' | 'business';
  service?: string;
  product?: mongoose.Types.ObjectId;
  aircraftManufacturer?: string;
  aircraftModel?: string;
  partNumber?: string;
  requestType: 'service' | 'product' | 'general';
  urgency: 'standard' | 'urgent' | 'aog';
  isAOG: boolean;
  responseMethod: 'email' | 'phone' | 'both';
  message: string;
  attachments: { name: string; url: string; publicId: string }[];
  status: QuoteStatus;
  statusHistory: { status: QuoteStatus; note?: string; changedBy?: mongoose.Types.ObjectId; changedAt: Date }[];
  adminNotes?: string;
  consent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const quoteSchema = new Schema<IQuoteRequest>(
  {
    reference: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: String,
    accountType: { type: String, enum: ['individual', 'business'], default: 'individual' },
    service: String,
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    aircraftManufacturer: String,
    aircraftModel: String,
    partNumber: String,
    requestType: { type: String, enum: ['service', 'product', 'general'], default: 'service' },
    urgency: { type: String, enum: ['standard', 'urgent', 'aog'], default: 'standard' },
    isAOG: { type: Boolean, default: false },
    responseMethod: { type: String, enum: ['email', 'phone', 'both'], default: 'email' },
    message: { type: String, required: true },
    attachments: [{ name: String, url: String, publicId: String }],
    status: {
      type: String,
      enum: ['new', 'under-review', 'contacted', 'quote-prepared', 'quote-sent', 'approved', 'declined', 'closed'],
      default: 'new',
    },
    statusHistory: [
      {
        status: String,
        note: String,
        changedBy: { type: Schema.Types.ObjectId, ref: 'User' },
        changedAt: { type: Date, default: Date.now },
      },
    ],
    adminNotes: String,
    consent: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const QuoteRequest = mongoose.model<IQuoteRequest>('QuoteRequest', quoteSchema);
