import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import FaqSearch from './components/FaqSearch';
import FaqTabs from './components/FaqTabs';
import FaqAccordion from './components/FaqAccordion';
import { faqItems } from '../../mocks/faq';

export default function FaqPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      bookings: 0,
      payments: 0,
      cancellations: 0,
      account: 0,
    };
    faqItems.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredItems = useMemo(() => {
    let items = faqItems;
    if (activeTab !== 'all') {
      items = items.filter((item) => item.category === activeTab);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q)
      );
    }
    return items;
  }, [activeTab, searchQuery]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) setActiveTab('all');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a] overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF385C]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#FF385C]/8 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FF385C]/20 border border-[#FF385C]/40 text-[#FF385C] text-sm font-medium rounded-full mb-6">
            <i className="ri-question-answer-line"></i>
            Help Center
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Frequently Asked Questions
          </h1>
          <p className="text-white/70 text-base mb-10 max-w-xl mx-auto leading-relaxed">
            Find quick answers to common questions about bookings, payments, cancellations, and your account.
          </p>

          {/* Search */}
          <FaqSearch
            value={searchQuery}
            onChange={handleSearchChange}
            resultCount={filteredItems.length}
          />
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-[#EBEBEB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: 'ri-calendar-check-line', label: 'Bookings', count: categoryCounts.bookings, color: 'text-emerald-500' },
              { icon: 'ri-secure-payment-line', label: 'Payments', count: categoryCounts.payments, color: 'text-amber-500' },
              { icon: 'ri-refund-2-line', label: 'Cancellations', count: categoryCounts.cancellations, color: 'text-rose-500' },
              { icon: 'ri-user-settings-line', label: 'Account', count: categoryCounts.account, color: 'text-sky-500' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <div className={`w-10 h-10 flex items-center justify-center`}>
                  <i className={`${stat.icon} text-2xl ${stat.color}`}></i>
                </div>
                <span className="text-2xl font-bold text-[#222222]">{stat.count}</span>
                <span className="text-xs text-[#717171]">{stat.label} FAQs</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="flex-1 py-14 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Tabs */}
          {!searchQuery && (
            <div className="mb-10">
              <FaqTabs
                activeTab={activeTab}
                onChange={setActiveTab}
                counts={categoryCounts}
              />
            </div>
          )}

          {/* Section heading */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-[#222222]">
                {searchQuery
                  ? 'Search Results'
                  : activeTab === 'all'
                  ? 'All Questions'
                  : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Questions`}
              </h2>
              <p className="text-sm text-[#717171] mt-0.5">
                {filteredItems.length} question{filteredItems.length !== 1 ? 's' : ''}
              </p>
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="flex items-center gap-1.5 text-sm text-[#FF385C] hover:underline cursor-pointer"
              >
                <i className="ri-close-line"></i>
                Clear search
              </button>
            )}
          </div>

          {/* Accordion */}
          <FaqAccordion items={filteredItems} searchQuery={searchQuery} />
        </div>
      </section>

      {/* Still need help CTA */}
      <section className="py-16 bg-white border-t border-[#EBEBEB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#FF385C] to-[#E31C5F] rounded-3xl p-10 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
            <div className="relative">
              <div className="w-16 h-16 flex items-center justify-center bg-white/20 rounded-2xl mx-auto mb-5">
                <i className="ri-customer-service-2-line text-3xl"></i>
              </div>
              <h2
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Still have questions?
              </h2>
              <p className="text-white/85 text-sm mb-8 max-w-md mx-auto leading-relaxed">
                Our support team is available 24/7 to help you with anything you need. Don't hesitate to reach out.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#FF385C] rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-mail-send-line"></i>
                  Contact Support
                </Link>
                <a
                  href="mailto:support@drivrabookings.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 border border-white/30 text-white rounded-xl text-sm font-semibold hover:bg-white/25 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-mail-line"></i>
                  support@drivrabookings.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
