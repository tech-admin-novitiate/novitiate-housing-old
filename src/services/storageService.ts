import { Property, Lead, AnalyticsEvent, LeadStatus, LeadRole } from '../types';
import { INITIAL_PROPERTIES, INITIAL_LEADS, INITIAL_ANALYTICS_EVENTS } from '../data/initialData';

const STORAGE_KEYS = {
  PROPERTIES: 'novitiate_properties_v2',
  LEADS: 'novitiate_leads_v1',
  ANALYTICS: 'novitiate_analytics_v1',
};

// Curated high-resolution copyright-free architecture presets
export const CURATED_PROPERTY_IMAGES = {
  modern_tower: [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'
  ],
  luxury_interior: [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80'
  ],
  exterior_building: [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80'
  ]
};

// Generates system-governed random cycle time strictly between 3 - 15 seconds
export function generateSystemGovernedCycleRate(): number {
  return Math.floor(Math.random() * 13) + 3; // 3 to 15 seconds
}

export function ensurePropertyImages(p: Property, index: number = 0): Property {
  const defaultImages = CURATED_PROPERTY_IMAGES[(p.imagePreset as keyof typeof CURATED_PROPERTY_IMAGES) || 'modern_tower'] || CURATED_PROPERTY_IMAGES.modern_tower;
  const images = (p.images && p.images.length > 0) ? p.images : (p.imageUrl ? [p.imageUrl] : defaultImages);
  
  // Deterministic seed rate between 3 and 15 seconds for initial items if not yet set
  const assignedCycleRate = p.imageCycleRateSeconds || (((index * 4 + 5) % 13) + 3);

  return {
    ...p,
    images,
    imageCycleRateSeconds: assignedCycleRate
  };
}

// Properties Storage
export function getProperties(): Property[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
    let list: Property[] = raw ? JSON.parse(raw) : INITIAL_PROPERTIES;
    list = list.map((p, idx) => ensurePropertyImages(p, idx));
    return list;
  } catch (err) {
    console.error('Error reading properties from storage', err);
    return INITIAL_PROPERTIES.map((p, idx) => ensurePropertyImages(p, idx));
  }
}

export function saveProperties(props: Property[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(props));
    window.dispatchEvent(new Event('novitiate_properties_updated'));
  } catch (err) {
    console.error('Error saving properties', err);
  }
}

export function addProperty(newProp: Omit<Property, 'id' | 'dateAdded'>): Property {
  const current = getProperties();
  const id = `prop-${Date.now()}`;
  const dateAdded = new Date().toISOString().split('T')[0];

  // System-governed random cycle rate strictly between 3 - 15 seconds
  const systemCycleRate = newProp.imageCycleRateSeconds || generateSystemGovernedCycleRate();

  // Ensure images array is set
  const defaultImages = CURATED_PROPERTY_IMAGES[(newProp.imagePreset as keyof typeof CURATED_PROPERTY_IMAGES) || 'modern_tower'] || CURATED_PROPERTY_IMAGES.modern_tower;
  const images = (newProp.images && newProp.images.length > 0) ? newProp.images : defaultImages;

  const fullProperty: Property = {
    ...newProp,
    id,
    dateAdded,
    images,
    imageCycleRateSeconds: systemCycleRate,
  };
  saveProperties([fullProperty, ...current]);
  logAnalyticsEvent('admin_action' as any, `Added new property: ${fullProperty.title} (Cycle rate: ${systemCycleRate}s)`);
  return fullProperty;
}

export function updateProperty(updated: Property): void {
  const current = getProperties();
  const cycleRate = updated.imageCycleRateSeconds || generateSystemGovernedCycleRate();
  const next = current.map((p) => (p.id === updated.id ? { ...updated, imageCycleRateSeconds: cycleRate } : p));
  saveProperties(next);
  logAnalyticsEvent('admin_action' as any, `Updated property: ${updated.title}`);
}

export function deleteProperty(id: string): void {
  const current = getProperties();
  const next = current.filter((p) => p.id !== id);
  saveProperties(next);
  logAnalyticsEvent('admin_action' as any, `Deleted property ID: ${id}`);
}

// Leads Storage & CRM
export function getLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEADS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading leads from storage', err);
    return INITIAL_LEADS;
  }
}

export function saveLeads(leads: Lead[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
    window.dispatchEvent(new Event('novitiate_leads_updated'));
  } catch (err) {
    console.error('Error saving leads', err);
  }
}

