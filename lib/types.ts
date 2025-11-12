export interface Patient {
  id: string;
  name: string;
  mobileNumber: string;
  whatsappNumber: string;
  email: string;
  address: string;
  createdAt: Date;
}

export interface Session {
  id: string;
  patientId: string;
  date: Date;
  timeSlot: string;
  sessionType: 'in-person' | 'online';
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export type SessionFormData = {
  patientId?: string;
  name: string;
  mobileNumber: string;
  whatsappSameAsMobile: boolean;
  whatsappNumber: string;
  email: string;
  address: string;
  date: string;
  timeSlot: string;
  sessionType: 'in-person' | 'online';
};
