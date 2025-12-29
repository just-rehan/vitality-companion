
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  reminderSent: boolean;
  purpose?: string;
}

export interface VitalRecord {
  date: string;
  bp: number;
  weight: number;
  sugar: number;
  pulse: number;
}

export interface Allergy {
  id: string;
  type: 'Food' | 'Medicine' | 'Environment';
  name: string;
  severity: 'Low' | 'Medium' | 'High';
}

export interface SOSEvent {
  id: string;
  timestamp: string;
  location: { lat: number; lng: number };
  status: 'Dispatched' | 'Acknowledged' | 'Resolved';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type ViewType = 'dashboard' | 'chatbot' | 'medications' | 'vitals' | 'allergies' | 'reports';
