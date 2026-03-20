import { useEffect } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import LegalLayout from '../../components/feature/LegalLayout';

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: 'services',
      title: '1. Services Provided',
      content: 'Drivra Bookings provides an online platform that allows users to search, compare, and book hotels, apartments, and other accommodation services.',
    },
    {
      id: 'eligibility',
      title: '2. Eligibility',
      content: 'You must be at least 18 years old to make a booking through our website.',
    },
    {
      id: 'booking',
      title: '3. Booking and Payments',
      content: 'All bookings made through the website are subject to availability and confirmation. Payment may be processed through secure third-party payment providers.',
    },
    {
      id: 'pricing',
      title: '4. Pricing',
      content: 'All prices displayed on the website are subject to change without prior notice. Taxes or service fees may apply depending on the property.',
    },
    {
      id: 'responsibilities',
      title: '5. User Responsibilities',
      content: 'You agree to provide accurate and complete information when making a booking. Any misuse of the platform may result in suspension or termination of access.',
    },
    {
      id: 'liability',
      title: '6. Limitation of Liability',
      content: 'Drivra Bookings acts as an intermediary platform connecting guests with accommodation providers. We are not responsible for the actions, services, or quality of accommodations provided by third-party property owners.',
    },
    {
      id: 'intellectual',
      title: '7. Intellectual Property',
      content: 'All content on this website, including text, graphics, and logos, is the property of Drivra Bookings and may not be used without permission.',
    },
    {
      id: 'changes',
      title: '8. Changes to Terms',
      content: 'We reserve the right to update these Terms and Conditions at any time. Continued use of the website indicates acceptance of the updated terms.',
    },
    {
      id: 'contact',
      title: '9. Contact Information',
      content: 'If you have any questions regarding these terms, please contact us at: Email: support@drivrabooking.com | Address: 58 Oxpecker Crescent, Crystal Park, Benoni, Gauteng, South Africa',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <Navbar />
      <LegalLayout
        title="Terms of Service"
        lastUpdated="January 2024"
        description="By accessing or using our website and services, you agree to comply with and be bound by the following Terms and Conditions."
        sections={sections}
      />
      <Footer />
    </div>
  );
}