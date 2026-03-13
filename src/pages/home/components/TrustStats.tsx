export default function TrustStats() {
  const stats = [
    {
      icon: 'ri-shield-check-line',
      value: '100%',
      label: 'Verified Properties',
      description: 'Every listing is verified for quality and safety',
    },
    {
      icon: 'ri-customer-service-2-line',
      value: '24/7',
      label: 'Customer Support',
      description: 'Round-the-clock assistance for all your needs',
    },
    {
      icon: 'ri-secure-payment-line',
      value: 'Secure',
      label: 'Payment Protection',
      description: 'Bank-level encryption for all transactions',
    },
    {
      icon: 'ri-star-smile-line',
      value: '4.9/5',
      label: 'Guest Satisfaction',
      description: 'Based on 50,000+ verified reviews',
    },
  ];

  return (
    <section className="py-20 bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-[#222222] mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Why Trust Drivra Bookings
          </h2>
          <p className="text-lg text-[#717171] max-w-2xl mx-auto">
            Your safety and satisfaction are our top priorities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-[#FF385C]/10 rounded-2xl mx-auto mb-6">
                <i className={`${stat.icon} text-3xl text-[#FF385C]`}></i>
              </div>
              <h3 className="text-3xl font-bold text-[#222222] mb-2">{stat.value}</h3>
              <p className="text-base font-semibold text-[#222222] mb-2">{stat.label}</p>
              <p className="text-sm text-[#717171]">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}