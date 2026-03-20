import { useEffect } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import LegalLayout from '../../components/feature/LegalLayout';

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: 'collection',
      title: '1. Information We Collect',
      content: 'We may collect the following information when you use our website: Name, Email address, Phone number, Payment details, and Booking information.',
    },
    {
      id: 'usage',
      title: '2. How We Use Your Information',
      content: 'Your information may be used to: Process bookings and payments, Provide customer support, Improve our website services, and Send booking confirmations and updates.',
    },
    {
      id: 'payment',
      title: '3. Payment Security',
      content: 'Payments are processed through secure third-party payment providers. We do not store sensitive payment card information on our servers.',
    },
    {
      id: 'sharing',
      title: '4. Sharing of Information',
      content: 'We may share necessary booking details with accommodation providers to complete reservations. We do not sell or rent personal data to third parties.',
    },
    {
      id: 'cookies',
      title: '5. Cookies',
      content: 'Our website may use cookies to enhance user experience and analyze website traffic.',
    },
    {
      id: 'protection',
      title: '6. Data Protection',
      content: 'We implement appropriate security measures to protect personal information against unauthorized access or disclosure.',
    },
    {
      id: 'rights',
      title: '7. Your Rights',
      content: 'You may request access to, correction of, or deletion of your personal data by contacting us.',
    },
    {
      id: 'contact',
      title: '8. Contact',
      content: 'For any privacy-related questions, contact: Email: support@drivrabooking.com',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <Navbar />
      <LegalLayout
        title="Privacy Policy"
        lastUpdated="January 2024"
        description="At Drivra Bookings, we respect your privacy and are committed to protecting your personal information."
        sections={sections}
      />
      <Footer />
    </div>
  );
}