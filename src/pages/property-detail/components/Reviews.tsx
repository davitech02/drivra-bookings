import { propertyReviews } from '../../../mocks/property-details';

export default function Reviews() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="text-xl font-bold text-[#222222] mb-6">Guest Reviews</h3>

      <div className="space-y-6">
        {propertyReviews.map((review) => (
          <div key={review.id} className="pb-6 border-b border-[#EBEBEB] last:border-0">
            <div className="flex items-start gap-4">
              <img
                src={review.avatar}
                alt={review.user}
                className="w-12 h-12 rounded-full object-cover object-top"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-[#222222]">{review.user}</p>
                    <p className="text-xs text-[#717171]">
                      {new Date(review.date).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <i className="ri-star-fill text-[#FF385C] text-sm"></i>
                    <span className="text-sm font-semibold text-[#222222]">{review.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-[#717171] leading-relaxed">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-3 border-2 border-[#222222] text-[#222222] rounded-xl font-semibold hover:bg-[#222222] hover:text-white transition-all cursor-pointer whitespace-nowrap">
        Show All Reviews
      </button>
    </div>
  );
}