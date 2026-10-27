import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, Check, ShieldCheck, X, Phone, Mail, User, Send, CheckCircle2, MapPin, Building, Calendar, Layers, Compass, Sparkles } from 'lucide-react';
import { Property, FilterState, LeadRole } from '../types';
import { PropertyVisual } from './PropertyVisual';
import { createLead, logAnalyticsEvent } from '../services/storageService';

interface PropertiesTabProps {
  properties: Property[];
  initialFilters?: Partial<FilterState>;
  onInquirySubmitted?: () => void;
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

export const PropertiesTab: React.FC<PropertiesTabProps> = ({
  properties,
  initialFilters = {},
  onInquirySubmitted
}) => {
  // Filter States
  const [query, setQuery] = useState(initialFilters.query || '');
  const [type, setType] = useState<'all' | 'rent' | 'sale'>(initialFilters.type || 'all');
  const [locality, setLocality] = useState(initialFilters.locality || '');
  const [bedrooms, setBedrooms] = useState<number | 'all'>(initialFilters.bedrooms || 'all');
  const [priceMax, setPriceMax] = useState<number>(initialFilters.priceMax || 20000000);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(initialFilters.amenities || []);
  const [nocVerifiedOnly, setNocVerifiedOnly] = useState<boolean>(initialFilters.nocVerifiedOnly || false);
  const [sortBy, setSortBy] = useState<'newest' | 'price_low' | 'price_high' | 'area'>('newest');

  // Selected property for modal view & direct lead capture
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Property Inquiry Form State inside Modal
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryRole, setInquiryRole] = useState<LeadRole>('Buyer');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryLoading, setInquiryLoading] = useState(false);

  // Available localities from data
  const uniqueLocalities = useMemo(() => {
    const set = new Set<string>();
    properties.forEach((p) => {
      set.add(p.locality);
    });
    return Array.from(set).sort();
  }, [properties]);

  // Filter logic
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Query search
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(q);
        const matchesSociety = prop.societyName.toLowerCase().includes(q);
        const matchesLocality = prop.locality.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSociety && !matchesLocality) return false;
      }

      // Type
      if (type !== 'all' && prop.type !== type) return false;

      // Locality
      if (locality && !prop.locality.toLowerCase().includes(locality.toLowerCase())) return false;

      // Bedrooms
      if (bedrooms !== 'all' && prop.bedrooms !== bedrooms) return false;

      // Price
      if (prop.price > priceMax) return false;

      // NOC Verified
      if (nocVerifiedOnly && prop.societyNocStatus !== 'Verified') return false;

      // Amenities check
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every((amenity) =>
          prop.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'area') return b.areaSqFt - a.areaSqFt;
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    });
  }, [properties, query, type, locality, bedrooms, priceMax, selectedAmenities, nocVerifiedOnly, sortBy]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
    logAnalyticsEvent('filter_use', `Toggled amenity: ${amenity}`);
  };

  const handleOpenProperty = (prop: Property) => {
    setSelectedProperty(prop);
    setInquiryRole(prop.type === 'rent' ? 'Tenant' : 'Buyer');
    setInquiryMessage(
      `Hello, I would like to schedule a site inspection for "${prop.title}" in ${prop.societyName}. Please share the society verification checklist.`
    );
    setInquirySuccess(false);
    logAnalyticsEvent('property_view', `Viewed property: ${prop.title}`, { propertyId: prop.id });
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProperty || !inquiryName || !inquiryPhone) return;

    setInquiryLoading(true);

    setTimeout(() => {
      createLead({
        name: inquiryName,
        email: inquiryEmail || `${inquiryName.toLowerCase().replace(/\s+/g, '')}@lead.com`,
        phone: inquiryPhone,
        role: inquiryRole,
        propertyId: selectedProperty.id,
        propertyTitle: selectedProperty.title,
        locality: selectedProperty.locality,
        budget: selectedProperty.priceFormatted,
        message: inquiryMessage,
        source: 'Property Inquiry'
      });

      setInquiryLoading(false);
      setInquirySuccess(true);
      if (onInquirySubmitted) onInquirySubmitted();
    }, 400);
  };

  const resetFilters = () => {
    setQuery('');
    setType('all');
    setLocality('');
    setBedrooms('all');
    setPriceMax(20000000);
    setSelectedAmenities([]);
    setNocVerifiedOnly(false);
    setSortBy('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header section with SEO and context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
            Verified Property Marketplace
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Properties in Co-operative Housing Societies
          </h1>
          <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
            Every listing features verified society credentials, reference-checked tenancy protocols, and pre-cleared NOC records.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
          <span className="font-mono tabular-nums text-neutral-900 font-bold">{filteredProperties.length}</span>
          <span>Properties Found</span>
          <button
            onClick={resetFilters}
            className="ml-3 text-xs text-neutral-600 hover:text-neutral-900 underline"
          >
            Reset All Filters
          </button>
        </div>
      </div>

      {/* Main Filter Suite */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs space-y-5">
        
        {/* Top Filter Bar: Search, Type, Locality, Bedrooms, Sort */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Keyword Search */}
          <div className="relative">
            <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
              Search Keywords
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Society, road, locality..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg pl-8 pr-3 py-2 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Type Segmented Control with Brand Colors */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
              Listing Type
            </label>
            <div className="flex items-center p-0.5 bg-neutral-100 rounded-lg text-xs font-medium">
              <button
                type="button"
                onClick={() => setType('all')}
                className={`flex-1 py-1.5 rounded-md transition-colors ${
                  type === 'all' ? 'bg-white text-neutral-900 font-bold shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setType('rent')}
                className={`flex-1 py-1.5 rounded-md transition-colors ${
                  type === 'rent' ? 'bg-[#E84144] text-white font-bold shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Rent
              </button>
              <button
                type="button"
                onClick={() => setType('sale')}
                className={`flex-1 py-1.5 rounded-md transition-colors ${
                  type === 'sale' ? 'bg-[#F59415] text-white font-bold shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Sale
              </button>
            </div>
          </div>

          {/* Locality Dropdown */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
              Locality
            </label>
            <select
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            >
              <option value="">All Localities</option>
              {uniqueLocalities.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Bedrooms / BHK */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
              Bedrooms (BHK)
            </label>
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            >
              <option value="all">Any BHK</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            >
              <option value="newest">Newest First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="area">Area: Largest First</option>
            </select>
          </div>

        </div>

        {/* Second Row: Price Slider & Society NOC toggle */}
        <div className="pt-3 border-t border-neutral-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex-1 max-w-md">
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-700 mb-1">
              <span>Max Price Bracket</span>
              <span className="font-mono text-neutral-900 font-bold">
                {priceMax >= 10000000
                  ? `₹${(priceMax / 10000000).toFixed(2)} Crore`
                  : priceMax >= 100000
                  ? `₹${(priceMax / 100000).toFixed(0)} Lakh`
                  : `₹${priceMax.toLocaleString()} / mo`}
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={20000000}
              step={10000}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-neutral-900 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-700 select-none">
              <input
                type="checkbox"
                checked={nocVerifiedOnly}
                onChange={(e) => setNocVerifiedOnly(e.target.checked)}
                className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 w-4 h-4"
              />
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Show Only 100% NOC Pre-Cleared Societies
              </span>
            </label>
          </div>

        </div>

        {/* Third Row: Specific Amenity Requirements */}
        <div className="pt-3 border-t border-neutral-100 space-y-2">
          <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
            Filter by Specific Amenity Requirements
          </div>
          <div className="flex flex-wrap gap-2">
            {ALL_AMENITIES.map((amenity) => {
              const isChecked = selectedAmenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                    isChecked
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5" />}
                  <span>{amenity}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Property Cards Grid */}
      {filteredProperties.length === 0 ? (
        <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-neutral-100 mx-auto flex items-center justify-center text-neutral-400">
            <Building className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-neutral-900">
            No properties found matching your criteria
          </h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto">
            Try adjusting your price range, clearing specific amenity requirements, or selecting "All Localities".
          </p>
          <div className="pt-2">
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-xs font-bold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Visual Image container with fallback */}
                <div
                  className="cursor-pointer"
                  onClick={() => handleOpenProperty(property)}
                >
                  <PropertyVisual
                    preset={property.imagePreset}
                    title={property.title}
                    type={property.type}
                    className="h-48 w-full group-hover:scale-[1.01] transition-transform duration-300"
                  />
                </div>

                <div className="p-5 space-y-3">
                  
                  {/* Clean unboxed metadata with separators (Anti-Slop Zero Pill Discipline) */}
                  <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                    <span>{property.bedrooms} BHK</span>
                    <span aria-hidden="true">·</span>
                    <span>{property.areaSqFt} sq.ft</span>
                    <span aria-hidden="true">·</span>
                    <span>{property.furnishing}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      NOC Ready
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => handleOpenProperty(property)}
                    className="text-base font-bold text-neutral-900 hover:text-neutral-700 transition-colors cursor-pointer line-clamp-1"
                  >
                    {property.title}
                  </h3>

                  {/* Society & Locality */}
                  <p className="text-xs text-neutral-500 line-clamp-1 font-medium flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                    <span>{property.societyName} · {property.locality}</span>
                  </p>

                  {/* Description snippet */}
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {property.description}
                  </p>

                  {/* Key Amenities preview */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {property.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="text-[11px] text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded"
                      >
                        {amenity}
                      </span>
                    ))}
                    {property.amenities.length > 3 && (
                      <span className="text-[11px] text-neutral-400 py-0.5">
                        +{property.amenities.length - 3} more
                      </span>
                    )}
                  </div>

                </div>
              </div>

              {/* Card Footer with Price and Schedule Visit */}
              <div className="px-5 pb-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <div className="text-base font-extrabold text-neutral-900 font-mono tabular-nums">
                    {property.priceFormatted}
                  </div>
                  {property.type === 'rent' && property.deposit && (
                    <div className="text-[11px] text-neutral-400 font-mono">
                      Dep: ₹{property.deposit.toLocaleString()}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenProperty(property)}
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#E84144] rounded-lg hover:bg-[#d63437] transition-colors shadow-xs"
                >
                  Schedule Visit
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Property Details & Direct CRM Lead Inquiry Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200">
            
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
                  <span className="uppercase tracking-wider">
                    {selectedProperty.type === 'rent' ? 'Rental Property' : 'Property For Sale'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Society NOC Clearance Verified
                  </span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 line-clamp-1 mt-0.5">
                  {selectedProperty.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProperty(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Visual Banner */}
              <PropertyVisual
                preset={selectedProperty.imagePreset}
                title={selectedProperty.title}
                type={selectedProperty.type}
                className="h-64 w-full rounded-xl"
              />

              {/* Key Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                  <div className="text-[11px] text-neutral-500 uppercase font-semibold">Price</div>
                  <div className="text-sm font-bold text-neutral-900 font-mono tabular-nums mt-0.5">
                    {selectedProperty.priceFormatted}
                  </div>
                </div>
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                  <div className="text-[11px] text-neutral-500 uppercase font-semibold">Carpet Area</div>
                  <div className="text-sm font-bold text-neutral-900 font-mono tabular-nums mt-0.5">
                    {selectedProperty.areaSqFt} sq.ft
                  </div>
                </div>
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                  <div className="text-[11px] text-neutral-500 uppercase font-semibold">Floor & Wing</div>
                  <div className="text-sm font-bold text-neutral-900 mt-0.5">
                    {selectedProperty.floor}
                  </div>
                </div>
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                  <div className="text-[11px] text-neutral-500 uppercase font-semibold">Tenancy Term</div>
                  <div className="text-sm font-bold text-neutral-900 mt-0.5">
                    {selectedProperty.leaseTermYears ? `${selectedProperty.leaseTermYears} Years Standard` : 'Immediate Sale'}
                  </div>
                </div>
              </div>

              {/* Description & Society Protocol */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  Description & Society Background
                </h4>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {selectedProperty.description}
                </p>
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200/80 text-xs text-emerald-900 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Novitiate Society Guarantee:</span> This apartment in <span className="font-semibold">{selectedProperty.societyName}</span> is registered with our platform. Tenant credentials undergo workplace reference verification and managing committee approval prior to license agreement execution, guaranteeing zero move-in delays.
                  </div>
                </div>
              </div>

              {/* Amenities Checklist */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  Society Amenities & Features
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selectedProperty.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 text-xs text-neutral-700 bg-neutral-50 p-2 rounded-lg border border-neutral-100"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Lead Capture Form for this property */}
              <div className="bg-neutral-900 text-white rounded-xl p-5 sm:p-6 space-y-4">
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Schedule Site Visit & Society Inspection</span>
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Submitting this form captures your inquiry directly into our CRM and triggers an automated confirmation sequence with the society visit itinerary.
                  </p>
                </div>

                {inquirySuccess ? (
                  <div className="bg-emerald-950/80 border border-emerald-600 p-4 rounded-lg text-emerald-200 text-xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>Inquiry Registered in CRM</span>
                    </div>
                    <p>
                      Thank you, <span className="font-semibold text-white">{inquiryName}</span>. Your inquiry for <span className="font-semibold text-white">{selectedProperty.title}</span> has been routed to Certified Agent <span className="font-semibold text-white">{selectedProperty.agent.name}</span>.
                    </p>
                    <div className="p-2.5 bg-black/40 rounded border border-emerald-500/30 text-[11px] space-y-1">
                      <div className="font-semibold text-amber-300">Automated Follow-up Sequence Triggered:</div>
                      <div>• Step 1: Immediate property prospectus & title check sent via WhatsApp</div>
                      <div>• Step 2: Agent callback scheduled within 2 business hours</div>
                      <div>• Step 3: Society visitor gate pass issued for site inspection</div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Anand Kulkarni"
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          className="w-full text-xs font-medium bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                          Phone Number (WhatsApp) *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 98200 12345"
                          value={inquiryPhone}
                          onChange={(e) => setInquiryPhone(e.target.value)}
                          className="w-full text-xs font-medium bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. anand@example.com"
                          value={inquiryEmail}
                          onChange={(e) => setInquiryEmail(e.target.value)}
                          className="w-full text-xs font-medium bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                          Your Role
                        </label>
                        <select
                          value={inquiryRole}
                          onChange={(e) => setInquiryRole(e.target.value as any)}
                          className="w-full text-xs font-medium bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                        >
                          <option value="Buyer">Prospective Buyer</option>
                          <option value="Tenant">Prospective Tenant</option>
                          <option value="Real Estate Agent">Partner Agent</option>
                          <option value="Housing Society Committee">Society Committee Member</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                        Inquiry / Preferred Inspection Time
                      </label>
                      <textarea
                        rows={2}
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        className="w-full text-xs font-medium bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={inquiryLoading}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#E84144] to-[#F59415] hover:opacity-95 rounded-lg transition-all shadow-sm cursor-pointer disabled:opacity-50"
                    >
                      {inquiryLoading ? (
                        <span>Logging Inquiry in CRM...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Inquiry & Trigger Automated Sequence</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Agent Representative Card */}
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div>
                  <div className="text-[11px] text-neutral-400 uppercase font-semibold">Assigned Certified Agent</div>
                  <div className="font-bold text-neutral-900 text-sm">{selectedProperty.agent.name}</div>
                  <div className="text-neutral-500">MahaRERA Reg: {selectedProperty.agent.reraNumber}</div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${selectedProperty.agent.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-neutral-200 font-semibold text-neutral-800 hover:bg-neutral-100"
                  >
                    <Phone className="w-3.5 h-3.5 text-neutral-600" />
                    <span>Call Agent</span>
                  </a>
                  <a
                    href={`mailto:${selectedProperty.agent.email}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-neutral-200 font-semibold text-neutral-800 hover:bg-neutral-100"
                  >
                    <Mail className="w-3.5 h-3.5 text-neutral-600" />
                    <span>Email</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
