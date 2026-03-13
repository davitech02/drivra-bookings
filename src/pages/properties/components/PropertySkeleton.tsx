export default function PropertySkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
      <div className="h-56 bg-[#EBEBEB]"></div>
      <div className="p-5">
        <div className="h-6 bg-[#EBEBEB] rounded mb-3 w-3/4"></div>
        <div className="h-4 bg-[#EBEBEB] rounded mb-4 w-1/2"></div>
        <div className="flex items-center gap-4 mb-4">
          <div className="h-4 bg-[#EBEBEB] rounded w-16"></div>
          <div className="h-4 bg-[#EBEBEB] rounded w-16"></div>
          <div className="h-4 bg-[#EBEBEB] rounded w-16"></div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-[#EBEBEB]">
          <div className="h-6 bg-[#EBEBEB] rounded w-24"></div>
          <div className="h-4 bg-[#EBEBEB] rounded w-20"></div>
        </div>
      </div>
    </div>
  );
}