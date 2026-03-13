import { visitorsStats } from '../../../mocks/visitors-stats';

export default function VisitorsChart() {
  const visitorsData = visitorsStats;
  const maxVisitors = Math.max(...visitorsData.map((s) => s.visitors), 1);
  const totalVisitors = visitorsData.reduce((sum, s) => sum + s.visitors, 0);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Site Visitors</h3>
          <p className="text-sm text-gray-500 mt-1">Last 7 days</p>
        </div>
        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
          <i className="ri-line-chart-line text-2xl text-amber-600"></i>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end justify-between gap-3 h-48">
        {visitorsData.map((stat, index) => {
          const heightPercentage = (stat.visitors / maxVisitors) * 100;
          const date = new Date(stat.date);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col items-center justify-end h-40">
                <div className="relative w-full group cursor-pointer">
                  <div
                    className="w-full bg-gradient-to-t from-[#FF385C] to-[#FF6B88] rounded-t-lg transition-all duration-300 hover:opacity-80"
                    style={{ height: `${heightPercentage}%`, minHeight: stat.visitors > 0 ? '8px' : '0' }}
                  ></div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
                      {stat.visitors} visitors
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-gray-900">{dayName}</p>
                <p className="text-xs text-gray-500">{date.getDate()}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total Unique Visitors (7 days)</span>
          <span className="text-lg font-bold text-gray-900">{totalVisitors.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
