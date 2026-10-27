import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, Mail, MapPin, ShieldCheck, Building2, Clock, Sparkles } from 'lucide-react';
import { LeadRole } from '../types';
import { createLead, logAnalyticsEvent } from '../services/storageService';

interface ContactTabProps {
  onLeadCaptured?: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export const ContactTab: React.FC<ContactTabProps> = ({ onLeadCaptured, onNavigateToTab }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<LeadRole>('Housing Society Committee');
  const [locality, setLocality] = useState('Vasai West');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setLoading(true);

    setTimeout(() => {
      const newLead = createLead({
        name,
        email: email || `${name.toLowerCase().replace(/\s+/g, '')}@lead.com`,
        phone,
        role,
        locality,
        budget: budget || (role === 'Housing Society Committee' ? 'N/A (Society Onboarding)' : 'Market Rate'),
        message: message || `Inquiry from ${role} regarding ${locality} properties or society clearance.`,
        source: role === 'Housing Society Committee' ? 'Society Onboarding' : role === 'Real Estate Agent' ? 'Agent Partner' : 'Website Contact'
      });

      setLoading(false);
      setSubmittedLead(newLead);
      if (onLeadCaptured) onLeadCaptured();
    }, 450);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setBudget('');
    setSubmittedLead(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title & Introduction */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Direct CRM Intake
        </div>
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          Connect With Novitiate Housing
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          Whether you are an office bearer of a housing society seeking NOC automation, an agent looking to expand your inventory, or a buyer seeking verified homes, our lead desk connects you directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Form: Inbound Lead Capture with Automated Sequence Trigger */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
          {/* Trademark 4-Color Gradient Accent Line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#F59415] via-[#E84144] via-[#5C96D2] to-[#72A346]" />
          
          <div className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-neutral-100 pb-4">
              <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
                Submit Your Requirement
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Inquiries are captured directly into our backend CRM and initiate an automated follow-up sequence.
              </p>
            </div>

          {submittedLead ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-emerald-950 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-emerald-900">
                    Lead Registered in CRM Successfully
                  </h3>
                  <div className="text-xs text-emerald-700">
                    Lead ID: #{submittedLead.id} · Channel: {submittedLead.source}
                  </div>
                </div>
              </div>

              <div className="bg-white/90 p-4 rounded-lg border border-emerald-200/70 text-xs text-neutral-800 space-y-2">
                <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Automated Follow-up Sequence Initiated:</span>
                </div>
                <div className="font-semibold text-neutral-700">
                  {submittedLead.automatedSequence.name}
                </div>
                <div className="space-y-1.5 pt-1 text-[11px] text-neutral-600">
                  {submittedLead.automatedSequence.steps.map((st: any, i: number) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="font-mono text-emerald-700 font-bold shrink-0">
                        [{st.status === 'Sent' ? '✓ SENT' : st.delay}]
                      </span>
                      <span>
                        <strong className="text-neutral-900">{st.title}</strong> via {st.channel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
                >
                  Submit Another Inquiry
                </button>
                {onNavigateToTab && (
                  <button
                    type="button"
                    onClick={() => onNavigateToTab('admin')}
                    className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors"
                  >
                    View in Admin CRM
                  </button>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Stakeholder Role Radio / Selector */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                  I Am A *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { label: 'Society Member', val: 'Housing Society Committee', activeBg: 'bg-[#72A346] text-white border-[#72A346]' },
                    { label: 'Licensed Agent', val: 'Real Estate Agent', activeBg: 'bg-[#5C96D2] text-white border-[#5C96D2]' },
                    { label: 'Home Buyer', val: 'Buyer', activeBg: 'bg-[#F59415] text-white border-[#F59415]' },
                    { label: 'Tenant', val: 'Tenant', activeBg: 'bg-[#E84144] text-white border-[#E84144]' }
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => setRole(item.val as LeadRole)}
                      className={`p-2.5 rounded-lg border text-center transition-all font-semibold ${
                        role === item.val
                          ? `${item.activeBg} shadow-xs`
                          : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suresh Patil"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2.5 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98200 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2.5 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>

              {/* Email & Locality */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. suresh@society.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2.5 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                    Locality / Micro-Market
                  </label>
                  <select
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2.5 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  >
                    <option value="Vasai West">Vasai West</option>
                    <option value="Vasai East">Vasai East (Evershine City)</option>
                    <option value="Virar West">Virar West</option>
                    <option value="Borivali West">Borivali West</option>
                    <option value="Kandivali West">Kandivali West</option>
                    <option value="Thane West">Thane West</option>
                    <option value="Navi Mumbai">Navi Mumbai</option>
                  </select>
                </div>
              </div>

              {/* Budget / Units */}
              <div>
                <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                  {role === 'Housing Society Committee'
                    ? 'Society Name & Number of Flats'
                    : 'Target Budget / Configuration'}
                </label>
                <input
                  type="text"
                  placeholder={
                    role === 'Housing Society Committee'
                      ? 'e.g. Evershine Greens CHS (120 flats)'
                      : 'e.g. 2 BHK, ₹25,000 / mo or ₹75 Lakh'
                  }
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2.5 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                  Specific Requirements / Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details regarding your property, tenancy queries, or society committee meeting dates..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2.5 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-[#E84144] to-[#F59415] hover:opacity-95 rounded-lg transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Registering Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Inbound Lead & Trigger CRM Sequence</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
          </div>
        </div>

        {/* Right Column: Office Credentials, Advisory Hotline & SLA */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Office Card */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-7 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-neutral-900 tracking-tight">
              Registered Office & Advisory Desk
            </h3>

            <div className="space-y-3.5 text-xs text-neutral-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-neutral-900">Novitiate Housing Private Limited</div>
                  <div>Vasai, Maharashtra 401202, India</div>
                  <div className="text-[11px] text-neutral-400">Serving Western Suburban & Palghar Region</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-neutral-900 shrink-0" />
                <div>
                  <div className="font-semibold text-neutral-900">+91 98200 14280 / +91 98201 12345</div>
                  <div className="text-[11px] text-neutral-400">Mon–Sat, 9:30 AM – 7:30 PM IST</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-neutral-900 shrink-0" />
                <div>
                  <div className="font-semibold text-neutral-900">contact@novitiatehousing.com</div>
                  <div className="text-[11px] text-neutral-400">Response within 2 business hours</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 space-y-2">
              <div className="text-xs font-bold text-neutral-900">
                Service Level Guarantees (SLA):
              </div>
              <ul className="text-[11px] text-neutral-600 space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Immediate SMS/Email delivery of society property packets</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>24-Hour turnaround on tenant reference verifications</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Dedicated liaison officer for managing committee meetings</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Society Hotline */}
          <div className="bg-neutral-900 text-white rounded-2xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Society Managing Committee Desk</span>
            </div>
            <h4 className="text-sm font-bold text-white">
              Need urgent assistance with an unresolved NOC dispute?
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Our legal and society compliance officers offer immediate clarification on MCS Act section 79A directives and model by-laws.
            </p>
            <div className="pt-1">
              <a
                href="tel:+919820014280"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#E84144] hover:bg-[#d63437] rounded-lg transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Legal Advisory (+91 98200 14280)</span>
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
