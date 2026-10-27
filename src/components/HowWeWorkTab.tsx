import React, { useState } from 'react';
import { Building2, ShieldCheck, Briefcase, KeyRound, CheckCircle2, ArrowRight, FileText, ChevronDown, ChevronUp, Layers, CheckSquare } from 'lucide-react';

interface HowWeWorkTabProps {
  onNavigateToTab: (tab: string) => void;
}

export const HowWeWorkTab: React.FC<HowWeWorkTabProps> = ({ onNavigateToTab }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Novitiate Housing eliminate NOC complications with Housing Societies?',
      a: 'Under the Maharashtra Co-operative Societies Act, societies cannot unreasonably deny membership or tenancy NOCs when statutory prerequisites are met. Novitiate Housing bridges this by pre-vetting tenant/buyer credentials, conducting employer background checks, and preparing the standard society committee intimation packet in advance. The society committee is directly engaged from day one rather than confronted at the 11th hour.'
    },
    {
      q: 'Why do you emphasize structured 2–3 year tenancy durations?',
      a: 'Frequent 11-month tenant turnover causes significant administrative drain for managing committees (re-issuing gate passes, frequent moving vans damaging elevators, security risks, and unpaid maintenance arrears). Limiting tenancy to structured 2–3 year commitments brings community stability, steady rental yield for unit owners, and peace of mind for the society.'
    },
    {
      q: 'How are real estate agents empowered through this platform?',
      a: 'Traditional agents face gatekeeping from society watchmen and managing committees when showing flats. Novitiate Housing partners with MahaRERA-certified agents, granting them institutional access to pre-cleared society inventory across Vasai, Virar, Mumbai Suburbs, and Thane, backed by transparent 50/50 co-brokering agreements and guaranteed payouts.'
    },
    {
      q: 'What reference checks are conducted for prospective tenants?',
      a: 'We perform a three-point verification check: (1) Corporate employment & salary verification, (2) Previous housing society secretary/landlord conduct reference, and (3) Identity and biometric verification matching police intimation norms.'
    },
    {
      q: 'Is there any fee for a Housing Society to partner with Novitiate?',
      a: 'No. Housing Society onboarding and verification management is 100% free of charge for cooperative housing societies. Our platform simplifies the committee’s workload at zero cost.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Editorial Title / Hero */}
      <div className="max-w-3xl space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          The Novitiate Operating System
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight [text-wrap:balance]">
          Created to Simplify the Tenancy and Sales Process for Housing Societies, Agents, and Buyers
        </h1>
        <p className="text-base text-neutral-600 leading-relaxed">
          Novitiate Housing streamlines operations from start to finish. By involving housing societies in the entire tenancy and sales workflow, we resolve friction before it starts.
        </p>
      </div>

      {/* The 4 Core Tenets from novitiatehousing.com (Color-coded to trademark logo nodes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Tenet 1: Sky Blue #5C96D2 */}
        <div className="bg-white rounded-xl border border-neutral-200 p-7 shadow-xs space-y-3 hover:border-[#5C96D2] transition-colors group">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#5C96D2] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              01
            </div>
            <h2 className="text-lg font-bold text-neutral-900 tracking-tight group-hover:text-[#5C96D2] transition-colors">
              Simplifying the Process
            </h2>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Novitiate Housing involves housing societies in the entire tenancy process, making it more efficient. Rather than treating the managing committee as a bureaucratic hurdle, we partner with them from listing intake to final handover.
          </p>
          <div className="pt-2 text-xs text-neutral-500 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#5C96D2] shrink-0" />
            <span>Direct society portal integration & automated committee briefings</span>
          </div>
        </div>

        {/* Tenet 2: Coral Red #E84144 */}
        <div className="bg-white rounded-xl border border-neutral-200 p-7 shadow-xs space-y-3 hover:border-[#E84144] transition-colors group">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#E84144] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              02
            </div>
            <h2 className="text-lg font-bold text-neutral-900 tracking-tight group-hover:text-[#E84144] transition-colors">
              Resolving Tenancy Issues
            </h2>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed">
            We conduct reference checks to verify tenant credentials and limit tenancy durations to 2–3 years to mitigate common problems. This provides stability for homeowners, minimizes wear-and-tear on society infrastructure, and prevents recurring move-in disputes.
          </p>
          <div className="pt-2 text-xs text-neutral-500 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#E84144] shrink-0" />
            <span>Employer references, past society vetting & structured multi-year agreements</span>
          </div>
        </div>

        {/* Tenet 3: Warm Orange #F59415 */}
        <div className="bg-white rounded-xl border border-neutral-200 p-7 shadow-xs space-y-3 hover:border-[#F59415] transition-colors group">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#F59415] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              03
            </div>
            <h2 className="text-lg font-bold text-neutral-900 tracking-tight group-hover:text-[#F59415] transition-colors">
              Empowering Agents
            </h2>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Novitiate Housing provides agents with access to properties in various areas, which expands their options and potential revenue streams. Agents gain legitimate society entry authorization, pre-screened buyer leads, and guaranteed fee protection.
          </p>
          <div className="pt-2 text-xs text-neutral-500 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#F59415] shrink-0" />
            <span>Expanded micro-market inventory across Vasai, Virar, Mumbai & Thane</span>
          </div>
        </div>

        {/* Tenet 4: Leaf Green #72A346 */}
        <div className="bg-white rounded-xl border border-neutral-200 p-7 shadow-xs space-y-3 hover:border-[#72A346] transition-colors group">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#72A346] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              04
            </div>
            <h2 className="text-lg font-bold text-neutral-900 tracking-tight group-hover:text-[#72A346] transition-colors">
              Trusted Platform
            </h2>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed">
            The company offers secure, verified property deals, avoiding "No Objection Certificate" (NOC) complications and aligning with housing societies' preferences. Every listing comes with transparent title chain validation and statutory compliance.
          </p>
          <div className="pt-2 text-xs text-neutral-500 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#72A346] shrink-0" />
            <span>Zero NOC delays & strict alignment with society by-laws</span>
          </div>
        </div>

      </div>

      {/* The 3-Step "How It Works" Journey with Brand Accents */}
      <div className="bg-neutral-900 text-white rounded-2xl p-8 sm:p-12 space-y-8 relative overflow-hidden">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59415]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#E84144]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#5C96D2]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#72A346]" />
            <span className="ml-1">Frictionless Real Estate Protocol</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            How Renters & Buyers Secure A Place
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            A frictionless path from search to key handover.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-3 bg-neutral-800/80 p-6 rounded-xl border border-neutral-700 hover:border-[#5C96D2] transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#5C96D2] text-white font-bold flex items-center justify-center text-sm shadow-xs">
              1
            </div>
            <h3 className="text-base font-bold text-white">
              Search for Properties
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Explore our curated inventory of homes in vetted housing societies, filterable by exact locality, budget, and amenity requirements.
            </p>
          </div>

          <div className="space-y-3 bg-neutral-800/80 p-6 rounded-xl border border-neutral-700 hover:border-[#E84144] transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#E84144] text-white font-bold flex items-center justify-center text-sm shadow-xs">
              2
            </div>
            <h3 className="text-base font-bold text-white">
              Contact for a Hassle-Free Process
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Reach out directly through our form or chat widget. Our certified team schedules private viewings and initiates society verification.
            </p>
          </div>

          <div className="space-y-3 bg-neutral-800/80 p-6 rounded-xl border border-neutral-700 hover:border-[#72A346] transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#72A346] text-white font-bold flex items-center justify-center text-sm shadow-xs">
              3
            </div>
            <h3 className="text-base font-bold text-white">
              Secure Your New Place
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Execute standardized legal agreements with pre-cleared society NOCs, approved police intimations, and immediate move-in passes.
            </p>
          </div>

        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => onNavigateToTab('properties')}
            className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#E84144] to-[#F59415] hover:opacity-95 rounded-lg transition-opacity shadow-md"
          >
            Start Your Property Search
          </button>
        </div>
      </div>

      {/* Society Verification Checklist Card */}
      <div className="bg-white rounded-xl border border-neutral-200 p-7 shadow-xs">
        <div className="max-w-2xl mb-6 space-y-1">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Verification Protocol
          </div>
          <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
            The Novitiate 6-Point Society Compliance Checklist
          </h3>
          <p className="text-xs text-neutral-600">
            Every transaction executed through Novitiate Housing satisfies each statutory item before keys are handed over:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Police Verification Receipt', desc: 'Online Maharashtra Police intimation filing with digital barcode acknowledgement.' },
            { title: 'Registered Agreement', desc: 'Standardized 2-3 year Leave & License or Sale Deed registered via authorized e-filing.' },
            { title: 'Managing Committee NOC', desc: 'Formal society resolution clearance eliminating last-minute move-in disputes.' },
            { title: 'Past Landlord Reference', desc: 'Direct written verification check regarding payment discipline and conduct.' },
            { title: 'Corporate Employer Verification', desc: 'Active employment proof, HR confirmation, and income stability validation.' },
            { title: 'Society Maintenance No-Dues', desc: 'Verification certificate confirming zero outstanding dues from previous occupant.' }
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-neutral-50 rounded-lg border border-neutral-100 space-y-1.5">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-neutral-900">{item.title}</span>
              </div>
              <p className="text-[11px] text-neutral-500 leading-normal pl-6">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Frequently Asked Questions
          </div>
          <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
            Questions About Society Tenancy & NOC Management
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between text-xs sm:text-sm font-bold text-neutral-900 hover:bg-neutral-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-neutral-500 shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0 ml-2" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 bg-neutral-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-neutral-100 rounded-xl p-8 border border-neutral-200 text-center space-y-3">
        <h3 className="text-lg font-bold text-neutral-900">
          Have Questions Regarding Your Housing Society By-Laws?
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto">
          Our team provides complimentary advisory sessions for Society Chairmen, Secretaries, and Managing Committee Members.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigateToTab('contact')}
            className="px-5 py-2.5 text-xs font-bold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Connect With Our Advisory Desk
          </button>
        </div>
      </div>

    </div>
  );
};
