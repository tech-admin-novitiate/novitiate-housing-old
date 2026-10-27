import React, { useState } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { NovitiateLogo } from './NovitiateLogo';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  unreadLeadsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  unreadLeadsCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'properties', label: 'Properties' },
    { id: 'how-we-work', label: 'How We Work' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNav = (tabId: string) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      {/* Trademark Novitiate 4-Color Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#F59415] via-[#E84144] via-[#5C96D2] to-[#72A346]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark (Single text element wordmark in display face with trademarked logo) */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center text-left focus:outline-none group shrink-0"
          >
            <NovitiateLogo size="md" variant="horizontal" />
          </button>

          {/* Zone 2: 4-5 Clean Nav Links (Single line, text with subtle hover effect) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-neutral-950 font-bold'
                      : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#F59415] via-[#E84144] to-[#72A346] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action (Single-line control) */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNav('admin')}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 border ${
                currentTab === 'admin'
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                  : 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-200 hover:border-[#5C96D2]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#5C96D2]" />
              <span>Admin Management</span>
              {unreadLeadsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-[#E84144] text-white font-bold">
                  {unreadLeadsCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                currentTab === link.id
                  ? 'bg-neutral-100 text-neutral-950 font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-neutral-100">
            <button
              onClick={() => handleNav('admin')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold bg-neutral-900 text-white"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Admin Management Panel
              </span>
              {unreadLeadsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs bg-amber-400 text-neutral-950">
                  {unreadLeadsCount} New
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
