import { useEffect } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import LegalLayout from '../../components/feature/LegalLayout';

export default function RefundPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: 'cancellation',
      title: '1. Cancellation by Guests',
      content: 'Guests may cancel bookings according to the cancellation policy specified for each property at the time of booking.',
    },
    {
      id: 'eligibility',
      title: '2. Refund Eligibility',
      content: 'Refunds may be granted depending on the cancellation terms of the accommodation provider.',
    },
    {
      id: 'processing',
      title: '3. Processing Time',
      content: 'Approved refunds will be processed through the original payment method within 7–14 business days.',
    },
    {
      id: 'non-refundable',
      title: '4. Non-Refundable Bookings',
      content: 'Some bookings may be marked as non-refundable. In such cases, cancellations will not be eligible for a refund.',
    },
    {
      id: 'changes',
      title: '5. Changes to Bookings',
      content: 'Requests to modify bookings must be submitted before the check-in date and are subject to property availability.',
    },
    {
      id: 'no-show',
      title: '6. No-Show Policy',
      content: 'If a guest fails to check in on the scheduled date without prior cancellation, the booking may be treated as a no-show and the full booking amount may be charged.',
    },
    {
      id: 'force-majeure',
      title: '7. Force Majeure',
      content: 'In the event of circumstances beyond our control (natural disasters, government restrictions, etc.), refunds or booking changes may be handled on a case-by-case basis.',
    },
    {
      id: 'support',
      title: '8. Contact for Support',
      content: 'For cancellation or refund assistance, please contact: Email: support@drivrabooking.com',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <Navbar />
      <LegalLayout
        title="Refund & Cancellation Policy"
        lastUpdated="January 2024"
        description="Our refund and cancellation policy outlines the terms for modifying or canceling your booking."
        sections={sections}
      />
      <Footer />
    </div>
  );
}