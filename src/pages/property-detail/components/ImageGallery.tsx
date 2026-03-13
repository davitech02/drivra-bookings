interface ImageGalleryProps {
  images: string[];
  onViewAll: () => void;
}

export default function ImageGallery({ images, onViewAll }: ImageGalleryProps) {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[500px] rounded-2xl overflow-hidden">
      <div
        className="col-span-2 row-span-2 relative cursor-pointer group overflow-hidden"
        onClick={onViewAll}
      >
        <img
          src={images[0]}
          alt="Main"
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      {images.slice(1, 5).map((image, index) => (
        <div
          key={index}
          className="relative cursor-pointer group overflow-hidden"
          onClick={onViewAll}
        >
          <img
            src={image}
            alt={`Gallery ${index + 2}`}
            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
          />
          {index === 3 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <button className="px-6 py-3 bg-white text-[#222222] rounded-xl font-semibold hover:bg-[#F7F7F7] transition-all cursor-pointer whitespace-nowrap">
                View All Photos
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}