import { useState } from 'react';
import { FaqItem } from '../../../mocks/faq';

interface FaqAccordionProps {
  items: FaqItem[];
  searchQuery: string;
}

function highlightText(text: string, query: string): string {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark class="bg-[#FF385C]/15 text-[#FF385C] rounded px-0.5">$1</mark>');
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  bookings: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
  payments: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
  cancellations: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200' },
  account: { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-200' },
};

const categoryLabels: Record<string, string> = {
  bookings: 'Bookings',
  payments: 'Payments',
  cancellations: 'Cancellations',
  account: 'Account',
};

export default function FaqAccordion({ items, searchQuery }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 flex items-center justify-center bg-[#F7F7F7] rounded-full mx-auto mb-5">
          <i className="ri-search-line text-4xl text-[#CCCCCC]"></i>
        </div>
        <h3 className="text-lg font-semibold text-[#222222] mb-2">No results found</h3>
        <p className="text-sm text-[#717171]">
          Try different keywords or browse a specific category above.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const colors = categoryColors[item.category];
        return (
          <div
            key={item.id}
            className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
              isOpen ? 'border-[#FF385C]/30 shadow-md shadow-[#FF385C]/5' : 'border-[#EBEBEB] hover:border-[#DDDDDD]'
            } bg-white`}
            style={{ animationDelay: `${index * 30}ms` }}
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-start gap-4 px-6 py-5 text-left cursor-pointer group"
            >
              <div className={`w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5 transition-colors ${
                isOpen ? 'bg-[#FF385C] text-white' : 'bg-[#F7F7F7] text-[#717171] group-hover:bg-[#FF385C]/10 group-hover:text-[#FF385C]'
              }`}>
                <i className="ri-question-line text-base"></i>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}
                  >
                    {categoryLabels[item.category]}
                  </span>
                </div>
                <p
                  className="text-sm font-semibold text-[#222222] leading-snug group-hover:text-[#FF385C] transition-colors"
                  dangerouslySetInnerHTML={{ __html: highlightText(item.question, searchQuery) }}
                />
              </div>
              <div className={`w-8 h-8 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                <i className={`ri-arrow-down-s-line text-xl ${isOpen ? 'text-[#FF385C]' : 'text-[#AAAAAA]'}`}></i>
              </div>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-5 pl-[4.5rem]">
                <div className="h-px bg-[#F0F0F0] mb-4"></div>
                <p
                  className="text-sm text-[#555555] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: highlightText(item.answer, searchQuery) }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