export function createLead(params: {
  name: string;
  email: string;
  phone: string;
  role: LeadRole;
  propertyId?: string;
  propertyTitle?: string;
  locality?: string;
  budget?: string;
  message: string;
  source: Lead['source'];
}): Lead {
  const current = getLeads();
  const id = `lead-${Date.now()}`;
  const now = new Date().toISOString();

  // Create customized automated sequence based on role
  let sequenceName = 'Standard Real Estate Advisory Sequence';
  let steps: Lead['automatedSequence']['steps'] = [];

  if (params.role === 'Housing Society Committee') {
    sequenceName = 'Housing Society Partnership Onboarding';
    steps = [
      {
        step: 1,
        title: 'Welcome Kit & Society By-Law Alignment Deck',
        delay: 'Immediate',
        channel: 'Email',
        status: 'Sent',
        scheduledDate: now,
        sentAt: now,
        content: `Sent society committee onboarding handbook and model NOC resolution formats to ${params.email}.`
      },
      {
        step: 2,
        title: 'Committee Meeting Agenda & Reference Check Protocol',
        delay: 'Day 1',
        channel: 'WhatsApp',
        status: 'Scheduled',
        scheduledDate: new Date(Date.now() + 86400000).toISOString(),
        content: `Share tenant background vetting protocol via WhatsApp to ${params.phone}.`
      },
      {
        step: 3,
        title: 'On-Site Verification Walkthrough with Managing Committee',
        delay: 'Day 3',
        channel: 'Phone Call',
        status: 'Pending',
        scheduledDate: new Date(Date.now() + 86400000 * 3).toISOString(),
        content: 'Executive officer call to confirm society walkthrough and resolution date.'
      }
    ];
  } else if (params.role === 'Tenant') {
    sequenceName = 'Tenant Reference & Society Clearance Sequence';
    steps = [
      {
        step: 1,
        title: 'Instant Property Packet & Tenant KYC Request',
        delay: 'Immediate',
        channel: 'WhatsApp',
        status: 'Sent',
        scheduledDate: now,
        sentAt: now,
        content: `Sent society verification criteria & inspection booking options to ${params.phone}.`
      },
      {
        step: 2,
        title: 'Site Inspection Coordination with Certified Agent',
        delay: 'Day 1',
        channel: 'Phone Call',
        status: 'Scheduled',
        scheduledDate: new Date(Date.now() + 86400000).toISOString(),
        content: 'Coordinate physical visit with society security gate pass.'
      },
      {
        step: 3,
        title: 'Society NOC & Police Intimation Filing',
        delay: 'Day 3',
        channel: 'Email',
        status: 'Pending',
        scheduledDate: new Date(Date.now() + 86400000 * 3).toISOString(),
        content: 'Initiate 2-3 year structured tenancy agreement.'
      }
    ];
  } else if (params.role === 'Real Estate Agent') {
    sequenceName = 'Agent Partner Network Onboarding';
    steps = [
      {
        step: 1,
        title: 'Agent Charter & RERA Co-Broke Agreement',
        delay: 'Immediate',
        channel: 'Email',
        status: 'Sent',
        scheduledDate: now,
        sentAt: now,
        content: `Sent RERA partner agreement & verified society inventory catalog to ${params.email}.`
      },
      {
        step: 2,
        title: 'Inventory Portal Access & RERA Verification',
        delay: 'Day 1',
        channel: 'Email',
        status: 'Scheduled',
        scheduledDate: new Date(Date.now() + 86400000).toISOString(),
        content: 'Validate MahaRERA credentials and unlock direct society liaison desk.'
      },
      {
        step: 3,
        title: 'Regional Territory Review Call',
        delay: 'Day 4',
        channel: 'Phone Call',
        status: 'Pending',
        scheduledDate: new Date(Date.now() + 86400000 * 4).toISOString(),
        content: 'Strategic territory allotment for exclusive listing syndication.'
      }
    ];
  } else {
    // Buyer
    sequenceName = 'Buyer Due Diligence & Site Visit Sequence';
    steps = [
      {
        step: 1,
        title: 'Title Verification Summary & Bank APF Codes',
        delay: 'Immediate',
        channel: 'WhatsApp',
        status: 'Sent',
        scheduledDate: now,
        sentAt: now,
        content: `Sent title search certificate and approved bank loan codes to ${params.phone}.`
      },
      {
        step: 2,
        title: 'Site Visit Confirmation with Society Representative',
        delay: 'Day 1',
        channel: 'Phone Call',
        status: 'Scheduled',
        scheduledDate: new Date(Date.now() + 86400000).toISOString(),
        content: 'Schedule private viewing with society committee liaison.'
      },
      {
        step: 3,
        title: 'Offer Formulation & Legal Draft Agreement',
        delay: 'Day 3',
        channel: 'Email',
        status: 'Pending',
        scheduledDate: new Date(Date.now() + 86400000 * 3).toISOString(),
        content: 'Prepare standard Maharashtra model sale agreement draft.'
      }
    ];
  }

  const newLead: Lead = {
    id,
    name: params.name,
    email: params.email,
    phone: params.phone,
    role: params.role,
    propertyId: params.propertyId,
    propertyTitle: params.propertyTitle,
    locality: params.locality,
    budget: params.budget,
    message: params.message,
    createdAt: now,
    status: 'New',
    source: params.source,
    automatedSequence: {
      id: `seq-${Date.now()}`,
      name: sequenceName,
      status: 'Active',
      currentStep: 1,
      totalSteps: steps.length,
      steps
    },
    notes: [
      {
        id: `note-${Date.now()}`,
        author: 'System Lead Engine',
        text: `Captured via ${params.source}. Automated Sequence '${sequenceName}' initiated.`,
        date: new Date().toLocaleString()
      }
    ]
  };

  saveLeads([newLead, ...current]);
  logAnalyticsEvent('lead_inquiry', `New ${params.role} Lead from ${params.name}`, { role: params.role, source: params.source });
  return newLead;
}

