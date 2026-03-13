interface PropertyInfoProps {
  property: any;
}

export default function PropertyInfo({ property }: PropertyInfoProps) {
  if (!property) return null;

  const host = property.host ?? {
    name: 'Host',
    avatar: '',
    verified: false,
    joinedDate: 'N/A',
  };

  const description = property.description ?? 'No description available for this property.';
  const amenities = Array.isArray(property.amenities) ? property.amenities : [];
  const houseRules = Array.isArray(property.houseRules) ? property.houseRules : [];

  const guests = property.guests ?? 1;
  const bedrooms = property.bedrooms ?? 1;
  const bathrooms = property.bathrooms ?? 1;
  const checkIn = property.checkIn ?? 'Flexible check-in';
  const checkOut = property.checkOut ?? 'Flexible check-out';
  const cancellationPolicy = property.cancellationPolicy ?? 'Cancellation policy not provided.';

  return (
    <div className="space-y-8">
      {/* Host Info */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#222222] mb-1">
              Hosted by {host.name}
            </h2>
            <div className="flex items-center gap-4 text-sm text-[#717171]">
              <span>{guests} guests</span>
              <span>•</span>
              <span>{bedrooms} bedrooms</span>
              <span>•</span>
              <span>{bathrooms} bathrooms</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {host.avatar ? (
              <img
                src={host.avatar}
                alt={host.name}
                className="w-16 h-16 rounded-full object-cover object-top"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#F7F7F7] flex items-center justify-center text-[#717171]">
                <i className="ri-user-line text-2xl"></i>
              </div>
            )}
            {host.verified && (
              <div className="w-6 h-6 flex items-center justify-center bg-[#FF385C] rounded-full">
                <i className="ri-check-line text-white text-sm"></i>
              </div>
            )}
          </div>
        </div>
        <p className="text-sm text-[#717171]">Joined {host.joinedDate}</p>
      </div>

      {/* Description */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="text-xl font-bold text-[#222222] mb-4">About this place</h3>
        <p className="text-sm text-[#717171] leading-relaxed">{description}</p>
      </div>

      {/* Amenities */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="text-xl font-bold text-[#222222] mb-6">Amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {amenities.map((amenity: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-[#F7F7F7] rounded-lg">
                <i className={`ri-${amenity.icon || 'checkbox-circle-line'} text-[#FF385C] text-lg`}></i>
              </div>
              <span className="text-sm text-[#222222]">{amenity.name ?? 'Amenity'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Check-in/out */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="text-xl font-bold text-[#222222] mb-6">Check-in & Check-out</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <i className="ri-login-box-line text-[#FF385C] text-xl"></i>
              <span className="text-sm font-semibold text-[#222222]">Check-in</span>
            </div>
            <p className="text-sm text-[#717171]">{checkIn}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <i className="ri-logout-box-line text-[#FF385C] text-xl"></i>
              <span className="text-sm font-semibold text-[#222222]">Check-out</span>
            </div>
            <p className="text-sm text-[#717171]">{checkOut}</p>
          </div>
        </div>
      </div>

      {/* Cancellation Policy */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="text-xl font-bold text-[#222222] mb-4">Cancellation Policy</h3>
        <p className="text-sm text-[#717171]">{cancellationPolicy}</p>
      </div>

      {/* House Rules */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="text-xl font-bold text-[#222222] mb-4">House Rules</h3>
        <ul className="space-y-2">
          {houseRules.map((rule: string, index: number) => (
            <li key={index} className="flex items-center gap-2 text-sm text-[#717171]">
              <i className="ri-checkbox-circle-line text-[#FF385C]"></i>
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}