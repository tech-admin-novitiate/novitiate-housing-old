import React from 'react';
import { ShieldCheck, MapPin, Building2, Users2, Award, CheckCircle2 } from 'lucide-react';
import { NovitiateLogo } from './NovitiateLogo';

interface AboutTabProps {
  onNavigateToTab: (tab: string) => void;
}

export const AboutTab: React.FC<AboutTabProps> = ({ onNavigateToTab }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero statement with trademark logo presentation */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-8 sm:p-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            <span className="w-2 h-2 rounded-full bg-[#E84144]" />
            <span>Corporate Identity & Mission</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight [text-wrap:balance]">
            Pioneering Institutional Tenancy Governance & Verified Society Sales
          </h1>
          <p className="text-base text-neutral-600 leading-relaxed">
            Novitiate Housing Private Limited was incorporated in September 2023 with a singular objective: to eliminate the friction, distrust, and paperwork bottlenecks that plague residential transactions in co-operative housing societies.
          </p>
        </div>

        {/* Featured Trademark Logo Emblem */}
        <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200/80 shadow-xs shrink-0 flex flex-col items-center text-center">
          <NovitiateLogo size="lg" variant="full" />
        </div>
      </div>

      {/* Corporate Facts Bento with Brand Accents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Coral Red Fact */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-2 hover:border-[#E84144] transition-colors group">
          <div className="w-10 h-10 rounded-lg bg-rose-50 text-[#E84144] flex items-center justify-center font-bold mb-3">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="text-xs text-neutral-500 font-semibold uppercase">Registered Entity</div>
          <div className="text-base font-bold text-neutral-900 group-hover:text-[#E84144] transition-colors">Novitiate Housing Private Limited</div>
          <p className="text-xs text-neutral-600 leading-relaxed pt-1">
            Registered with ROC Mumbai under the Ministry of Corporate Affairs, Government of India.
          </p>
          <div className="text-[11px] font-mono text-neutral-400 pt-2 border-t border-neutral-100">
            CIN: U68200MH2023PTC410887
          </div>
        </div>

        {/* Sky Blue Fact */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-2 hover:border-[#5C96D2] transition-colors group">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#5C96D2] flex items-center justify-center font-bold mb-3">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="text-xs text-neutral-500 font-semibold uppercase">Headquarters</div>
          <div className="text-base font-bold text-neutral-900 group-hover:text-[#5C96D2] transition-colors">Vasai, Maharashtra</div>
          <p className="text-xs text-neutral-600 leading-relaxed pt-1">
            Deep roots in the fast-growing Vasai-Virar, Palghar, Thane, and Mumbai Western suburban residential corridors.
          </p>
          <div className="text-[11px] font-mono text-[#5C96D2] font-semibold pt-2 border-t border-neutral-100">
            Serving 180+ Active Societies
          </div>
        </div>

        {/* Leaf Green Fact */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-2 hover:border-[#72A346] transition-colors group">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#72A346] flex items-center justify-center font-bold mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-xs text-neutral-500 font-semibold uppercase">Compliance Framework</div>
          <div className="text-base font-bold text-neutral-900 group-hover:text-[#72A346] transition-colors">MahaRERA & MCS Act</div>
          <p className="text-xs text-neutral-600 leading-relaxed pt-1">
            Strict adherence to the Maharashtra Co-operative Societies Act 1960 model by-laws and MahaRERA guidelines.
          </p>
          <div className="text-[11px] font-mono text-[#72A346] font-semibold pt-2 border-t border-neutral-100">
            100% Lawful NOC Procedures
          </div>
        </div>

      </div>

      {/* Trademark Brand Identity & Color Spectrum Section */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#F59415] via-[#E84144] via-[#5C96D2] to-[#72A346]" />
        
        <div className="p-8 sm:p-10 space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#E84144] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#E84144]" />
              <span>Trademark Identity & Symbology</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              The 3x3 Interconnected Node Architecture
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Our trademarked 'N' mark is composed of an interconnected network of stakeholder nodes. It symbolizes the institutional bridge between Housing Societies, Licensed Agents, and Property Seekers, anchored by our founding philosophy: <span className="font-semibold text-neutral-900 italic">"House of New Beginning"</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Color 1: Orange */}
            <div className="p-4 rounded-xl border border-neutral-200/80 bg-neutral-50/50 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#F59415] shadow-xs shrink-0" />
                <span className="text-xs font-bold text-neutral-900">#F59415 Warm Gold</span>
              </div>
              <div className="text-xs font-semibold text-neutral-800">House of New Beginning</div>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Represents fresh starts for home seekers and vibrant renewals for society tenancies.
              </p>
            </div>

            {/* Color 2: Coral Red */}
            <div className="p-4 rounded-xl border border-neutral-200/80 bg-neutral-50/50 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#E84144] shadow-xs shrink-0" />
                <span className="text-xs font-bold text-neutral-900">#E84144 Coral Heartbeat</span>
              </div>
              <div className="text-xs font-semibold text-neutral-800">Focal Transaction Node</div>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                The central node anchoring the 'N'—decisive execution, urgent problem solving, and action.
              </p>
            </div>

            {/* Color 3: Sky Blue */}
            <div className="p-4 rounded-xl border border-neutral-200/80 bg-neutral-50/50 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#5C96D2] shadow-xs shrink-0" />
                <span className="text-xs font-bold text-neutral-900">#5C96D2 Sky Blue</span>
              </div>
              <div className="text-xs font-semibold text-neutral-800">Agent & Society Network</div>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Institutional trust, certified MahaRERA agent connectivity, and open committee dialogue.
              </p>
            </div>

            {/* Color 4: Leaf Green */}
            <div className="p-4 rounded-xl border border-neutral-200/80 bg-neutral-50/50 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#72A346] shadow-xs shrink-0" />
                <span className="text-xs font-bold text-neutral-900">#72A346 Leaf Green</span>
              </div>
              <div className="text-xs font-semibold text-neutral-800">Statutory NOC Assurance</div>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                100% verified compliance with the MCS Act, peaceful tenancies, and zero dispute incidents.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="bg-white rounded-xl border border-neutral-200 p-8 shadow-xs space-y-8">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
            Our Fundamental Convictions
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Why we approach real estate differently than traditional classified portals:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Cooperative Societies Are Living Communities, Not Mere Assets</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed pl-6">
              A flat transaction affects every family in the building. When tenants are moved in without proper reference checks or managing committee awareness, safety and harmony suffer. We place housing societies at the center of the dialogue.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Agents Deserve Institutional Dignity & Direct Inventory</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed pl-6">
              Real estate agents are the vital pulse of local communities. Instead of disintermediating them, Novitiate equips licensed agents with verified society inventory, institutional backing, and transparent fee splits.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>The 2–3 Year Tenancy Standard Brings Lasting Peace</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed pl-6">
              The short-sighted 11-month churn model generates unnecessary fees for middlemen while destabilizing residents. Our 2–3 year tenancy framework establishes commitment, fair rent escalation clauses, and long-term security.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero-Delay Society NOCs via Clear Statutory Documentation</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed pl-6">
              Delays occur when applications are incomplete. By pre-auditing all paperwork—including registered leave & license drafts, police receipts, and maintenance clearance—NOCs are issued smoothly and in full compliance.
            </p>
          </div>

        </div>
      </div>

      {/* Call to action */}
      <div className="bg-neutral-900 text-white rounded-xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl font-bold tracking-tight">
            Partner With Novitiate Housing
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg">
            Whether representing a housing society committee or looking to expand your broker practice, we welcome your collaboration.
          </p>
        </div>
        <button
          onClick={() => onNavigateToTab('contact')}
          className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#E84144] to-[#F59415] hover:opacity-95 rounded-lg transition-opacity whitespace-nowrap shrink-0 shadow-md"
        >
          Contact Our Team
        </button>
      </div>

    </div>
  );
};
