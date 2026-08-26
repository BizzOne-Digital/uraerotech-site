import mongoose, { Document, Schema } from 'mongoose';

export interface IContactMessage extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  isAOG: boolean;
  isRead: boolean;
  adminNotes?: string;
  createdAt: Date;
}

const contactSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    company: String,
    subject: { type: String, required: true },
    message: { type: String, required: true },
    isAOG: { type: Boolean, default: false },
    isRead: { type: Boolean, default: false },
    adminNotes: String,
  },
  { timestamps: true }
);

export const ContactMessage = mongoose.model<IContactMessage>('ContactMessage', contactSchema);
