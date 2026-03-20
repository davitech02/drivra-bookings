import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

const teamMembers = [
  {
    name: 'Amara Osei',
    role: 'Chief Executive Officer',
    image: 'https://readdy.ai/api/search-image?query=professional%20african%20male%20executive%20portrait%2C%20confident%20smile%2C%20business%20attire%2C%20clean%20white%20studio%20background%2C%20corporate%20headshot%20photography%2C%20sharp%20focus%2C%20natural%20lighting%2C%20modern%20professional%20look&width=400&height=400&seq=team1&orientation=squarish',
  },
  {
    name: 'Fatima Nkosi',
    role: 'Head of Operations',
    image: 'https://readdy.ai/api/search-image?query=professional%20african%20female%20executive%20portrait%2C%20warm%20confident%20smile%2C%20business%20attire%2C%20clean%20white%20studio%20background%2C%20corporate%20headshot%20photography%2C%20sharp%20focus%2C%20natural%20lighting%2C%20modern%20professional%20look&width=400&height=400&seq=team2&orientation=squarish',
  },
  {
    name: 'Kwame Adeyemi',
    role: 'Chief Technology Officer',
    image: 'https://readdy.ai/api/search-image?query=professional%20young%20african%20male%20tech%20executive%20portrait%2C%20friendly%20smile%2C%20smart%20casual%20attire%2C%20clean%20white%20studio%20background%2C%20corporate%20headshot%20photography%2C%20sharp%20focus%2C%20natural%20lighting%2C%20modern%20professional%20look&width=400&height=400&seq=team3&orientation=squarish',
  },
  {
    name: 'Zara Mensah',
    role: 'Customer Experience Lead',
    image: 'https://readdy.ai/api/search-image?query=professional%20young%20african%20female%20customer%20service%20executive%20portrait%2C%20warm%20smile%2C%20business%20casual%20attire%2C%20clean%20white%20studio%20background%2C%20corporate%20headshot%20photography%2C%20sharp%20focus%2C%20natural%20lighting%2C%20modern%20professional%20look&width=400&height=400&seq=team4&orientation=squarish',
  },
];

