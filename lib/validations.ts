import { z } from 'zod';

export const patientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  mobileNumber: z.string().regex(/^[6-9]\d{9}$/, 'Invalid mobile number'),
  whatsappSameAsMobile: z.boolean(),
  whatsappNumber: z.string().regex(/^[6-9]\d{9}$/, 'Invalid WhatsApp number'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(10, 'Address must be at least 10 characters').max(500),
}).refine(
  (data) => {
    if (data.whatsappSameAsMobile) {
      return data.whatsappNumber === data.mobileNumber;
    }
    return true;
  },
  { message: 'WhatsApp number must match mobile number', path: ['whatsappNumber'] }
);

export const sessionSchema = z.object({
  patientId: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
  timeSlot: z.string().min(1, 'Time slot is required'),
  // Fixed: Use message field instead of errorMap
  sessionType: z.enum(['in-person', 'online'], {
    message: 'Please select a session type',
  }),
});

export const fullSessionSchema = patientSchema.merge(sessionSchema);
