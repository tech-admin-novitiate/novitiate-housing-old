import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { HomeMarketing } from './components/HomeMarketing';
import { PropertiesTab } from './components/PropertiesTab';
import { HowWeWorkTab } from './components/HowWeWorkTab';
import { AboutTab } from './components/AboutTab';
import { ContactTab } from './components/ContactTab';
import { AdminPortal } from './components/AdminPortal';
import { ChatWidget } from './components/ChatWidget';
import { Property, FilterState } from './types';
import { getProperties, getLeads, logAnalyticsEvent } from './services/storageService';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [properties, setProperties] = useState<Property[]>(getProperties());
  const [initialPropertiesFilter, setInitialPropertiesFilter] = useState<Partial<FilterState>>({});
  const [unreadLeadsCount, setUnreadLeadsCount] = useState<number>(0);

  // Load properties and leads count
  const refreshData = () => {
    setProperties(getProperties());
    const leads = getLeads();
    const newLeads = leads.filter((l) => l.status === 'New').length;
    setUnreadLeadsCount(newLeads);
  };

  useEffect(() => {
    refreshData();
    logAnalyticsEvent('page_view', 'App Launched');

    const handlePropsUpdated = () => refreshData();
    const handleLeadsUpdated = () => refreshData();

    window.addEventListener('novitiate_properties_updated', handlePropsUpdated);
    window.addEventListener('novitiate_leads_updated', handleLeadsUpdated);

    return () => {
      window.removeEventListener('novitiate_properties_updated', handlePropsUpdated);
      window.removeEventListener('novitiate_leads_updated', handleLeadsUpdated);
    };
  }, []);

  // Handle hero quick search
  const handleHeroSearch = (filters: Partial<FilterState>) => {
    setInitialPropertiesFilter(filters);
    setCurrentTab('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    logAnalyticsEvent('property_search', `Hero Search: ${filters.locality || 'All'} - ${filters.type}`);
  };

  const handleSelectProperty = (prop: Property) => {
    setInitialPropertiesFilter({ query: prop.title });
    setCurrentTab('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tab: string) => {
    setCurrentTab(tab);
    logAnalyticsEvent('page_view', `Switched Tab to: ${tab}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900">
      
      {/* Top Bar Header (Adheres to 3-zone contract) */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        unreadLeadsCount={unreadLeadsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <div>
            <HeroSection
              onSearch={handleHeroSearch}
              onExploreSocieties={() => handleSelectTab('how-we-work')}
            />
            <HomeMarketing
              featuredProperties={properties.filter((p) => p.featured || p.type === 'rent')}
              onSelectProperty={handleSelectProperty}
              onExploreProperties={() => handleSelectTab('properties')}
              onNavigateToTab={handleSelectTab}
            />
          </div>
        )}

        {currentTab === 'properties' && (
          <PropertiesTab
            properties={properties}
            initialFilters={initialPropertiesFilter}
            onInquirySubmitted={refreshData}
          />
        )}

        {currentTab === 'how-we-work' && (
          <HowWeWorkTab onNavigateToTab={handleSelectTab} />
        )}

        {currentTab === 'about' && (
          <AboutTab onNavigateToTab={handleSelectTab} />
        )}

        {currentTab === 'contact' && (
          <ContactTab
            onLeadCaptured={refreshData}
            onNavigateToTab={handleSelectTab}
          />
        )}

        {currentTab === 'admin' && (
          <AdminPortal
            properties={properties}
            onPropertiesChange={refreshData}
            onNavigateToTab={handleSelectTab}
          />
        )}
      </main>

      {/* Floating Instant Real-Time Chat Widget */}
      <ChatWidget
        onLeadCaptured={refreshData}
        onNavigateToProperties={() => handleSelectTab('properties')}
      />

      {/* Quiet Corporate Footer */}
      <Footer onSelectTab={handleSelectTab} />

    </div>
  );
}
