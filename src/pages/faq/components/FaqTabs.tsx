import { faqCategories } from '../../../mocks/faq';

interface FaqTabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
  counts: Record<string, number>;
}

export default function FaqTabs({ activeTab, onChange, counts }: FaqTabsProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {faqCategories.map((cat) => {
        const isActive = activeTab === cat.id;
        const count = counts[cat.id] ?? 0;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap border ${
              isActive
                ? 'bg-[#FF385C] text-white border-[#FF385C] shadow-md shadow-[#FF385C]/20'
                : 'bg-white text-[#717171] border-[#EBEBEB] hover:border-[#FF385C] hover:text-[#FF385C]'
            }`}
          >
            <span className={`w-5 h-5 flex items-center justify-center`}>
              <i className={`${cat.icon} text-base`}></i>
            </span>
            {cat.label}
            {cat.id !== 'all' && (
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                  isActive ? 'bg-white/25 text-white' : 'bg-[#F7F7F7] text-[#717171]'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