export function updateLeadStatus(id: string, status: LeadStatus): void {
  const current = getLeads();
  const next = current.map((lead) => {
    if (lead.id === id) {
      return {
        ...lead,
        status,
        notes: [
          {
            id: `note-${Date.now()}`,
            author: 'Admin Team',
            text: `Status changed to: ${status}`,
            date: new Date().toLocaleString()
          },
          ...lead.notes
        ]
      };
    }
    return lead;
  });
  saveLeads(next);
}

export function advanceLeadSequence(leadId: string): void {
  const current = getLeads();
  const next = current.map((lead) => {
    if (lead.id === leadId) {
      const seq = lead.automatedSequence;
      const nextStepIndex = seq.steps.findIndex((s) => s.status !== 'Sent');
      if (nextStepIndex === -1) {
        return {
          ...lead,
          automatedSequence: { ...seq, status: 'Completed' as const }
        };
      }
      const updatedSteps = [...seq.steps];
      updatedSteps[nextStepIndex] = {
        ...updatedSteps[nextStepIndex],
        status: 'Sent',
        sentAt: new Date().toISOString()
      };
      const isAllSent = updatedSteps.every((s) => s.status === 'Sent');
      return {
        ...lead,
        automatedSequence: {
          ...seq,
          currentStep: Math.min(seq.totalSteps, nextStepIndex + 2),
          status: isAllSent ? ('Completed' as const) : seq.status,
          steps: updatedSteps
        },
        notes: [
          {
            id: `note-${Date.now()}`,
            author: 'Automated Follow-up Engine',
            text: `Triggered Step ${nextStepIndex + 1}: ${updatedSteps[nextStepIndex].title} via ${updatedSteps[nextStepIndex].channel}`,
            date: new Date().toLocaleString()
          },
          ...lead.notes
        ]
      };
    }
    return lead;
  });
  saveLeads(next);
}

export function toggleLeadSequenceStatus(leadId: string): void {
  const current = getLeads();
  const next = current.map((lead) => {
    if (lead.id === leadId) {
      const nextStatus = lead.automatedSequence.status === 'Active' ? 'Paused' : 'Active';
      return {
        ...lead,
        automatedSequence: {
          ...lead.automatedSequence,
          status: nextStatus as any
        },
        notes: [
          {
            id: `note-${Date.now()}`,
            author: 'Admin Team',
            text: `Automated sequence set to: ${nextStatus}`,
            date: new Date().toLocaleString()
          },
          ...lead.notes
        ]
      };
    }
    return lead;
  });
  saveLeads(next);
}

export function addLeadNote(leadId: string, text: string, author = 'Admin Team'): void {
  const current = getLeads();
  const next = current.map((lead) => {
    if (lead.id === leadId) {
      return {
        ...lead,
        notes: [
          {
            id: `note-${Date.now()}`,
            author,
            text,
            date: new Date().toLocaleString()
          },
          ...lead.notes
        ]
      };
    }
    return lead;
  });
  saveLeads(next);
}

export function deleteLead(leadId: string): void {
  const current = getLeads();
  const next = current.filter((l) => l.id !== leadId);
  saveLeads(next);
}

// Analytics Storage & Insights Engine
export function getAnalyticsEvents(): AnalyticsEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(INITIAL_ANALYTICS_EVENTS));
      return INITIAL_ANALYTICS_EVENTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading analytics', err);
    return INITIAL_ANALYTICS_EVENTS;
  }
}

export function logAnalyticsEvent(
  type: AnalyticsEvent['type'],
  label: string,
  metadata?: Record<string, any>
): void {
  try {
    const current = getAnalyticsEvents();
    const event: AnalyticsEvent = {
      id: `ev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type,
      label,
      timestamp: Date.now(),
      metadata,
    };
    const next = [event, ...current.slice(0, 499)]; // retain last 500
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(next));
  } catch (err) {
    console.error('Error logging analytics event', err);
  }
}

export function exportLeadsToCSV(): void {
  const leads = getLeads();
  if (leads.length === 0) return;

  const headers = ['ID', 'Name', 'Email', 'Phone', 'Role', 'Status', 'Property', 'Locality', 'Source', 'Sequence Name', 'Sequence Step', 'Created At'];
  const rows = leads.map((l) => [
    l.id,
    `"${l.name}"`,
    l.email,
    l.phone,
    l.role,
    l.status,
    `"${l.propertyTitle || 'General'}"`,
    `"${l.locality || 'N/A'}"`,
    l.source,
    `"${l.automatedSequence.name}"`,
    `${l.automatedSequence.currentStep}/${l.automatedSequence.totalSteps} (${l.automatedSequence.status})`,
    l.createdAt
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `novitiate_leads_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
