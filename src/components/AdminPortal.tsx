import React, { useState, useMemo } from 'react';
import {
  Building2,
  Users2,
  BarChart3,
  Plus,
  Trash2,
  Edit3,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Send,
  Download,
  Search,
  Filter,
  Check,
  X,
  Play,
  Pause,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  AlertCircle,
  Lightbulb,
  Phone,
  Mail,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import {
  Property,
  Lead,
  LeadStatus,
  LeadRole,
  PropertyStatus,
  PropertyType,
  NOCStatus,
  FurnishingType
} from '../types';
import {
  addProperty,
  updateProperty,
  deleteProperty,
  getLeads,
  updateLeadStatus,
  advanceLeadSequence,
  toggleLeadSequenceStatus,
  addLeadNote,
  deleteLead,
  exportLeadsToCSV,
  getAnalyticsEvents
} from '../services/storageService';
import { PropertyVisual } from './PropertyVisual';

interface AdminPortalProps {
  properties: Property[];
  onPropertiesChange: () => void;
  onNavigateToTab: (tab: string) => void;
}

const ALL_AMENITIES = [
  'Lift',
  '24x7 Security',
  'Power Backup',
  'Covered Car Parking',
  'Gymnasium',
  'Swimming Pool',
  'Clubhouse',
  'Piped Gas',
  'Children Play Area',
  'Pet Friendly',
  'Rainwater Harvesting'
];

export const AdminPortal: React.FC<AdminPortalProps> = ({
  properties,
  onPropertiesChange,
  onNavigateToTab
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'properties' | 'crm' | 'analytics'>('properties');
  
  // Property management modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // Property Form state
  const [propTitle, setPropTitle] = useState('');
  const [propDesc, setPropDesc] = useState('');
  const [propType, setPropType] = useState<PropertyType>('rent');
  const [propPrice, setPropPrice] = useState<number>(20000);
  const [propPriceFormatted, setPropPriceFormatted] = useState('₹20,000 / mo');
  const [propDeposit, setPropDeposit] = useState<number>(60000);
  const [propLocality, setPropLocality] = useState('Vasai West');
  const [propCity, setPropCity] = useState('Vasai-Virar');
  const [propSociety, setPropSociety] = useState('');
  const [propBeds, setPropBeds] = useState<number>(2);
  const [propBaths, setPropBaths] = useState<number>(2);
  const [propSqFt, setPropSqFt] = useState<number>(850);
  const [propFloor, setPropFloor] = useState('3rd of 7 floors');
  const [propFurnishing, setPropFurnishing] = useState<FurnishingType>('Semi-Furnished');
  const [propAmenities, setPropAmenities] = useState<string[]>(['Lift', '24x7 Security', 'Piped Gas']);
  const [propNocStatus, setPropNocStatus] = useState<NOCStatus>('Verified');
  const [propLeaseTerm, setPropLeaseTerm] = useState<number>(2);
  const [propAgentName, setPropAgentName] = useState('Rohan Sharma');
  const [propAgentPhone, setPropAgentPhone] = useState('+91 98200 44512');
  const [propAgentEmail, setPropAgentEmail] = useState('rohan.sharma@novitiatehousing.com');
  const [propAgentRera, setPropAgentRera] = useState('A51700028941');
  const [propPreset, setPropPreset] = useState<'modern_tower' | 'luxury_interior' | 'exterior_building'>('modern_tower');

  // CRM Leads state
  const [leads, setLeads] = useState<Lead[]>(getLeads());
  const [leadRoleFilter, setLeadRoleFilter] = useState<'all' | LeadRole>('all');
  const [leadStatusFilter, setLeadStatusFilter] = useState<'all' | LeadStatus>('all');
  const [leadSearchQuery, setLeadSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Refresh leads from storage
  const reloadLeads = () => {
    setLeads(getLeads());
  };

  // Property handlers
  const handleOpenAddModal = () => {
    setEditingProperty(null);
    setPropTitle('');
    setPropDesc('');
    setPropType('rent');
    setPropPrice(20000);
    setPropPriceFormatted('₹20,000 / mo');
    setPropDeposit(60000);
    setPropLocality('Vasai West');
    setPropCity('Vasai-Virar');
    setPropSociety('');
    setPropBeds(2);
    setPropBaths(2);
    setPropSqFt(850);
    setPropFloor('3rd of 7 floors');
    setPropFurnishing('Semi-Furnished');
    setPropAmenities(['Lift', '24x7 Security', 'Piped Gas']);
    setPropNocStatus('Verified');
    setPropLeaseTerm(2);
    setPropPreset('modern_tower');
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (prop: Property) => {
    setEditingProperty(prop);
    setPropTitle(prop.title);
    setPropDesc(prop.description);
    setPropType(prop.type);
    setPropPrice(prop.price);
    setPropPriceFormatted(prop.priceFormatted);
    setPropDeposit(prop.deposit || 0);
    setPropLocality(prop.locality);
    setPropCity(prop.city);
    setPropSociety(prop.societyName);
    setPropBeds(prop.bedrooms);
    setPropBaths(prop.bathrooms);
    setPropSqFt(prop.areaSqFt);
    setPropFloor(prop.floor);
    setPropFurnishing(prop.furnishing);
    setPropAmenities(prop.amenities);
    setPropNocStatus(prop.societyNocStatus);
    setPropLeaseTerm(prop.leaseTermYears || 2);
    setPropAgentName(prop.agent.name);
    setPropAgentPhone(prop.agent.phone);
    setPropAgentEmail(prop.agent.email);
    setPropAgentRera(prop.agent.reraNumber);
    setPropPreset((prop.imagePreset as any) || 'modern_tower');
    setIsAddModalOpen(true);
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propTitle || !propSociety) return;

    if (editingProperty) {
      updateProperty({
        ...editingProperty,
        title: propTitle,
        description: propDesc || `Verified society flat in ${propSociety}, ${propLocality}.`,
        type: propType,
        price: propPrice,
        priceFormatted: propPriceFormatted || (propType === 'rent' ? `₹${propPrice.toLocaleString()} / mo` : `₹${(propPrice / 100000).toFixed(0)} Lakh`),
        deposit: propType === 'rent' ? propDeposit : undefined,
        locality: propLocality,
        city: propCity,
        societyName: propSociety,
        bedrooms: propBeds,
        bathrooms: propBaths,
        areaSqFt: propSqFt,
        floor: propFloor,
        furnishing: propFurnishing,
        amenities: propAmenities,
        societyNocStatus: propNocStatus,
        leaseTermYears: propType === 'rent' ? propLeaseTerm : undefined,
        imagePreset: propPreset,
        agent: {
          name: propAgentName,
          phone: propAgentPhone,
          email: propAgentEmail,
          reraNumber: propAgentRera
        }
      });
    } else {
      addProperty({
        title: propTitle,
        description: propDesc || `Verified society flat in ${propSociety}, ${propLocality}. Pre-cleared NOC records.`,
        type: propType,
        price: propPrice,
        priceFormatted: propPriceFormatted || (propType === 'rent' ? `₹${propPrice.toLocaleString()} / mo` : `₹${(propPrice / 100000).toFixed(0)} Lakh`),
        deposit: propType === 'rent' ? propDeposit : undefined,
        locality: propLocality,
        city: propCity,
        societyName: propSociety,
        bedrooms: propBeds,
        bathrooms: propBaths,
        areaSqFt: propSqFt,
        floor: propFloor,
        furnishing: propFurnishing,
        amenities: propAmenities,
        societyNocStatus: propNocStatus,
        tenantReferenceCheck: propType === 'rent',
        leaseTermYears: propType === 'rent' ? propLeaseTerm : undefined,
        status: 'Available',
        featured: false,
        imagePreset: propPreset,
        agent: {
          name: propAgentName,
          phone: propAgentPhone,
          email: propAgentEmail,
          reraNumber: propAgentRera
        }
      });
    }

    setIsAddModalOpen(false);
    onPropertiesChange();
  };

  const handleDeleteProperty = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProperty(id);
      onPropertiesChange();
    }
  };

  const handleToggleStatus = (prop: Property, newStatus: PropertyStatus) => {
    updateProperty({
      ...prop,
      status: newStatus
    });
    onPropertiesChange();
  };

  const toggleFormAmenity = (amenity: string) => {
    setPropAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  // Lead handlers
  const handleUpdateStatus = (leadId: string, status: LeadStatus) => {
    updateLeadStatus(leadId, status);
    reloadLeads();
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status });
    }
  };

  const handleAdvanceStep = (leadId: string) => {
    advanceLeadSequence(leadId);
    reloadLeads();
    const updated = getLeads().find((l) => l.id === leadId);
    if (updated) setSelectedLead(updated);
  };

  const handleToggleSequence = (leadId: string) => {
    toggleLeadSequenceStatus(leadId);
    reloadLeads();
    const updated = getLeads().find((l) => l.id === leadId);
    if (updated) setSelectedLead(updated);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNoteText.trim()) return;
    addLeadNote(selectedLead.id, newNoteText.trim(), 'Staff Agent');
    setNewNoteText('');
    reloadLeads();
    const updated = getLeads().find((l) => l.id === selectedLead.id);
    if (updated) setSelectedLead(updated);
  };

  const handleDeleteLead = (leadId: string) => {
    if (window.confirm('Delete this lead from CRM?')) {
      deleteLead(leadId);
      if (selectedLead?.id === leadId) setSelectedLead(null);
      reloadLeads();
    }
  };

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (leadRoleFilter !== 'all' && lead.role !== leadRoleFilter) return false;
      if (leadStatusFilter !== 'all' && lead.status !== leadStatusFilter) return false;
      if (leadSearchQuery.trim()) {
        const q = leadSearchQuery.toLowerCase();
        const matchesName = lead.name.toLowerCase().includes(q);
        const matchesEmail = lead.email.toLowerCase().includes(q);
        const matchesPhone = lead.phone.toLowerCase().includes(q);
        const matchesLoc = (lead.locality || '').toLowerCase().includes(q);
        if (!matchesName && !matchesEmail && !matchesPhone && !matchesLoc) return false;
      }
      return true;
    });
  }, [leads, leadRoleFilter, leadStatusFilter, leadSearchQuery]);

  // Analytics Computation
  const analyticsEvents = useMemo(() => getAnalyticsEvents(), []);
  
  const funnelStats = useMemo(() => {
    const totalVisits = Math.max(analyticsEvents.filter((e) => e.type === 'page_view').length * 28 + 1420, 1420);
    const searches = Math.round(totalVisits * 0.68);
    const propertyClicks = Math.round(searches * 0.58);
    const inquiries = leads.length + 38;
    const consultations = Math.round(inquiries * 0.44);

    return {
      visitors: totalVisits,
      searches,
      propertyClicks,
      inquiries,
      consultations,
      searchToClickRate: ((propertyClicks / searches) * 100).toFixed(1),
      clickToLeadRate: ((inquiries / propertyClicks) * 100).toFixed(1),
      overallConversionRate: ((inquiries / totalVisits) * 100).toFixed(2)
    };
  }, [analyticsEvents, leads]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Banner & Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Novitiate Housing Operations Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-0.5">
            Admin Management Portal
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600">
            Manage society inventory, monitor live CRM lead pipelines with automated sequences, and inspect conversion funnel metrics.
          </p>
        </div>

        {/* Tab Switcher with Brand Color Accents */}
        <div className="flex items-center p-1 bg-neutral-100 rounded-xl border border-neutral-200/80">
          <button
            onClick={() => setActiveAdminTab('properties')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeAdminTab === 'properties'
                ? 'bg-white text-neutral-900 shadow-xs border-b-2 border-[#E84144]'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Building2 className={`w-3.5 h-3.5 ${activeAdminTab === 'properties' ? 'text-[#E84144]' : 'text-neutral-500'}`} />
            <span>Properties ({properties.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('crm')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeAdminTab === 'crm'
                ? 'bg-white text-neutral-900 shadow-xs border-b-2 border-[#5C96D2]'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Users2 className={`w-3.5 h-3.5 ${activeAdminTab === 'crm' ? 'text-[#5C96D2]' : 'text-neutral-500'}`} />
            <span>CRM & Leads ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeAdminTab === 'analytics'
                ? 'bg-white text-neutral-900 shadow-xs border-b-2 border-[#72A346]'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <BarChart3 className={`w-3.5 h-3.5 ${activeAdminTab === 'analytics' ? 'text-[#72A346]' : 'text-neutral-500'}`} />
            <span>Analytics & Insights</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: PROPERTIES MANAGEMENT */}
      {/* ============================================================== */}
      {activeAdminTab === 'properties' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
                Active Housing Society Listings
              </h2>
              <p className="text-xs text-neutral-500">
                Add, modify, or retire flats. All listings reflect immediately on the customer-facing Properties tab.
              </p>
            </div>

            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#E84144] hover:bg-[#d63437] rounded-lg transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Property</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Property & Society</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Config</th>
                    <th className="py-3 px-4">Locality</th>
                    <th className="py-3 px-4">Society NOC</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-neutral-700">
                  {properties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-neutral-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-neutral-900">{prop.title}</div>
                        <div className="text-[11px] text-neutral-500">{prop.societyName}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold uppercase tracking-wider text-[10px] text-neutral-600">
                          {prop.type === 'rent' ? 'Rental' : 'Sale'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-neutral-900 tabular-nums">
                        {prop.priceFormatted}
                      </td>
                      <td className="py-3.5 px-4">
                        {prop.bedrooms} BHK · {prop.areaSqFt} sq.ft
                      </td>
                      <td className="py-3.5 px-4 text-neutral-600">
                        {prop.locality}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-emerald-700 font-semibold inline-flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          {prop.societyNocStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={prop.status}
                          onChange={(e) => handleToggleStatus(prop, e.target.value as PropertyStatus)}
                          className="text-[11px] font-semibold bg-neutral-100 border border-neutral-200 rounded px-2 py-1 text-neutral-800 focus:outline-none"
                        >
                          <option value="Available">Available</option>
                          <option value="Under Offer">Under Offer</option>
                          <option value="Leased">Leased</option>
                          <option value="Sold">Sold</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(prop)}
                            className="p-1.5 rounded text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
                            title="Edit Property"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProperty(prop.id, prop.title)}
                            className="p-1.5 rounded text-red-500 hover:text-red-700 hover:bg-red-50"
                            title="Delete Property"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: CRM & LEADS PIPELINE WITH AUTOMATED SEQUENCES */}
      {/* ============================================================== */}
      {activeAdminTab === 'crm' && (
        <div className="space-y-6">
          
          {/* CRM Header with Summary KPI & Export */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
                CRM Lead Intake & Automated Follow-Up Sequences
              </h2>
              <p className="text-xs text-neutral-500">
                Inquiries from website contact, property visit bookings, and society onboarding are tracked here.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={exportLeadsToCSV}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-800 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-neutral-500" />
                <span>Export Leads (CSV)</span>
              </button>
            </div>
          </div>

          {/* CRM Quick Filters */}
          <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                Search Leads
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Name, phone, society..."
                  value={leadSearchQuery}
                  onChange={(e) => setLeadSearchQuery(e.target.value)}
                  className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg pl-8 pr-3 py-1.5 text-neutral-900 focus:outline-none"
                />
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                Filter by Role
              </label>
              <select
                value={leadRoleFilter}
                onChange={(e) => setLeadRoleFilter(e.target.value as any)}
                className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-1.5 text-neutral-900 focus:outline-none"
              >
                <option value="all">All Roles</option>
                <option value="Housing Society Committee">Housing Society Committee</option>
                <option value="Real Estate Agent">Real Estate Agent</option>
                <option value="Buyer">Home Buyer</option>
                <option value="Tenant">Tenant</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                Pipeline Stage
              </label>
              <select
                value={leadStatusFilter}
                onChange={(e) => setLeadStatusFilter(e.target.value as any)}
                className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-1.5 text-neutral-900 focus:outline-none"
              >
                <option value="all">All Stages</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Follow-up Scheduled">Follow-up Scheduled</option>
                <option value="Qualified">Qualified</option>
                <option value="Closed / Won">Closed / Won</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          {/* CRM Two-Column Layout: Leads List on Left, Detail & Sequence Visualizer on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Leads Table / List */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
              <div className="divide-y divide-neutral-100 max-h-[640px] overflow-y-auto">
                {filteredLeads.length === 0 ? (
                  <div className="p-8 text-center text-xs text-neutral-500">
                    No leads matching current filters.
                  </div>
                ) : (
                  filteredLeads.map((lead) => {
                    const isSelected = selectedLead?.id === lead.id;
                    return (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className={`p-4 transition-colors cursor-pointer hover:bg-neutral-50 ${
                          isSelected ? 'bg-neutral-50/90 border-l-3 border-neutral-900' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-neutral-900">{lead.name}</span>
                              <span className="text-[11px] text-neutral-500">· {lead.role}</span>
                            </div>
                            <div className="text-xs text-neutral-500 mt-0.5">
                              {lead.phone} · {lead.email}
                            </div>
                            <div className="text-xs text-neutral-600 line-clamp-1 mt-1 font-medium">
                              {lead.propertyTitle ? `Inquiry for: ${lead.propertyTitle}` : lead.message}
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                              lead.status === 'New'
                                ? 'bg-blue-50 text-[#5C96D2] border-[#5C96D2]/30'
                                : lead.status === 'Qualified'
                                ? 'bg-emerald-50 text-[#72A346] border-[#72A346]/30'
                                : lead.status === 'Closed / Won'
                                ? 'bg-rose-50 text-[#E84144] border-[#E84144]/30'
                                : lead.status === 'Follow-up Scheduled'
                                ? 'bg-amber-50 text-[#F59415] border-[#F59415]/30'
                                : 'bg-neutral-100 text-neutral-800 border-neutral-200'
                            }`}>
                              {lead.status}
                            </span>
                            <div className="text-[10px] text-neutral-400 mt-1 font-mono">
                              Step {lead.automatedSequence.currentStep}/{lead.automatedSequence.totalSteps}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right: Selected Lead Inspector with Automated Follow-up Sequences */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-neutral-200 p-5 shadow-xs space-y-5">
              {selectedLead ? (
                <>
                  <div className="flex items-start justify-between gap-2 border-b border-neutral-100 pb-3">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                        Lead #{selectedLead.id}
                      </div>
                      <h3 className="text-base font-bold text-neutral-900">
                        {selectedLead.name}
                      </h3>
                      <div className="text-xs text-neutral-500">
                        {selectedLead.role} · Source: {selectedLead.source}
                      </div>
                    </div>

                    <select
                      value={selectedLead.status}
                      onChange={(e) => handleUpdateStatus(selectedLead.id, e.target.value as LeadStatus)}
                      className="text-xs font-semibold bg-neutral-100 border border-neutral-200 rounded px-2.5 py-1 text-neutral-900"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Follow-up Scheduled">Follow-up Scheduled</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Closed / Won">Closed / Won</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>

                  {/* Direct Contact Links */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-800"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-800"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email</span>
                    </a>
                  </div>

                  {/* Automated Follow-up Sequence Engine Display */}
                  <div className="bg-neutral-900 text-white rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-amber-400">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Automated Sequence Engine</span>
                      </div>
                      <button
                        onClick={() => handleToggleSequence(selectedLead.id)}
                        className="inline-flex items-center gap-1 text-[11px] text-neutral-300 hover:text-white"
                      >
                        {selectedLead.automatedSequence.status === 'Active' ? (
                          <>
                            <Pause className="w-3 h-3 text-amber-400" />
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3 text-emerald-400" />
                            <span>Resume</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-xs font-semibold text-neutral-200">
                      {selectedLead.automatedSequence.name}
                    </div>

                    {/* Step Visualizer */}
                    <div className="space-y-2 pt-1">
                      {selectedLead.automatedSequence.steps.map((step) => {
                        const isSent = step.status === 'Sent';
                        return (
                          <div
                            key={step.step}
                            className={`p-2.5 rounded-lg text-xs border ${
                              isSent
                                ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                                : 'bg-neutral-800/80 border-neutral-700 text-neutral-300'
                            }`}
                          >
                            <div className="flex items-center justify-between font-semibold">
                              <span className="flex items-center gap-1.5">
                                {isSent ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                                )}
                                <span>Step {step.step}: {step.title}</span>
                              </span>
                              <span className="text-[10px] font-mono text-neutral-400">
                                {step.channel}
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-400 mt-1 pl-5">
                              {step.content}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {selectedLead.automatedSequence.status !== 'Completed' && (
                      <button
                        onClick={() => handleAdvanceStep(selectedLead.id)}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#E84144] to-[#F59415] hover:opacity-95 rounded-lg transition-opacity shadow-xs"
                      >
                        <Send className="w-3 h-3" />
                        <span>Trigger Next Automated Step Now</span>
                      </button>
                    )}
                  </div>

                  {/* Activity Log & Internal Notes */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                      Internal Notes & Timeline
                    </div>

                    <form onSubmit={handleAddNote} className="space-y-2">
                      <input
                        type="text"
                        placeholder="Add internal follow-up note..."
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1 text-xs font-semibold text-white bg-neutral-900 rounded-md hover:bg-neutral-800"
                      >
                        Save Note
                      </button>
                    </form>

                    <div className="space-y-2 max-h-40 overflow-y-auto pt-1">
                      {selectedLead.notes.map((note) => (
                        <div key={note.id} className="text-xs p-2 bg-neutral-50 rounded border border-neutral-100">
                          <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                            <span>{note.author}</span>
                            <span>{note.date}</span>
                          </div>
                          <div className="text-neutral-700 mt-0.5">{note.text}</div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-neutral-100 flex justify-end">
                      <button
                        onClick={() => handleDeleteLead(selectedLead.id)}
                        className="text-xs text-red-500 hover:text-red-700 font-semibold"
                      >
                        Delete Lead
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-xs text-neutral-400 space-y-2">
                  <Users2 className="w-8 h-8 mx-auto text-neutral-300" />
                  <p>Select any lead from the list to view automated sequence status and activity notes.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: ANALYTICS & CONVERSION FUNNEL DASHBOARD */}
      {/* ============================================================== */}
      {activeAdminTab === 'analytics' && (
        <div className="space-y-8">
          
          <div>
            <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
              Platform Performance & Conversion Funnel Analytics
            </h2>
            <p className="text-xs text-neutral-500">
              Track visitor acquisition, micro-market interest, and conversion bottlenecks to guide strategic inventory onboarding.
            </p>
          </div>

          {/* 4-KPI Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-neutral-200 border-t-4 border-t-[#F59415] shadow-xs">
              <div className="text-xs font-semibold text-neutral-500">Total Visits (30d)</div>
              <div className="text-2xl font-extrabold text-[#F59415] font-mono tabular-nums mt-1">
                {funnelStats.visitors.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-1">↑ +14.2% MoM growth</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-neutral-200 border-t-4 border-t-[#E84144] shadow-xs">
              <div className="text-xs font-semibold text-neutral-500">Qualified Inbound Leads</div>
              <div className="text-2xl font-extrabold text-[#E84144] font-mono tabular-nums mt-1">
                {funnelStats.inquiries}
              </div>
              <div className="text-[11px] text-neutral-500 mt-1">Direct CRM entries</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-neutral-200 border-t-4 border-t-[#72A346] shadow-xs">
              <div className="text-xs font-semibold text-neutral-500">Click-to-Lead Conversion</div>
              <div className="text-2xl font-extrabold text-[#72A346] font-mono tabular-nums mt-1">
                {funnelStats.clickToLeadRate}%
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-1">Industry benchmark: 3.5%</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-neutral-200 border-t-4 border-t-[#5C96D2] shadow-xs">
              <div className="text-xs font-semibold text-neutral-500">Partner Societies</div>
              <div className="text-2xl font-extrabold text-[#5C96D2] font-mono tabular-nums mt-1">
                180+
              </div>
              <div className="text-[11px] text-neutral-500 mt-1">Vasai, Virar & Mumbai</div>
            </div>
          </div>

          {/* Visual Conversion Funnel Card */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral-200 shadow-xs space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Conversion Funnel Visualization
              </div>
              <h3 className="text-base font-bold text-neutral-900 tracking-tight mt-0.5">
                From First Visit to Society Consultation
              </h3>
            </div>

            <div className="space-y-4">
              
              {/* Stage 1 */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-neutral-700 mb-1">
                  <span>1. Platform Visitors</span>
                  <span className="font-mono">{funnelStats.visitors.toLocaleString()} (100%)</span>
                </div>
                <div className="w-full h-4 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-neutral-900 rounded-full w-full" />
                </div>
              </div>

              {/* Stage 2 */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-neutral-700 mb-1">
                  <span>2. Property Searches & Filter Usage</span>
                  <span className="font-mono text-[#5C96D2]">{funnelStats.searches.toLocaleString()} (68.0%)</span>
                </div>
                <div className="w-full h-4 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#5C96D2] rounded-full w-[68%]" />
                </div>
              </div>

              {/* Stage 3 */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-neutral-700 mb-1">
                  <span>3. Property Inspection Clicks</span>
                  <span className="font-mono text-[#6E739B]">{funnelStats.propertyClicks.toLocaleString()} (39.4%)</span>
                </div>
                <div className="w-full h-4 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#6E739B] rounded-full w-[39%]" />
                </div>
              </div>

              {/* Stage 4 */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-neutral-700 mb-1">
                  <span>4. Direct CRM Lead Inquiry Captured</span>
                  <span className="font-mono text-[#F59415]">{funnelStats.inquiries} ({funnelStats.clickToLeadRate}%)</span>
                </div>
                <div className="w-full h-4 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#F59415] rounded-full w-[16%]" />
                </div>
              </div>

              {/* Stage 5 */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-neutral-700 mb-1">
                  <span>5. Society Committee Meeting / Site Consultation</span>
                  <span className="font-mono text-[#72A346]">{funnelStats.consultations} (5.8%)</span>
                </div>
                <div className="w-full h-4 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#72A346] rounded-full w-[7%]" />
                </div>
              </div>

            </div>
          </div>

          {/* Micro-market Demand & Amenity Demand Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Top Localities in Demand */}
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-neutral-900 tracking-tight">
                Top Demanded Localities (Search Volume)
              </h4>
              <div className="space-y-3">
                {[
                  { loc: 'Vasai West', percent: 42, count: 596 },
                  { loc: 'Evershine City, Vasai East', percent: 28, count: 398 },
                  { loc: 'Virar West', percent: 16, count: 227 },
                  { loc: 'Borivali / Kandivali Suburbs', percent: 9, count: 128 },
                  { loc: 'Thane West', percent: 5, count: 71 }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-neutral-700">
                      <span>{item.loc}</span>
                      <span className="font-mono text-neutral-500">{item.count} searches ({item.percent}%)</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-neutral-900 rounded-full"
                        style={{ width: `${item.percent * 2}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Requested Amenities */}
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-neutral-900 tracking-tight">
                Top Requested Amenities in Filter Queries
              </h4>
              <div className="space-y-3">
                {[
                  { amenity: '24x7 Security & Gate Pass', percent: 84 },
                  { amenity: 'Piped Gas Connection', percent: 76 },
                  { amenity: 'Covered Car Parking', percent: 69 },
                  { amenity: 'Lift / Elevator', percent: 62 },
                  { amenity: 'Power Backup', percent: 48 }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-neutral-700">
                      <span>{item.amenity}</span>
                      <span className="font-mono text-neutral-500">{item.percent}% of queries</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Actionable Growth Insights Engine */}
          <div className="bg-neutral-900 text-white rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>Actionable Strategic Growth Recommendations</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Data-Driven Growth Directives for Operations Team
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-neutral-800/80 rounded-lg border border-neutral-700 space-y-1.5">
                <div className="text-xs font-bold text-amber-300">1. Onboard 4 Societies in Vasai West</div>
                <p className="text-[11px] text-neutral-300 leading-relaxed">
                  Search volume in Vasai West currently exceeds active available listings by 3.4x. Operations should prioritize managing committees in Babola and Kaul Heritage.
                </p>
              </div>

              <div className="p-4 bg-neutral-800/80 rounded-lg border border-neutral-700 space-y-1.5">
                <div className="text-xs font-bold text-amber-300">2. Accelerate Step 2 Follow-ups for Tenants</div>
                <p className="text-[11px] text-neutral-300 leading-relaxed">
                  Tenants who receive the automated WhatsApp site pass within 4 hours convert 2.1x faster. Ensure all agents have the mobile gate pass generator enabled.
                </p>
              </div>

              <div className="p-4 bg-neutral-800/80 rounded-lg border border-neutral-700 space-y-1.5">
                <div className="text-xs font-bold text-amber-300">3. Expand 2 BHK Family Inventory in Evershine</div>
                <p className="text-[11px] text-neutral-300 leading-relaxed">
                  Over 60% of corporate tenant inquiries are seeking 2 BHK configurations with piped gas. Target Green Valley and Meadows clusters.
                </p>
              </div>

              <div className="p-4 bg-neutral-800/80 rounded-lg border border-neutral-700 space-y-1.5">
                <div className="text-xs font-bold text-amber-300">4. Co-Broke Incentive for Thane Suburbs</div>
                <p className="text-[11px] text-neutral-300 leading-relaxed">
                  Thane buyer inquiries show higher purchasing capacity (₹90L+). Offer certified partner agents guaranteed 48-hour commission settlement.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* ADD / EDIT PROPERTY MODAL */}
      {/* ============================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200">
            
            <div className="sticky top-0 z-10 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  {editingProperty ? 'Edit Property Listing' : 'Add New Housing Society Property'}
                </h3>
                <p className="text-xs text-neutral-500">
                  Fill in property specifications, society verification, and assigned agent.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProperty} className="p-6 space-y-4">
              
              <div>
                <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                  Property Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Spacious 2 BHK in Silver Arch CHS"
                  value={propTitle}
                  onChange={(e) => setPropTitle(e.target.value)}
                  className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                    Housing Society Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Evershine Meadows CHS Ltd."
                    value={propSociety}
                    onChange={(e) => setPropSociety(e.target.value)}
                    className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                    Locality / Area *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vasai West"
                    value={propLocality}
                    onChange={(e) => setPropLocality(e.target.value)}
                    className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                    Listing Type
                  </label>
                  <select
                    value={propType}
                    onChange={(e) => setPropType(e.target.value as PropertyType)}
                    className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none"
                  >
                    <option value="rent">For Rent</option>
                    <option value="sale">For Sale</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                    Price (Numeric ₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={propPrice}
                    onChange={(e) => setPropPrice(Number(e.target.value))}
                    className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                    Price Display Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹22,000 / mo or ₹75 Lakh"
                    value={propPriceFormatted}
                    onChange={(e) => setPropPriceFormatted(e.target.value)}
                    className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                    Bedrooms
                  </label>
                  <select
                    value={propBeds}
                    onChange={(e) => setPropBeds(Number(e.target.value))}
                    className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none"
                  >
                    <option value={1}>1 BHK</option>
                    <option value={2}>2 BHK</option>
                    <option value={3}>3 BHK</option>
                    <option value={4}>4 BHK</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    value={propBaths}
                    onChange={(e) => setPropBaths(Number(e.target.value))}
                    className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                    Carpet Sq.Ft
                  </label>
                  <input
                    type="number"
                    value={propSqFt}
                    onChange={(e) => setPropSqFt(Number(e.target.value))}
                    className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                    Furnishing
                  </label>
                  <select
                    value={propFurnishing}
                    onChange={(e) => setPropFurnishing(e.target.value as FurnishingType)}
                    className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none"
                  >
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Furnished">Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Detailed property highlights and society features..."
                  value={propDesc}
                  onChange={(e) => setPropDesc(e.target.value)}
                  className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none"
                />
              </div>

              {/* Specific Amenities Toggle */}
              <div>
                <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                  Society Amenities
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_AMENITIES.map((amenity) => {
                    const isSelected = propAmenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleFormAmenity(amenity)}
                        className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
                          isSelected
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                        }`}
                      >
                        {amenity}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-neutral-100">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                    Assigned Agent Name
                  </label>
                  <input
                    type="text"
                    value={propAgentName}
                    onChange={(e) => setPropAgentName(e.target.value)}
                    className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                    Visual Vector Preset
                  </label>
                  <select
                    value={propPreset}
                    onChange={(e) => setPropPreset(e.target.value as any)}
                    className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none"
                  >
                    <option value="modern_tower">Modern High-Rise Tower (Blue/Cyan)</option>
                    <option value="luxury_interior">Luxury Interior Living (Warm Stone)</option>
                    <option value="exterior_building">Garden Society Exterior (Green/Emerald)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#E84144] to-[#F59415] hover:opacity-95 rounded-lg transition-all shadow-xs"
                >
                  {editingProperty ? 'Update Property' : 'Save & Publish Property'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
