import React from 'react';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';
import { NovitiateLogo } from './NovitiateLogo';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800">
      {/* Trademark Novitiate 4-Color Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#F59415] via-[#E84144] via-[#5C96D2] to-[#72A346]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand info */}
          <div className="md:col-span-1 space-y-4">
            <NovitiateLogo size="md" variant="horizontal" theme="light" />
            <p className="text-sm text-neutral-400 leading-relaxed pt-1">
              Created to simplify the tenancy and sales process for housing societies, agents, and buyers through transparent reference verification and frictionless society NOC compliance.
            </p>
            <div className="text-xs text-neutral-500 font-mono">
              CIN: U68200MH2023PTC410887 · Inc. 2023
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-100 uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onSelectTab('properties')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Verified Properties
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('how-we-work')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  How We Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  About Novitiate Housing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('admin')}
                  className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Backend Admin Portal</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">Staff</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions for Stakeholders */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-100 uppercase tracking-wider mb-4">
              Stakeholders
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onSelectTab('how-we-work')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  For Housing Societies (NOC Clearances)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('how-we-work')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  For Real Estate Agents (Direct Inventory)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('properties')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  For Buyers & Renters (Verified Titles)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('contact')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Society Committee Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Registered Office & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-neutral-100 uppercase tracking-wider mb-4">
              Registered Office
            </h4>
            <div className="flex items-start gap-2.5 text-sm text-neutral-400">
              <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
              <span>Novitiate Housing Private Limited, Vasai, Maharashtra, 401202, India</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-neutral-400">
              <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>+91 98200 14280 / +91 98201 12345</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-neutral-400">
              <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>contact@novitiatehousing.com</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Novitiate Housing Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">Maharashtra Co-operative Societies Act Compliant</span>
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
