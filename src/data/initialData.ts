import { Property, Lead, AnalyticsEvent } from '../types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Spacious 2 BHK in Evershine Meadows CHS',
    description: 'Well-ventilated East-facing apartment with complete Society NOC clearance. Verified background reference checks on file. Features modular kitchen, piped gas, and 24x7 security.',
    type: 'rent',
    price: 22000,
    priceFormatted: '₹22,000 / mo',
    deposit: 75000,
    locality: 'Evershine City, Vasai East',
    city: 'Vasai-Virar',
    societyName: 'Evershine Meadows CHS Ltd.',
    bedrooms: 2,
    bathrooms: 2,
    areaSqFt: 880,
    floor: '4th of 7 floors',
    furnishing: 'Semi-Furnished',
    amenities: ['Lift', '24x7 Security', 'Power Backup', 'Covered Car Parking', 'Piped Gas', 'Children Play Area'],
    societyNocStatus: 'Verified',
    tenantReferenceCheck: true,
    leaseTermYears: 2,
    status: 'Available',
    featured: true,
    agent: {
      name: 'Rohan Sharma',
      phone: '+91 98200 44512',
      email: 'rohan.sharma@novitiatehousing.com',
      reraNumber: 'A51700028941'
    },
    dateAdded: '2026-03-28',
    imagePreset: 'modern_tower'
  },
  {
    id: 'prop-2',
    title: 'Sunlit 3 BHK Garden View in Silver Arch Cooperative',
    description: 'Corner residence overlooking community park with pre-cleared society committee NOC. Dedicated reserved stilt parking and solar water heating. Tenancy agreement duration: 3-year term.',
    type: 'rent',
    price: 34000,
    priceFormatted: '₹34,000 / mo',
    deposit: 120000,
    locality: 'Vasai West',
    city: 'Vasai-Virar',
    societyName: 'Silver Arch Co-operative Housing Society',
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: 1250,
    floor: '6th of 12 floors',
    furnishing: 'Furnished',
    amenities: ['Lift', '24x7 Security', 'Power Backup', 'Covered Car Parking', 'Gymnasium', 'Clubhouse', 'Piped Gas', 'Pet Friendly'],
    societyNocStatus: 'Verified',
    tenantReferenceCheck: true,
    leaseTermYears: 3,
    status: 'Available',
    featured: true,
    agent: {
      name: 'Priya Deshmukh',
      phone: '+91 98211 90812',
      email: 'priya.deshmukh@novitiatehousing.com',
      reraNumber: 'A51700031092'
    },
    dateAdded: '2026-04-02',
    imagePreset: 'luxury_interior'
  },
  {
    id: 'prop-3',
    title: 'Prime 2 BHK Freehold in Gokul Anand Residency',
    description: 'Clear title, OC received, society conveyance deed complete. Immediate possession for sale with direct housing loan approvals from leading nationalized banks.',
    type: 'sale',
    price: 6800000,
    priceFormatted: '₹68 Lakh',
    locality: 'Babola Naka, Vasai West',
    city: 'Vasai-Virar',
    societyName: 'Gokul Anand CHS Ltd.',
    bedrooms: 2,
    bathrooms: 2,
    areaSqFt: 920,
    floor: '3rd of 8 floors',
    furnishing: 'Unfurnished',
    amenities: ['Lift', '24x7 Security', 'Covered Car Parking', 'Piped Gas', 'Children Play Area', 'Rainwater Harvesting'],
    societyNocStatus: 'Verified',
    tenantReferenceCheck: false,
    status: 'Available',
    featured: true,
    agent: {
      name: 'Rohan Sharma',
      phone: '+91 98200 44512',
      email: 'rohan.sharma@novitiatehousing.com',
      reraNumber: 'A51700028941'
    },
    dateAdded: '2026-03-15',
    imagePreset: 'exterior_building'
  },
  {
    id: 'prop-4',
    title: 'Compact 1 BHK Cozy Living in Palm Grove Heights',
    description: 'Perfect for working professionals or small families. 5 minutes from railway station. Low maintenance society with strict tenant verification and 24-hour water supply.',
    type: 'rent',
    price: 14500,
    priceFormatted: '₹14,500 / mo',
    deposit: 50000,
    locality: 'Virar West',
    city: 'Vasai-Virar',
    societyName: 'Palm Grove Co-op Society',
    bedrooms: 1,
    bathrooms: 1,
    areaSqFt: 580,
    floor: '2nd of 4 floors',
    furnishing: 'Semi-Furnished',
    amenities: ['24x7 Security', 'Piped Gas', 'Rainwater Harvesting'],
    societyNocStatus: 'Verified',
    tenantReferenceCheck: true,
    leaseTermYears: 2,
    status: 'Available',
    featured: false,
    agent: {
      name: 'Amit Vernekar',
      phone: '+91 98190 22345',
      email: 'amit.vernekar@novitiatehousing.com',
      reraNumber: 'A51700049281'
    },
    dateAdded: '2026-04-05',
    imagePreset: 'modern_tower'
  },
  {
    id: 'prop-5',
    title: 'Executive 3 BHK Penthouse in Imperial Heights',
    description: 'Luxury high-rise apartment with panoramic skyline view, private terrace deck, and imported vitrified tiles. Society NOC ready with dedicated 2-car basement parking.',
    type: 'sale',
    price: 13500000,
    priceFormatted: '₹1.35 Cr',
    locality: 'Borivali West, Link Road',
    city: 'Mumbai',
    societyName: 'Imperial Heights CHS Ltd.',
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: 1450,
    floor: '18th of 22 floors',
    furnishing: 'Semi-Furnished',
    amenities: ['Lift', '24x7 Security', 'Power Backup', 'Covered Car Parking', 'Gymnasium', 'Swimming Pool', 'Clubhouse', 'Piped Gas', 'Pet Friendly'],
    societyNocStatus: 'Verified',
    tenantReferenceCheck: false,
    status: 'Available',
    featured: true,
    agent: {
      name: 'Priya Deshmukh',
      phone: '+91 98211 90812',
      email: 'priya.deshmukh@novitiatehousing.com',
      reraNumber: 'A51700031092'
    },
    dateAdded: '2026-03-20',
    imagePreset: 'luxury_interior'
  },
  {
    id: 'prop-6',
    title: 'Family 2 BHK in Vasant Utsav Co-Op Society',
    description: 'Ideal family layout next to schools and supermarkets. Society management committee has approved tenancy protocol. Clean tenant profile required with employer reference.',
    type: 'rent',
    price: 26000,
    priceFormatted: '₹26,000 / mo',
    deposit: 90000,
    locality: 'Kandivali West',
    city: 'Mumbai',
    societyName: 'Vasant Utsav Co-operative Society',
    bedrooms: 2,
    bathrooms: 2,
    areaSqFt: 820,
    floor: '5th of 9 floors',
    furnishing: 'Unfurnished',
    amenities: ['Lift', '24x7 Security', 'Power Backup', 'Covered Car Parking', 'Piped Gas'],
    societyNocStatus: 'Verified',
    tenantReferenceCheck: true,
    leaseTermYears: 2,
    status: 'Under Offer',
    featured: false,
    agent: {
      name: 'Amit Vernekar',
      phone: '+91 98190 22345',
      email: 'amit.vernekar@novitiatehousing.com',
      reraNumber: 'A51700049281'
    },
    dateAdded: '2026-03-10',
    imagePreset: 'exterior_building'
  },
  {
    id: 'prop-7',
    title: 'Modern 2 BHK in Hyde Park CHS',
    description: 'Located in prime Ghodbunder Road belt. Gated township society with landscaped jogging tracks, podium garden, and verified NOC process for swift registry.',
    type: 'sale',
    price: 9200000,
    priceFormatted: '₹92 Lakh',
    locality: 'Thane West',
    city: 'Thane',
    societyName: 'Hyde Park Co-operative Housing Society',
    bedrooms: 2,
    bathrooms: 2,
    areaSqFt: 980,
    floor: '8th of 16 floors',
    furnishing: 'Semi-Furnished',
    amenities: ['Lift', '24x7 Security', 'Power Backup', 'Covered Car Parking', 'Gymnasium', 'Swimming Pool', 'Clubhouse', 'Children Play Area', 'Piped Gas'],
    societyNocStatus: 'Verified',
    tenantReferenceCheck: false,
    status: 'Available',
    featured: false,
    agent: {
      name: 'Rohan Sharma',
      phone: '+91 98200 44512',
      email: 'rohan.sharma@novitiatehousing.com',
      reraNumber: 'A51700028941'
    },
    dateAdded: '2026-03-22',
    imagePreset: 'modern_tower'
  },
  {
    id: 'prop-8',
    title: 'Peaceful 1 BHK in Green Valley CHS',
    description: 'Affordable and serene rental apartment overlooking green hills. Involves society committee during onboarding to eliminate dispute risks. 2-year locked agreement.',
    type: 'rent',
    price: 16000,
    priceFormatted: '₹16,000 / mo',
    deposit: 60000,
    locality: 'Vasai East, Evershine City',
    city: 'Vasai-Virar',
    societyName: 'Green Valley CHS',
    bedrooms: 1,
    bathrooms: 1,
    areaSqFt: 620,
    floor: '1st of 4 floors',
    furnishing: 'Unfurnished',
    amenities: ['24x7 Security', 'Covered Car Parking', 'Piped Gas'],
    societyNocStatus: 'Verified',
    tenantReferenceCheck: true,
    leaseTermYears: 2,
    status: 'Available',
    featured: false,
    agent: {
      name: 'Amit Vernekar',
      phone: '+91 98190 22345',
      email: 'amit.vernekar@novitiatehousing.com',
      reraNumber: 'A51700049281'
    },
    dateAdded: '2026-04-01',
    imagePreset: 'exterior_building'
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-101',
    name: 'Suresh Patil (Secretary)',
    email: 'secretary@evershinegreens.org',
    phone: '+91 98201 12345',
    role: 'Housing Society Committee',
    locality: 'Evershine City, Vasai East',
    message: 'Our management committee would like to partner with Novitiate Housing to streamline tenancy verification and eliminate NOC disputes across our 96 flats.',
    createdAt: '2026-04-12T09:30:00Z',
    status: 'Follow-up Scheduled',
    source: 'Society Onboarding',
    automatedSequence: {
      id: 'seq-1',
      name: 'Housing Society Partnership Onboarding',
      status: 'Active',
      currentStep: 2,
      totalSteps: 3,
      steps: [
        {
          step: 1,
          title: 'Welcome Kit & Society By-Law Alignment Deck',
          delay: 'Immediate',
          channel: 'Email',
          status: 'Sent',
          scheduledDate: '2026-04-12T09:31:00Z',
          sentAt: '2026-04-12T09:31:00Z',
          content: 'Sent complete Society Committee briefing packet with model NOC resolution templates.'
        },
        {
          step: 2,
          title: 'Committee Meeting Agenda & Reference Check Protocol',
          delay: 'Day 1',
          channel: 'WhatsApp',
          status: 'Sent',
          scheduledDate: '2026-04-13T10:00:00Z',
          sentAt: '2026-04-13T10:02:00Z',
          content: 'Shared digital reference check checklist for prospective tenants.'
        },
        {
          step: 3,
          title: 'On-Site Verification Visit with Legal Advisory Team',
          delay: 'Day 3',
          channel: 'Phone Call',
          status: 'Pending',
          scheduledDate: '2026-04-15T11:00:00Z',
          content: 'Schedule physical walkthrough and formal resolution signing with managing committee.'
        }
      ]
    },
    notes: [
      {
        id: 'note-1',
        author: 'Admin Team',
        text: 'Secretary Suresh Patil requested evening slot for committee meeting due to members working in Mumbai.',
        date: '2026-04-12 11:20'
      }
    ]
  },
  {
    id: 'lead-102',
    name: 'Vikram Mehta',
    email: 'vikram.mehta@fintechcorp.in',
    phone: '+91 98230 88761',
    role: 'Tenant',
    propertyId: 'prop-1',
    propertyTitle: 'Spacious 2 BHK in Evershine Meadows CHS',
    locality: 'Vasai East',
    budget: '₹22,000 / month',
    message: 'Looking for family tenancy for 2 years. Have employment verification ready. Need move-in by next month.',
    createdAt: '2026-04-13T14:15:00Z',
    status: 'Contacted',
    source: 'Property Inquiry',
    automatedSequence: {
      id: 'seq-2',
      name: 'Tenant Reference & Society Clearance Sequence',
      status: 'Active',
      currentStep: 1,
      totalSteps: 3,
      steps: [
        {
          step: 1,
          title: 'Instant Property Packet & Tenant KYC Request',
          delay: 'Immediate',
          channel: 'WhatsApp',
          status: 'Sent',
          scheduledDate: '2026-04-13T14:16:00Z',
          sentAt: '2026-04-13T14:16:00Z',
          content: 'Sent property brochure, floor video, and reference check upload link.'
        },
        {
          step: 2,
          title: 'Site Inspection Coordination with Certified Agent',
          delay: 'Day 1',
          channel: 'Phone Call',
          status: 'Scheduled',
          scheduledDate: '2026-04-14T11:00:00Z',
          content: 'Confirm Saturday 4 PM visit with Agent Rohan Sharma.'
        },
        {
          step: 3,
          title: 'Society NOC & Police Intimation Filing',
          delay: 'Day 3',
          channel: 'Email',
          status: 'Pending',
          scheduledDate: '2026-04-16T10:00:00Z',
          content: 'Pre-submit verified documents to Evershine Meadows CHS committee.'
        }
      ]
    },
    notes: [
      {
        id: 'note-2',
        author: 'Rohan Sharma',
        text: 'Tenant works in Bandra-Kurla Complex as Senior Analyst. Clean corporate credentials.',
        date: '2026-04-13 15:40'
      }
    ]
  },
  {
    id: 'lead-103',
    name: 'Rajesh Kulkarni',
    email: 'rkulkarni.realty@gmail.com',
    phone: '+91 98920 55431',
    role: 'Real Estate Agent',
    locality: 'Vasai-Virar Suburbs',
    message: 'Registered MahaRERA broker with 45 active buyers in Vasai. Interested in accessing your verified society inventory to eliminate NOC bottlenecks.',
    createdAt: '2026-04-11T16:00:00Z',
    status: 'Qualified',
    source: 'Agent Partner',
    automatedSequence: {
      id: 'seq-3',
      name: 'Agent Partner Network Onboarding',
      status: 'Active',
      currentStep: 2,
      totalSteps: 3,
      steps: [
        {
          step: 1,
          title: 'Agent Charter & RERA Co-Broke Agreement',
          delay: 'Immediate',
          channel: 'Email',
          status: 'Sent',
          scheduledDate: '2026-04-11T16:05:00Z',
          sentAt: '2026-04-11T16:05:00Z',
          content: 'Shared agent partner charter, 50-50 verified co-brokering split agreement.'
        },
        {
          step: 2,
          title: 'Inventory Portal Access & RERA Verification',
          delay: 'Day 1',
          channel: 'Email',
          status: 'Sent',
          scheduledDate: '2026-04-12T12:00:00Z',
          sentAt: '2026-04-12T12:10:00Z',
          content: 'MahaRERA certificate verified. Assigned agent credentials for society listings.'
        },
        {
          step: 3,
          title: 'Exclusive Vasai-Virar Society Allotment Call',
          delay: 'Day 4',
          channel: 'Phone Call',
          status: 'Scheduled',
          scheduledDate: '2026-04-15T15:00:00Z',
          content: 'Assign initial 6 exclusive society mandates for sales & leasing.'
        }
      ]
    },
    notes: []
  },
  {
    id: 'lead-104',
    name: 'Anita & Rahul Joshi',
    email: 'rahul.joshi@tcs.com',
    phone: '+91 97690 33211',
    role: 'Buyer',
    propertyId: 'prop-3',
    propertyTitle: 'Prime 2 BHK Freehold in Gokul Anand Residency',
    locality: 'Vasai West',
    budget: '₹65 - 70 Lakh',
    message: 'Looking for ready-to-move 2BHK with clear society title and loan approval. Want to book inspection this Sunday.',
    createdAt: '2026-04-14T08:00:00Z',
    status: 'New',
    source: 'Website Contact',
    automatedSequence: {
      id: 'seq-4',
      name: 'Buyer Due Diligence & Site Visit Sequence',
      status: 'Active',
      currentStep: 1,
      totalSteps: 3,
      steps: [
        {
          step: 1,
          title: 'Title Verification Summary & Bank APF Codes',
          delay: 'Immediate',
          channel: 'WhatsApp',
          status: 'Sent',
          scheduledDate: '2026-04-14T08:02:00Z',
          sentAt: '2026-04-14T08:02:00Z',
          content: 'Delivered title search report, bank approval codes (SBI, HDFC), and society NOC clearance.'
        },
        {
          step: 2,
          title: 'Site Visit Confirmation with Society Representative',
          delay: 'Day 1',
          channel: 'Phone Call',
          status: 'Scheduled',
          scheduledDate: '2026-04-15T10:00:00Z',
          content: 'Coordinate Sunday 11:30 AM visit with owner and society representative.'
        },
        {
          step: 3,
          title: 'Offer Formulation & Legal Draft Agreement',
          delay: 'Day 3',
          channel: 'Email',
          status: 'Pending',
          scheduledDate: '2026-04-17T11:00:00Z',
          content: 'Prepare standard Maharashtra model sale agreement draft.'
        }
      ]
    },
    notes: []
  }
];

export const INITIAL_ANALYTICS_EVENTS: AnalyticsEvent[] = [
  { id: 'ev-1', type: 'page_view', label: 'Home Page Visit', timestamp: Date.now() - 3600000 * 24 },
  { id: 'ev-2', type: 'property_search', label: 'Searched: Vasai 2BHK', timestamp: Date.now() - 3600000 * 18 },
  { id: 'ev-3', type: 'property_view', label: 'Viewed Prop: prop-1', timestamp: Date.now() - 3600000 * 12 },
  { id: 'ev-4', type: 'lead_inquiry', label: 'Captured Lead: Suresh Patil', timestamp: Date.now() - 3600000 * 6 },
  { id: 'ev-5', type: 'chat_interaction', label: 'Chat: Inquired about Society NOC', timestamp: Date.now() - 3600000 * 2 }
];
