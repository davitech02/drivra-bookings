import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const messageField = form.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
    if (messageField && messageField.value.length > 500) return;

    setSubmitting(true);
    const formData = new FormData(form);
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      params.append(key, value.toString());
    });

    try {
      await fetch('https://readdy.ai/api/form/d6kqc0lv117fnkj2gg20', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      setSubmitted(true);
      form.reset();
      setCharCount(0);
    } catch {
      // silent
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: 'ri-mail-send-line',
      title: 'Email Support',
      value: 'support@drivrabookings.com',
      sub: 'We reply within 24 hours',
      href: 'mailto:support@drivrabookings.com',
    },
    {
      icon: 'ri-phone-line',
      title: 'Phone Number',
      value: '+27 11 000 0000',
      sub: 'Mon–Fri, 8am–6pm SAST',
      href: 'tel:+27110000000',
    },
    {
      icon: 'ri-map-pin-2-line',
      title: 'Office Address',
      value: '58 Oxpecker Crescent, Crystal Park, Benoni, Gauteng, South Africa',
      sub: 'Postal address only',
      href: 'https://maps.google.com/?q=Crystal+Park+Benoni+Gauteng+South+Africa',
    },
    {
      icon: 'ri-time-line',
      title: 'Business Hours',
      value: 'Mon – Fri: 8:00am – 6:00pm',
      sub: 'SAST (UTC+2)',
      href: null,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20customer%20support%20office%20with%20friendly%20staff%2C%20bright%20open%20workspace%2C%20computers%20and%20headsets%2C%20professional%20business%20environment%2C%20clean%20simple%20background%2C%20warm%20natural%20lighting%2C%20welcoming%20atmosphere%2C%20corporate%20photography&width=1920&height=600&seq=contact-hero&orientation=landscape')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-[#FF385C]/20 border border-[#FF385C]/40 text-[#FF385C] text-sm font-medium rounded-full mb-6">
            We&apos;re Here to Help
          </span>
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-5 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Contact Us
          </h1>
          <p className="text-lg text-white/85 max-w-xl mx-auto">
            Have a question or need assistance? Our support team is ready to help you 24/7.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item) => (
              <div
                key={item.title}
                className="bg-[#F7F7F7] rounded-2xl p-6 hover:shadow-md transition-all hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-[#FF385C]/10 rounded-xl mb-4 group-hover:bg-[#FF385C] transition-colors">
                  <i className={`${item.icon} text-xl text-[#FF385C] group-hover:text-white transition-colors`}></i>
                </div>
                <p className="text-xs font-semibold text-[#717171] uppercase tracking-wider mb-2">{item.title}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#222222] hover:text-[#FF385C] transition-colors leading-snug block"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm font-semibold text-[#222222] leading-snug">{item.value}</p>
                )}
                <p className="text-xs text-[#717171] mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-20 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="mb-8">
                <span className="inline-block px-4 py-1.5 bg-[#FF385C]/10 text-[#FF385C] text-sm font-semibold rounded-full mb-3">
                  Send a Message
                </span>
                <h2
                  className="text-3xl font-bold text-[#222222]"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Get In Touch
                </h2>
                <p className="text-[#717171] text-sm mt-2">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 flex items-center justify-center bg-green-50 rounded-full mb-5">
                    <i className="ri-checkbox-circle-line text-4xl text-green-500"></i>
                  </div>
                  <h3 className="text-xl font-bold text-[#222222] mb-2">Message Sent!</h3>
                  <p className="text-[#717171] text-sm max-w-xs">
                    Thank you for reaching out. Our support team will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 bg-[#FF385C] text-white rounded-xl text-sm font-semibold hover:bg-[#E31C5F] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  data-readdy-form
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#222222] mb-1.5">
                        First Name <span className="text-[#FF385C]">*</span>
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        required
                        placeholder="John"
                        className="w-full px-4 py-3 border border-[#DDDDDD] rounded-xl text-sm text-[#222222] placeholder-[#B0B0B0] focus:outline-none focus:border-[#FF385C] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#222222] mb-1.5">
                        Last Name <span className="text-[#FF385C]">*</span>
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        required
                        placeholder="Doe"
                        className="w-full px-4 py-3 border border-[#DDDDDD] rounded-xl text-sm text-[#222222] placeholder-[#B0B0B0] focus:outline-none focus:border-[#FF385C] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#222222] mb-1.5">
                      Email Address <span className="text-[#FF385C]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-[#DDDDDD] rounded-xl text-sm text-[#222222] placeholder-[#B0B0B0] focus:outline-none focus:border-[#FF385C] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#222222] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+27 11 000 0000"
                      className="w-full px-4 py-3 border border-[#DDDDDD] rounded-xl text-sm text-[#222222] placeholder-[#B0B0B0] focus:outline-none focus:border-[#FF385C] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#222222] mb-1.5">
                      Subject <span className="text-[#FF385C]">*</span>
                    </label>
                    <select
                      name="subject"
                      required
                      className="w-full px-4 py-3 border border-[#DDDDDD] rounded-xl text-sm text-[#222222] focus:outline-none focus:border-[#FF385C] transition-colors bg-white cursor-pointer"
                    >
                      <option value="">Select a subject</option>
                      <option value="Booking Inquiry">Booking Inquiry</option>
                      <option value="Payment Issue">Payment Issue</option>
                      <option value="Cancellation Request">Cancellation Request</option>
                      <option value="Property Listing">Property Listing</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="General Question">General Question</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#222222] mb-1.5">
                      Message <span className="text-[#FF385C]">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      maxLength={500}
                      placeholder="Tell us how we can help you..."
                      onChange={(e) => setCharCount(e.target.value.length)}
                      className="w-full px-4 py-3 border border-[#DDDDDD] rounded-xl text-sm text-[#222222] placeholder-[#B0B0B0] focus:outline-none focus:border-[#FF385C] transition-colors resize-none"
                    />
                    <p className={`text-xs mt-1 text-right ${charCount > 480 ? 'text-[#FF385C]' : 'text-[#717171]'}`}>
                      {charCount}/500
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || charCount > 500}
                    className="w-full py-3.5 bg-[#FF385C] text-white rounded-xl font-semibold text-sm hover:bg-[#E31C5F] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <i className="ri-loader-4-line animate-spin"></i>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="ri-send-plane-line"></i>
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-xs text-[#717171] text-center">
                    By submitting, you agree to our{' '}
                    <Link to="/privacy" className="text-[#FF385C] hover:underline cursor-pointer">Privacy Policy</Link>.
                  </p>
                </form>
              )}
            </div>

            {/* Map + Extra Info */}
            <div className="flex flex-col gap-6">
              {/* Map */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex-1">
                <div className="p-6 border-b border-[#EBEBEB]">
                  <h3 className="text-lg font-bold text-[#222222] flex items-center gap-2">
                    <i className="ri-map-pin-line text-[#FF385C]"></i>
                    Our Location
                  </h3>
                  <p className="text-sm text-[#717171] mt-1">
                    58 Oxpecker Crescent, Crystal Park, Benoni, Gauteng, South Africa
                  </p>
                </div>
                <div className="w-full h-72">
                  <iframe
                    title="Drivra Bookings Office Location"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU3Kqo&q=Crystal+Park,Benoni,Gauteng,South+Africa"
                  />
                </div>
              </div>

              {/* FAQ Teaser */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-[#222222] mb-4 flex items-center gap-2">
                  <i className="ri-question-answer-line text-[#FF385C]"></i>
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {[
                    'How do I cancel or modify my booking?',
                    'What payment methods do you accept?',
                    'How long does a refund take?',
                  ].map((q) => (
                    <Link
                      key={q}
                      to="/faq"
                      className="flex items-center justify-between p-3 bg-[#F7F7F7] rounded-xl hover:bg-[#FF385C]/5 transition-colors group cursor-pointer"
                    >
                      <span className="text-sm text-[#222222] group-hover:text-[#FF385C] transition-colors">{q}</span>
                      <i className="ri-arrow-right-s-line text-[#717171] group-hover:text-[#FF385C] transition-colors"></i>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/faq"
                  className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-[#FF385C] hover:underline cursor-pointer"
                >
                  View all FAQs <i className="ri-arrow-right-line"></i>
                </Link>
              </div>

              {/* Social */}
              <div className="bg-gradient-to-br from-[#FF385C] to-[#E31C5F] rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Follow Us</h3>
                <p className="text-white/80 text-sm mb-5">Stay updated with the latest deals and travel inspiration.</p>
                <div className="flex items-center gap-3">
                  {[
                    { icon: 'ri-facebook-fill', label: 'Facebook' },
                    { icon: 'ri-instagram-fill', label: 'Instagram' },
                    { icon: 'ri-twitter-x-fill', label: 'Twitter/X' },
                    { icon: 'ri-linkedin-fill', label: 'LinkedIn' },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href="#"
                      aria-label={s.label}
                      className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/40 transition-colors cursor-pointer"
                    >
                      <i className={`${s.icon} text-lg`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
