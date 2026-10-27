import React, { useState } from 'react';
import { Building2, ShieldCheck, Briefcase, KeyRound, CheckCircle2, ArrowRight, Calculator, FileCheck, Users, HelpCircle } from 'lucide-react';
import { Property } from '../types';
import { PropertyVisual } from './PropertyVisual';

interface HomeMarketingProps {
  featuredProperties: Property[];
  onSelectProperty: (property: Property) => void;
  onExploreProperties: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const HomeMarketing: React.FC<HomeMarketingProps> = ({
  featuredProperties,
  onSelectProperty,
  onExploreProperties,
  onNavigateToTab,
}) => {
  // Interactive Society Tenancy Savings Calculator
  const [flatCount, setFlatCount] = useState<number>(60);
  const [turnoverRate, setTurnoverRate] = useState<number>(20); // 20% annual tenant turnover

  const annualTenancies = Math.round((flatCount * turnoverRate) / 100);
  const estimatedAdminHoursSaved = annualTenancies * 18; // 18 hrs saved in police verification, reference checks, committee meetings
  const savedDisputeCost = annualTenancies * 12500; // estimated ₹ saved in unpaid dues, legal notices, and delayed NOC fees

  return (
    <div className="space-y-20 pb-20">
      
      {/* 3 Core Pillars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Ecosystem Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight [text-wrap:balance]">
            Engineered to Solve Real Estate Friction Across All Three Sides
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            Real estate in cooperative housing societies fails when stakeholders operate in silos. Novitiate Housing creates complete institutional alignment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Housing Societies (Leaf Green Brand Anchor #72A346) */}
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-neutral-200/90 shadow-sm flex flex-col justify-between hover:border-[#72A346] transition-all group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#72A346] flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 tracking-tight group-hover:text-[#72A346] transition-colors">
                For Housing Societies
              </h3>
              <p className="text-xs text-neutral-500 font-medium">
                Managing Committees & Society Office Bearers
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Involving housing societies in the entire tenancy cycle. We ensure reference checks to verify tenant credentials, enforce standard 2–3 year terms, and eliminate arbitrary NOC disputes.
              </p>
              
              <ul className="space-y-2 text-xs text-neutral-600 pt-2 border-t border-neutral-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#72A346] shrink-0" />
                  <span>Mandatory tenant workplace & landlord references</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#72A346] shrink-0" />
                  <span>Maharashtra Co-operative Societies Act compliance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#72A346] shrink-0" />
                  <span>2–3 year structured tenancy agreements</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-100">
              <button
                onClick={() => onNavigateToTab('contact')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#72A346] hover:underline"
              >
                <span>Onboard Your Society</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Real Estate Agents (Sky Blue Brand Anchor #5C96D2) */}
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-neutral-200/90 shadow-sm flex flex-col justify-between hover:border-[#5C96D2] transition-all group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#5C96D2] flex items-center justify-center font-bold">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 tracking-tight group-hover:text-[#5C96D2] transition-colors">
                For Real Estate Agents
              </h3>
              <p className="text-xs text-neutral-500 font-medium">
                MahaRERA Licensed Brokers & Independent Consultants
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Empowering agents by providing verified access to gated housing societies across Vasai, Virar, Thane, and Mumbai suburbs, expanding revenue streams with zero friction.
              </p>
              
              <ul className="space-y-2 text-xs text-neutral-600 pt-2 border-t border-neutral-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5C96D2] shrink-0" />
                  <span>Direct inventory access with pre-cleared NOCs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5C96D2] shrink-0" />
                  <span>50–50 institutional co-brokering protection</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5C96D2] shrink-0" />
                  <span>Verified buyer and high-intent tenant leads</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-100">
              <button
                onClick={() => onNavigateToTab('contact')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5C96D2] hover:underline"
              >
                <span>Join Agent Partner Network</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Home Buyers & Renters (Coral Red / Warm Orange Brand Anchor #E84144) */}
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-neutral-200/90 shadow-sm flex flex-col justify-between hover:border-[#E84144] transition-all group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-rose-50 text-[#E84144] flex items-center justify-center font-bold">
                <KeyRound className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 tracking-tight group-hover:text-[#E84144] transition-colors">
                For Buyers & Renters
              </h3>
              <p className="text-xs text-neutral-500 font-medium">
                Families, Corporate Tenants & First-time Buyers
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Enjoy transparent property transactions with zero last-minute society NOC rejections, transparent pricing, verified chain of title deeds, and verified society amenities.
              </p>
              
              <ul className="space-y-2 text-xs text-neutral-600 pt-2 border-t border-neutral-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E84144] shrink-0" />
                  <span>100% pre-vetted legal titles and OC verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E84144] shrink-0" />
                  <span>Smooth society move-in with pre-approved entry passes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E84144] shrink-0" />
                  <span>Standardized digital agreements & police intimation</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-100">
              <button
                onClick={onExploreProperties}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E84144] hover:underline"
              >
                <span>Browse Verified Properties</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Properties Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
              Curated Selection
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
              Featured Society Listings
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Pre-cleared with complete society NOC approvals and reference-checked records.
            </p>
          </div>
          <button
            onClick={onExploreProperties}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors shrink-0"
          >
            <span>View All Listings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProperties.slice(0, 3).map((property) => (
            <div
              key={property.id}
              onClick={() => onSelectProperty(property)}
              className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <PropertyVisual
                  preset={property.imagePreset}
                  title={property.title}
                  type={property.type}
                  className="h-48 w-full group-hover:scale-[1.02] transition-transform duration-300"
                />

                <div className="p-5 space-y-3">
                  {/* Clean unboxed metadata with separators (Anti-Slop Zero Pill Discipline) */}
                  <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                    <span>{property.bedrooms} BHK</span>
                    <span aria-hidden="true">·</span>
                    <span>{property.areaSqFt} sq.ft</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 font-semibold">NOC Verified</span>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 group-hover:text-neutral-700 transition-colors line-clamp-1">
                    {property.title}
                  </h3>

                  <p className="text-xs text-neutral-500 line-clamp-1">
                    {property.societyName} · {property.locality}
                  </p>

                  <p className="text-xs text-neutral-600 line-clamp-2">
                    {property.description}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <span className="text-base font-extrabold text-neutral-900 font-mono tabular-nums">
                    {property.priceFormatted}
                  </span>
                  {property.type === 'rent' && property.deposit && (
                    <span className="text-[11px] text-neutral-400 block font-mono">
                      Dep: ₹{(property.deposit / 1000).toFixed(0)}k
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold text-neutral-900 group-hover:underline">
                  View Details &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Matrix: Traditional Brokerage vs Novitiate Housing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900 text-white rounded-2xl shadow-xl overflow-hidden border border-neutral-800">
          {/* Trademark 4-Color Gradient Accent Line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#F59415] via-[#E84144] via-[#5C96D2] to-[#72A346]" />
          
          <div className="p-6 sm:p-10">
            <div className="max-w-3xl mb-8 space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#F59415] uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59415]" />
                <span>The Structural Difference</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Why Housing Societies & Homeowners Switch to Novitiate
              </h2>
              <p className="text-sm text-neutral-400">
                Unorganized real estate brokerage ignores housing society by-laws, leading to friction, gatekeeper disputes, and legal entanglements. Here is how we fix it.
              </p>
            </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Transaction Dimension</th>
                  <th className="py-3 px-4 text-neutral-500">Traditional Brokerage</th>
                  <th className="py-3 px-4 text-amber-300">Novitiate Housing Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/80 text-xs sm:text-sm">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-neutral-200">Society NOC Processing</td>
                  <td className="py-3.5 px-4 text-neutral-400">Treated as an afterthought; frequent rejections & committee delays (3–6 weeks)</td>
                  <td className="py-3.5 px-4 font-medium text-emerald-400">Pre-cleared with managing committee; 48-hour standardized turnaround</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-neutral-200">Tenant Credential Verification</td>
                  <td className="py-3.5 px-4 text-neutral-400">Surface ID check only; no workplace or previous landlord reference checks</td>
                  <td className="py-3.5 px-4 font-medium text-emerald-400">Multi-point background vetting + mandatory employer and past society verification</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-neutral-200">Tenancy Tenure Stability</td>
                  <td className="py-3.5 px-4 text-neutral-400">Volatile 11-month turnover; high society maintenance disruption & wear</td>
                  <td className="py-3.5 px-4 font-medium text-emerald-400">Structured 2–3 year long-term stability with formal renewal governance</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-neutral-200">Agent Network Collaboration</td>
                  <td className="py-3.5 px-4 text-neutral-400">Hostile gatekeeping, zero transparency, disputes over commission shares</td>
                  <td className="py-3.5 px-4 font-medium text-emerald-400">Verified MahaRERA co-brokering charter with guaranteed 50/50 splits</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-neutral-200">Legal Compliance</td>
                  <td className="py-3.5 px-4 text-neutral-400">Informal stamp papers, missing police intimation receipts</td>
                  <td className="py-3.5 px-4 font-medium text-emerald-400">100% digital registered leave & license + certified police acknowledgement</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

      {/* Interactive Society Tenancy Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                <Calculator className="w-4 h-4 text-neutral-800" />
                <span>Society Impact Model</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                Calculate Management Hours & Dispute Costs Saved for Your Society
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Enter your residential society parameters to see how institutionalizing tenancy reference checks and NOC workflows reduces managing committee administrative overhead.
              </p>

              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-neutral-700 mb-1">
                    <span>Total Flats in Society</span>
                    <span className="font-mono">{flatCount} Units</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="300"
                    step="5"
                    value={flatCount}
                    onChange={(e) => setFlatCount(Number(e.target.value))}
                    className="w-full accent-neutral-900"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-neutral-700 mb-1">
                    <span>Annual Tenant Turnover</span>
                    <span className="font-mono">{turnoverRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={turnoverRate}
                    onChange={(e) => setTurnoverRate(Number(e.target.value))}
                    className="w-full accent-neutral-900"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-neutral-50 rounded-xl p-6 sm:p-8 border border-neutral-200/80">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                
                <div className="p-4 bg-white rounded-lg border border-neutral-200/60 shadow-xs">
                  <div className="text-xs text-neutral-500 font-medium">Annual Tenancies</div>
                  <div className="text-2xl font-bold text-neutral-900 font-mono tabular-nums mt-1">
                    {annualTenancies}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1">Units processed/yr</div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-neutral-200/60 shadow-xs">
                  <div className="text-xs text-neutral-500 font-medium">Committee Hours Saved</div>
                  <div className="text-2xl font-bold text-neutral-900 font-mono tabular-nums mt-1">
                    {estimatedAdminHoursSaved} hrs
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1">Verification & meetings</div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-neutral-200/60 shadow-xs">
                  <div className="text-xs text-neutral-500 font-medium">Estimated Dispute Loss Saved</div>
                  <div className="text-2xl font-bold text-[#72A346] font-mono tabular-nums mt-1">
                    ₹{(savedDisputeCost / 1000).toFixed(0)}k
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1">Dues & legal friction</div>
                </div>

              </div>

              <div className="mt-6 pt-5 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-neutral-600 font-medium">
                  Ready to adopt zero-cost society onboarding for your managing committee?
                </p>
                <button
                  onClick={() => onNavigateToTab('contact')}
                  className="px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#E84144] to-[#F59415] rounded-lg hover:opacity-95 transition-opacity whitespace-nowrap shrink-0 shadow-xs"
                >
                  Schedule Society Presentation
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials & Proof */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Validated By The Ecosystem
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Trusted by Society Chairmen, Certified Brokers & Tenants
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex flex-col justify-between hover:border-[#72A346] transition-colors">
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed italic">
              "Before Novitiate Housing, our society office was constantly dealing with unannounced tenants, forged police forms, and broker arguments. Now every tenant comes with verified credentials, and our NOC is cleared in 24 hours."
            </p>
            <div className="pt-4 mt-4 border-t border-neutral-100">
              <div className="text-xs font-bold text-neutral-900">Maheshwar Rao</div>
              <div className="text-[11px] text-[#72A346] font-semibold">Secretary, Evershine Meadows CHS, Vasai East</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex flex-col justify-between hover:border-[#5C96D2] transition-colors">
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed italic">
              "As a MahaRERA registered agent, getting listings in reputed housing societies used to require personal connections and endless paperwork. Novitiate provides direct access with verified society blessing. My deal closure rate doubled."
            </p>
            <div className="pt-4 mt-4 border-t border-neutral-100">
              <div className="text-xs font-bold text-neutral-900">Anand Solanki</div>
              <div className="text-[11px] text-[#5C96D2] font-semibold">Principal Agent, Solanki Prime Properties</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex flex-col justify-between hover:border-[#E84144] transition-colors">
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed italic">
              "Relocating to Vasai was stress-free. The flat had a verified society NOC, clear rental agreement for 2 full years, and our security guard pass was ready on day one. Zero hidden surprises."
            </p>
            <div className="pt-4 mt-4 border-t border-neutral-100">
              <div className="text-xs font-bold text-neutral-900">Deepa Nair</div>
              <div className="text-[11px] text-[#E84144] font-semibold">Tenant, Silver Arch Co-Op Society</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Lead Capture Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-white rounded-2xl p-8 sm:p-12 text-center space-y-6 border border-neutral-800 shadow-xl">
          {/* Subtle colored glow circles from brand logo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59415]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E84144]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59415]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#E84144]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#5C96D2]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#72A346]" />
              <span className="ml-1 tracking-[0.2em]">House of New Beginning</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight [text-wrap:balance]">
              Simplify Your Society Tenancy & Sales Today
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Whether you manage a housing society of 200 flats or are searching for your next verified home, Novitiate Housing guarantees a frictionless experience.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigateToTab('contact')}
              className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#E84144] hover:bg-[#d63437] rounded-lg transition-colors shadow-lg"
            >
              Get in Touch with Our Team
            </button>
            <button
              onClick={onExploreProperties}
              className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg border border-neutral-700 hover:border-[#5C96D2] transition-colors"
            >
              Browse 100% NOC Verified Listings
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
