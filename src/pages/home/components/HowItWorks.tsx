export default function HowItWorks() {
  const steps = [
    {
      icon: 'ri-search-line',
      title: 'Search & Discover',
      description: 'Browse through thousands of verified properties in your desired location with detailed filters and real-time availability.',
    },
    {
      icon: 'ri-calendar-check-line',
      title: 'Book Instantly',
      description: 'Select your dates, review pricing, and complete your booking in minutes with our secure payment system.',
    },
    {
      icon: 'ri-key-line',
      title: 'Enjoy Your Stay',
      description: 'Check in seamlessly and enjoy your perfect accommodation with 24/7 customer support throughout your journey.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-[#222222] mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            How It Works
          </h2>
          <p className="text-lg text-[#717171] max-w-2xl mx-auto">
            Book your perfect stay in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-[#FF385C] to-[#E31C5F] rounded-2xl shadow-lg">
                  <i className={`${step.icon} text-4xl text-white`}></i>
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 flex items-center justify-center bg-[#222222] text-white rounded-full font-bold text-lg">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#222222] mb-3">{step.title}</h3>
              <p className="text-sm text-[#717171] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}