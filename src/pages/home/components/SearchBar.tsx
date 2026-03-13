import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (checkIn) params.append('checkIn', checkIn);
    if (checkOut) params.append('checkOut', checkOut);
    if (guests) params.append('guests', guests.toString());
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <>
      {/* Desktop: pill layout */}
      <div className="hidden md:flex bg-white rounded-full shadow-2xl p-2 flex-row items-center gap-2 max-w-4xl w-full">
        <div className="flex-1 px-6 py-3 border-r border-[#EBEBEB]">
          <label className="block text-xs font-semibold text-[#222222] mb-1">Location</label>
          <input
            type="text"
            placeholder="Where are you going?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-sm text-[#222222] placeholder-[#717171] focus:outline-none"
          />
        </div>

        <div className="flex-1 px-6 py-3 border-r border-[#EBEBEB]">
          <label className="block text-xs font-semibold text-[#222222] mb-1">Check-in</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full text-sm text-[#222222] focus:outline-none cursor-pointer"
          />
        </div>

        <div className="flex-1 px-6 py-3 border-r border-[#EBEBEB]">
          <label className="block text-xs font-semibold text-[#222222] mb-1">Check-out</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full text-sm text-[#222222] focus:outline-none cursor-pointer"
          />
        </div>

        <div className="relative flex-1 px-6 py-3">
          <label className="block text-xs font-semibold text-[#222222] mb-1">Guests</label>
          <button
            onClick={() => setShowGuestPicker(!showGuestPicker)}
            className="w-full text-left text-sm text-[#222222] focus:outline-none cursor-pointer"
          >
            {guests} {guests === 1 ? 'guest' : 'guests'}
          </button>
          {showGuestPicker && (
            <div className="absolute top-full mt-2 left-0 bg-white rounded-2xl shadow-xl p-4 w-64 z-50 border border-[#EBEBEB]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#222222]">Guests</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-[#DDDDDD] hover:border-[#222222] transition-colors cursor-pointer"
                  >
                    <i className="ri-subtract-line text-[#222222]"></i>
                  </button>
                  <span className="text-sm font-semibold text-[#222222] w-8 text-center">{guests}</span>
                  <button
                    onClick={() => setGuests(guests + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-[#DDDDDD] hover:border-[#222222] transition-colors cursor-pointer"
                  >
                    <i className="ri-add-line text-[#222222]"></i>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleSearch}
          className="bg-[#FF385C] text-white px-8 py-4 rounded-full hover:bg-[#E31C5F] transition-all hover:scale-105 cursor-pointer whitespace-nowrap font-semibold flex items-center gap-2"
        >
          <i className="ri-search-line text-xl"></i>
          <span>Search</span>
        </button>
      </div>

      {/* Mobile: compact card layout */}
      <div className="flex md:hidden bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto overflow-hidden">
        {/* Location */}
        <div className="flex flex-col w-full">
          <div className="px-4 py-3 border-b border-[#EBEBEB]">
            <label className="block text-xs font-semibold text-[#222222] mb-1 uppercase tracking-wide">
              <i className="ri-map-pin-line mr-1 text-[#FF385C]"></i>Location
            </label>
            <input
              type="text"
              placeholder="Where are you going?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-sm text-[#222222] placeholder-[#717171] focus:outline-none bg-transparent"
            />
          </div>

          {/* Check-in / Check-out row */}
          <div className="flex border-b border-[#EBEBEB]">
            <div className="flex-1 px-4 py-3 border-r border-[#EBEBEB]">
              <label className="block text-xs font-semibold text-[#222222] mb-1 uppercase tracking-wide">
                <i className="ri-calendar-line mr-1 text-[#FF385C]"></i>Check-in
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full text-sm text-[#222222] focus:outline-none cursor-pointer bg-transparent"
              />
            </div>
            <div className="flex-1 px-4 py-3">
              <label className="block text-xs font-semibold text-[#222222] mb-1 uppercase tracking-wide">
                <i className="ri-calendar-check-line mr-1 text-[#FF385C]"></i>Check-out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full text-sm text-[#222222] focus:outline-none cursor-pointer bg-transparent"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="relative px-4 py-3 border-b border-[#EBEBEB]">
            <label className="block text-xs font-semibold text-[#222222] mb-1 uppercase tracking-wide">
              <i className="ri-group-line mr-1 text-[#FF385C]"></i>Guests
            </label>
            <button
              onClick={() => setShowGuestPicker(!showGuestPicker)}
              className="w-full text-left text-sm text-[#222222] focus:outline-none cursor-pointer flex items-center justify-between"
            >
              <span>{guests} {guests === 1 ? 'guest' : 'guests'}</span>
              <i className={`ri-arrow-${showGuestPicker ? 'up' : 'down'}-s-line text-[#717171]`}></i>
            </button>
            {showGuestPicker && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-xl p-4 z-50 border-t border-[#EBEBEB]">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#222222]">Guests</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-[#DDDDDD] hover:border-[#222222] transition-colors cursor-pointer"
                    >
                      <i className="ri-subtract-line text-[#222222]"></i>
                    </button>
                    <span className="text-sm font-semibold text-[#222222] w-8 text-center">{guests}</span>
                    <button
                      onClick={() => setGuests(guests + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-[#DDDDDD] hover:border-[#222222] transition-colors cursor-pointer"
                    >
                      <i className="ri-add-line text-[#222222]"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="bg-[#FF385C] text-white py-4 hover:bg-[#E31C5F] transition-all cursor-pointer font-semibold flex items-center justify-center gap-2 text-sm"
          >
            <i className="ri-search-line text-lg"></i>
            <span>Search</span>
          </button>
        </div>
      </div>
    </>
  );
}
