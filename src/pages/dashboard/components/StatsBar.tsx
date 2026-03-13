interface Stat {
  label: string;
  value: number | string;
  icon: string;
  color: string;
}

interface StatsBarProps {
  total: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

export default function StatsBar({ total, confirmed, completed, cancelled }: StatsBarProps) {
  const stats: Stat[] = [
    { label: 'Total Bookings', value: total, icon: 'ri-calendar-2-line', color: 'text-[#FF385C]' },
    { label: 'Confirmed', value: confirmed, icon: 'ri-checkbox-circle-line', color: 'text-emerald-600' },
    { label: 'Completed', value: completed, icon: 'ri-check-double-line', color: 'text-slate-500' },
    { label: 'Cancelled', value: cancelled, icon: 'ri-close-circle-line', color: 'text-red-500' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-2xl border border-[#EBEBEB] p-5 flex items-center gap-4">
          <div className={`w-11 h-11 flex items-center justify-center rounded-xl bg-[#F7F7F7] ${stat.color}`}>
            <i className={`${stat.icon} text-xl`}></i>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#222222]">{stat.value}</p>
            <p className="text-xs text-[#717171]">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