const values = [
  {
    icon: 'ri-shield-check-line',
    title: 'Trust & Safety',
    description: 'Every property on our platform is verified. We ensure secure transactions and transparent pricing for every booking.',
  },
  {
    icon: 'ri-heart-line',
    title: 'Guest-First',
    description: 'We put travelers at the center of everything we do — from seamless search to 24/7 support throughout your stay.',
  },
  {
    icon: 'ri-global-line',
    title: 'Global Reach',
    description: 'From Lagos to London, Cape Town to Dubai — we connect guests with quality accommodations across the globe.',
  },
  {
    icon: 'ri-hand-heart-line',
    title: 'Community',
    description: 'We empower local property owners to reach a wider audience while giving guests authentic, local experiences.',
  },
  {
    icon: 'ri-lock-line',
    title: 'Secure Payments',
    description: 'All transactions are encrypted and processed through trusted payment gateways, keeping your money safe.',
  },
  {
    icon: 'ri-customer-service-2-line',
    title: '24/7 Support',
    description: 'Our dedicated support team is always available to assist you before, during, and after your stay.',
  },
];

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F7F7]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20hotel%20lobby%20interior%20with%20elegant%20decor%2C%20warm%20ambient%20lighting%2C%20marble%20floors%2C%20large%20windows%2C%20sophisticated%20atmosphere%2C%20professional%20architectural%20photography%2C%20clean%20simple%20background%2C%20luxury%20hospitality%20environment%2C%20inviting%20and%20spacious&width=1920&height=700&seq=about-hero&orientation=landscape')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-[#FF385C]/20 border border-[#FF385C]/40 text-[#FF385C] text-sm font-medium rounded-full mb-6">
            Our Story
          </span>
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            About Drivra Bookings
          </h1>
          <p className="text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
            Making accommodation booking simple, reliable, and accessible for travelers around the world.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-[#FF385C]/10 text-[#FF385C] text-sm font-semibold rounded-full mb-4">
                Who We Are
              </span>
              <h2
                className="text-4xl font-bold text-[#222222] mb-6 leading-tight"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Welcome to Drivra Bookings
              </h2>
              <div className="space-y-4 text-[#717171] text-base leading-relaxed">
                <p>
                  Welcome to <strong className="text-[#222222]">Drivra Bookings</strong>, operated by Drivra Bookings (Pty) Ltd.
                </p>
                <p>
                  Our mission is to make accommodation booking simple, reliable, and accessible for travelers around the world. Through our platform, guests can search, compare, and reserve hotels, apartments, and other short-term accommodation options in various destinations.
                </p>
                <p>
                  We work with verified property owners and accommodation providers to offer comfortable and affordable places to stay. Our goal is to provide travelers with a convenient booking experience while helping property owners reach a wider audience.
                </p>
                <p>
                  Our platform allows customers to browse available accommodations, check pricing and availability, and securely complete bookings online.
                </p>
                <p>
                  At <strong className="text-[#222222]">Drivra Bookings</strong>, we are committed to providing excellent customer service, transparent pricing, and secure online transactions. For questions or assistance, please contact our support team.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 mt-8 px-7 py-3 bg-[#FF385C] text-white rounded-xl font-semibold hover:bg-[#E31C5F] transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-mail-line"></i>
                Get In Touch
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://readdy.ai/api/search-image?query=diverse%20team%20of%20professionals%20working%20together%20in%20modern%20office%2C%20collaboration%2C%20laptops%20and%20documents%20on%20table%2C%20bright%20open%20workspace%2C%20warm%20natural%20lighting%2C%20professional%20business%20photography%2C%20clean%20simple%20background%2C%20positive%20team%20atmosphere&width=700&height=500&seq=about-team-img&orientation=landscape"
                  alt="Drivra Bookings Team"
                  className="w-full h-80 object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-5 flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#FF385C]/10 rounded-xl">
                  <i className="ri-building-line text-2xl text-[#FF385C]"></i>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#222222]">10,000+</p>
                  <p className="text-sm text-[#717171]">Verified Properties</p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-lg p-5 flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-green-50 rounded-xl">
                  <i className="ri-user-smile-line text-2xl text-green-500"></i>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#222222]">50,000+</p>
                  <p className="text-sm text-[#717171]">Happy Guests</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Details */}
      <section className="py-16 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'ri-building-2-line', label: 'Company Name', value: 'Drivra Bookings (Pty) Ltd' },
              { icon: 'ri-global-line', label: 'Website', value: 'drivrabookings.com' },
              { icon: 'ri-mail-line', label: 'Email', value: 'support@drivrabooking.com' },
              { icon: 'ri-map-pin-line', label: 'Address', value: '58 Oxpecker Crescent, Crystal Park, Benoni, Gauteng, South Africa' },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-3 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 flex items-center justify-center bg-[#FF385C]/10 rounded-xl">
                  <i className={`${item.icon} text-xl text-[#FF385C]`}></i>
                </div>
                <p className="text-xs font-semibold text-[#717171] uppercase tracking-wider">{item.label}</p>
                <p className="text-sm font-medium text-[#222222] leading-snug">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-[#FF385C]/10 text-[#FF385C] text-sm font-semibold rounded-full mb-4">
              What We Stand For
            </span>
            <h2
              className="text-4xl font-bold text-[#222222]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="group bg-[#F7F7F7] rounded-2xl p-7 hover:bg-white hover:shadow-md transition-all hover:-translate-y-1 cursor-default"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-[#FF385C]/10 rounded-xl mb-5 group-hover:bg-[#FF385C] transition-colors">
                  <i className={`${v.icon} text-xl text-[#FF385C] group-hover:text-white transition-colors`}></i>
                </div>
                <h3 className="text-lg font-bold text-[#222222] mb-2">{v.title}</h3>
                <p className="text-sm text-[#717171] leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-[#FF385C]/10 text-[#FF385C] text-sm font-semibold rounded-full mb-4">
              The People Behind Drivra
            </span>
            <h2
              className="text-4xl font-bold text-[#222222]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Meet Our Team
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
              >
                <div className="w-full h-56 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-[#222222]">{member.name}</h3>
                  <p className="text-sm text-[#FF385C] font-medium mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 bg-gradient-to-r from-[#FF385C] to-[#E31C5F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '10,000+', label: 'Properties Listed' },
              { value: '150+', label: 'Cities Covered' },
              { value: '50,000+', label: 'Happy Guests' },
              { value: '4.8★', label: 'Average Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-white/80 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2
            className="text-3xl font-bold text-[#222222] mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Ready to Book Your Next Stay?
          </h2>
          <p className="text-[#717171] mb-8">
            Browse thousands of verified properties and find the perfect accommodation for your trip.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/properties"
              className="px-8 py-3 bg-[#FF385C] text-white rounded-xl font-semibold hover:bg-[#E31C5F] transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              Explore Properties
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border-2 border-[#FF385C] text-[#FF385C] rounded-xl font-semibold hover:bg-[#FF385C] hover:text-white transition-all cursor-pointer whitespace-nowrap"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
