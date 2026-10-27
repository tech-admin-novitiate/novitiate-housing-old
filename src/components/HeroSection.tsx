import React, { useState } from 'react';
import { Search, ShieldCheck, Building2, Users2, ArrowRight } from 'lucide-react';
import { FilterState } from '../types';

interface HeroSectionProps {
  onSearch: (filterParams: Partial<FilterState>) => void;
  onExploreSocieties: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch, onExploreSocieties }) => {
  const [purpose, setPurpose] = useState<'rent' | 'sale'>('rent');
  const [locality, setLocality] = useState('');
  const [bedrooms, setBedrooms] = useState<number | 'all'>('all');
  const [priceMax, setPriceMax] = useState<number>(purpose === 'rent' ? 40000 : 15000000);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      type: purpose,
      locality,
      bedrooms,
      priceMax: priceMax || (purpose === 'rent' ? 50000 : 20000000)
    });
  };

  return (
    <div className="relative bg-white border-b border-neutral-200 overflow-hidden">
      {/* Background Architectural Accent Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 relative">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          
          {/* Subtle Tagline kicker with brand dots */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-neutral-700 bg-neutral-50 px-3.5 py-1.5 rounded-full border border-neutral-200 shadow-2xs">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#F59415]" />
              <span className="w-2 h-2 rounded-full bg-[#E84144]" />
              <span className="w-2 h-2 rounded-full bg-[#5C96D2]" />
              <span className="w-2 h-2 rounded-full bg-[#72A346]" />
            </span>
            <ShieldCheck className="w-4 h-4 text-[#72A346]" />
            <span>Maharashtra Co-operative Societies Act Verified Network</span>
          </div>

          {/* Hero Headline with text-wrap: balance */}
          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight [text-wrap:balance]">
            Simplifying Tenancy & Sales for <span className="text-[#E84144]">Housing Societies</span>, <span className="text-[#5C96D2]">Agents</span>, and <span className="text-[#F59415]">Buyers</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Novitiate Housing bridges the gap between housing society management committees, real estate professionals, and property seekers. We conduct rigorous tenant credential checks, eliminate NOC bottlenecks, and ensure transparent transactions.
          </p>

          {/* Quick Search Card Container */}
          <div className="pt-2">
            <div className="bg-white p-3 sm:p-4 rounded-xl shadow-md border border-neutral-200 text-left">
              {/* Segmented Rent / Buy Toggle with Brand Colors */}
              <div className="flex items-center gap-2 mb-4 border-b border-neutral-100 pb-3">
                <button
                  type="button"
                  onClick={() => {
                    setPurpose('rent');
                    setPriceMax(40000);
                  }}
                  className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                    purpose === 'rent'
                      ? 'bg-[#E84144] text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  Looking to Rent
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPurpose('sale');
                    setPriceMax(15000000);
                  }}
                  className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                    purpose === 'sale'
                      ? 'bg-[#F59415] text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  Looking to Buy
                </button>
                <span className="text-xs text-neutral-500 ml-auto hidden sm:flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#72A346]" />
                  <span>100% Pre-cleared Society NOCs</span>
                </span>
              </div>

              {/* Form Controls */}
              <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {/* Locality */}
                <div className="sm:col-span-1">
                  <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                    Locality / Area
                  </label>
                  <select
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#E84144]"
                  >
                    <option value="">All Localities</option>
                    <option value="Vasai West">Vasai West</option>
                    <option value="Vasai East">Vasai East (Evershine)</option>
                    <option value="Virar West">Virar West</option>
                    <option value="Borivali">Borivali / Kandivali</option>
                    <option value="Thane">Thane</option>
                  </select>
                </div>

                {/* BHK */}
                <div className="sm:col-span-1">
                  <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                    Bedrooms
                  </label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                    className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#E84144]"
                  >
                    <option value="all">Any BHK</option>
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                  </select>
                </div>

                {/* Budget */}
                <div className="sm:col-span-1">
                  <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                    Max Budget
                  </label>
                  <select
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#E84144]"
                  >
                    {purpose === 'rent' ? (
                      <>
                        <option value={15000}>Up to ₹15,000 / mo</option>
                        <option value={25000}>Up to ₹25,000 / mo</option>
                        <option value={35000}>Up to ₹35,000 / mo</option>
                        <option value={50000}>Up to ₹50,000+ / mo</option>
                      </>
                    ) : (
                      <>
                        <option value={5000000}>Up to ₹50 Lakh</option>
                        <option value={7500000}>Up to ₹75 Lakh</option>
                        <option value={10000000}>Up to ₹1 Crore</option>
                        <option value={15000000}>Up to ₹1.5 Crore+</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Submit CTA */}
                <div className="sm:col-span-1 flex items-end">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#E84144] to-[#F59415] hover:opacity-95 rounded-lg transition-all shadow-sm"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Search Verified Homes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Quick Stakeholder Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-neutral-600">
            <span>Are you a Housing Society Committee Member?</span>
            <button
              onClick={onExploreSocieties}
              className="inline-flex items-center gap-1 font-bold text-[#E84144] hover:underline"
            >
              <span>Onboard Your Society</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Quantified Adjacency Proof Row with Brand Colors */}
        <div className="mt-14 pt-8 border-t border-neutral-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-3 bg-neutral-50/60 rounded-xl border border-neutral-100">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F59415] font-mono tabular-nums">
                180+
              </div>
              <div className="text-xs text-neutral-600 mt-1 font-semibold">
                Partner Housing Societies
              </div>
            </div>
            <div className="p-3 bg-neutral-50/60 rounded-xl border border-neutral-100">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#5C96D2] font-mono tabular-nums">
                4,200+
              </div>
              <div className="text-xs text-neutral-600 mt-1 font-semibold">
                Verified Tenancies Processed
              </div>
            </div>
            <div className="p-3 bg-neutral-50/60 rounded-xl border border-neutral-100">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#72A346] font-mono tabular-nums">
                0%
              </div>
              <div className="text-xs text-neutral-600 mt-1 font-semibold">
                NOC Dispute Incidents
              </div>
            </div>
            <div className="p-3 bg-neutral-50/60 rounded-xl border border-neutral-100">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#E84144] font-mono tabular-nums">
                14 Days
              </div>
              <div className="text-xs text-neutral-600 mt-1 font-semibold">
                Average Match-to-Movein
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
