import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#222222] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="https://public.readdy.ai/ai/img_res/0317cfbc-2bed-4be0-9de9-7bc37ff0b08b.png"
                alt="Drivra Bookings"
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                Drivra Bookings
              </span>
            </div>
            <p className="text-sm text-[#B0B0B0] leading-relaxed">
              Your trusted platform for booking unique stays and experiences around the world.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-[#FF385C] transition-colors cursor-pointer">
                <i className="ri-facebook-fill text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-[#FF385C] transition-colors cursor-pointer">
                <i className="ri-twitter-x-fill text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-[#FF385C] transition-colors cursor-pointer">
                <i className="ri-instagram-fill text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-[#FF385C] transition-colors cursor-pointer">
                <i className="ri-linkedin-fill text-lg"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-[#B0B0B0] hover:text-[#FF385C] transition-colors cursor-pointer">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-[#B0B0B0] hover:text-[#FF385C] transition-colors cursor-pointer">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-[#B0B0B0] hover:text-[#FF385C] transition-colors cursor-pointer">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-sm text-[#B0B0B0] hover:text-[#FF385C] transition-colors cursor-pointer">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-[#B0B0B0] hover:text-[#FF385C] transition-colors cursor-pointer">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-sm text-[#B0B0B0] hover:text-[#FF385C] transition-colors cursor-pointer">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/payment-security" className="text-sm text-[#B0B0B0] hover:text-[#FF385C] transition-colors cursor-pointer">
                  Payment Security
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-6">Newsletter</h3>
            <p className="text-sm text-[#B0B0B0] mb-4">
              Subscribe to get special offers and updates
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-[#B0B0B0] focus:outline-none focus:border-[#FF385C]"
              />
              <button className="px-5 py-2 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors cursor-pointer whitespace-nowrap text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#B0B0B0]">
            © 2024 Drivra Bookings. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-sm text-[#B0B0B0]">We accept:</span>
            <div className="flex items-center gap-3">
              <i className="ri-visa-line text-2xl text-[#B0B0B0]"></i>
              <i className="ri-mastercard-line text-2xl text-[#B0B0B0]"></i>
              <i className="ri-bank-card-line text-2xl text-[#B0B0B0]"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}