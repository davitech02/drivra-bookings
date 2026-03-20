import { useState, useEffect } from 'react';

interface Section {
  id: string;
  title: string;
  content: string;
}

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  description: string;
  sections: Section[];
}

export default function LegalLayout({ title, lastUpdated, description, sections }: LegalLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((s) => ({
        id: s.id,
        element: document.getElementById(s.id),
      }));

      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#222222] to-[#3a3a3a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-[#FF385C]/20 border border-[#FF385C]/40 text-[#FF385C] text-sm font-medium rounded-full mb-4">
              Legal
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {title}
            </h1>
            <p className="text-white/70 text-sm mb-2">Last Updated: {lastUpdated}</p>
            <p className="text-white/85 text-base leading-relaxed">{description}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Table of Contents - Sticky Sidebar */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <div className="bg-[#F7F7F7] rounded-2xl p-6">
                  <h2 className="text-sm font-bold text-[#222222] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <i className="ri-list-unordered text-[#FF385C]"></i>
                    Contents
                  </h2>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left text-sm py-2 px-3 rounded-lg transition-all cursor-pointer ${
                          activeSection === section.id
                            ? 'bg-[#FF385C] text-white font-semibold'
                            : 'text-[#717171] hover:bg-white hover:text-[#FF385C]'
                        }`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Contact Card */}
                <div className="bg-gradient-to-br from-[#FF385C] to-[#E31C5F] rounded-2xl p-6 mt-6 text-white">
                  <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-xl mb-4">
                    <i className="ri-customer-service-2-line text-2xl"></i>
                  </div>
                  <h3 className="text-base font-bold mb-2">Need Help?</h3>
                  <p className="text-white/85 text-sm mb-4">
                    Our support team is here to assist you with any questions.
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#FF385C] rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Contact Support
                    <i className="ri-arrow-right-line"></i>
                  </a>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="prose prose-sm max-w-none">
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    id={section.id}
                    className={`scroll-mt-24 ${index !== 0 ? 'mt-12' : ''}`}
                  >
                    <h4 className="text-xl font-bold text-[#222222] mb-4 flex items-center gap-3">
                      <span className="w-8 h-8 flex items-center justify-center bg-[#FF385C]/10 rounded-lg text-[#FF385C] text-sm font-bold">
                        {index + 1}
                      </span>
                      {section.title.replace(/^\d+\.\s*/, '')}
                    </h4>
                    <div className="pl-11">
                      <p className="text-[#717171] text-sm leading-relaxed whitespace-pre-line">
                        {section.content}
                      </p>
                    </div>
                    {index !== sections.length - 1 && (
                      <hr className="mt-8 border-[#EBEBEB]" />
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="mt-12 p-6 bg-[#F7F7F7] rounded-2xl border-l-4 border-[#FF385C]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#FF385C]/10 rounded-lg flex-shrink-0">
                    <i className="ri-information-line text-xl text-[#FF385C]"></i>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#222222] mb-2">
                      Questions About This Policy?
                    </h3>
                    <p className="text-sm text-[#717171] mb-4">
                      If you have any questions or concerns about this policy, please don't hesitate to reach out to our support team.
                    </p>
                    <a
                      href="mailto:support@drivrabooking.com"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF385C] hover:underline cursor-pointer"
                    >
                      <i className="ri-mail-line"></i>
                      support@drivrabooking.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}