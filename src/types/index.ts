export type PropertyType = 'rent' | 'sale';
export type PropertyStatus = 'Available' | 'Under Offer' | 'Sold' | 'Leased';
export type NOCStatus = 'Verified' | 'In Progress' | 'Exempt';
export type FurnishingType = 'Furnished' | 'Semi-Furnished' | 'Unfurnished';

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  price: number; // e.g. 24000 or 8500000
  priceFormatted: string; // e.g. "₹24,000 / month" or "₹85 Lakh"
  deposit?: number;
  locality: string; // "Vasai West", "Evershine City", "Virar West", etc.
  city: string; // "Vasai-Virar", "Mumbai", "Thane"
  societyName: string;
  bedrooms: number; // 1, 2, 3, 4
  bathrooms: number;
  areaSqFt: number;
  floor: string;
  furnishing: FurnishingType;
  amenities: string[];
  societyNocStatus: NOCStatus;
  tenantReferenceCheck: boolean;
  leaseTermYears?: number; // 2-3 years
  status: PropertyStatus;
  featured?: boolean;
  agent: {
    name: string;
    phone: string;
    email: string;
    reraNumber: string;
  };
  dateAdded: string;
  imageUrl?: string;
  imagePreset?: string; // used for styled SVG architectural vector visual
}

export type LeadRole = 'Buyer' | 'Tenant' | 'Housing Society Committee' | 'Real Estate Agent';
export type LeadStatus = 'New' | 'Contacted' | 'Follow-up Scheduled' | 'Qualified' | 'Closed / Won' | 'Archived';

export interface FollowUpStep {
  step: number;
  title: string;
  delay: string;
  channel: 'Email' | 'WhatsApp' | 'Phone Call' | 'NOC Courier';
  status: 'Sent' | 'Pending' | 'Scheduled';
  scheduledDate: string;
  sentAt?: string;
  content: string;
}

export interface AutomatedSequence {
  id: string;
  name: string;
  status: 'Active' | 'Paused' | 'Completed';
  currentStep: number;
  totalSteps: number;
  steps: FollowUpStep[];
}

export interface LeadNote {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: LeadRole;
  propertyId?: string;
  propertyTitle?: string;
  locality?: string;
  budget?: string;
  message: string;
  createdAt: string;
  status: LeadStatus;
  source: 'Website Contact' | 'Property Inquiry' | 'Chat Widget' | 'Society Onboarding' | 'Agent Partner';
  automatedSequence: AutomatedSequence;
  notes: LeadNote[];
}

export interface AnalyticsEvent {
  id: string;
  type: 'page_view' | 'property_search' | 'property_view' | 'lead_inquiry' | 'chat_interaction' | 'filter_use';
  label: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface FilterState {
  query: string;
  type: 'all' | 'rent' | 'sale';
  locality: string;
  priceMin: number;
  priceMax: number;
  bedrooms: number | 'all';
  amenities: string[];
  nocVerifiedOnly: boolean;
  sortBy: 'newest' | 'price_low' | 'price_high' | 'area';
}
