interface FaqSearchProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export default function FaqSearch({ value, onChange, resultCount }: FaqSearchProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <i className="ri-search-line text-xl text-white/60"></i>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search questions... e.g. 'refund', 'payment', 'cancel'"
          className="w-full pl-14 pr-12 py-4 bg-white/15 border border-white/30 rounded-2xl text-white placeholder-white/50 text-sm focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-0 pr-5 flex items-center cursor-pointer"
          >
            <i className="ri-close-circle-fill text-xl text-white/60 hover:text-white transition-colors"></i>
          </button>
        )}
      </div>
      {value && (
        <p className="text-white/70 text-sm mt-3 text-center">
          {resultCount > 0
            ? `Found ${resultCount} result${resultCount !== 1 ? 's' : ''} for "${value}"`
            : `No results found for "${value}"`}
        </p>
      )}
    </div>
  );
}
