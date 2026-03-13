import { useEffect } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import LegalLayout from '../../components/feature/LegalLayout';

export default function PaymentSecurityPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: 'secure',
      title: '1. Secure Payment Processing',
      content: 'All payments on Drivra Bookings are processed through industry-leading secure payment gateways including Flutterwave and Interswitch. We use SSL encryption to protect your payment information during transmission.',
    },
    {
      id: 'methods',
      title: '2. Accepted Payment Methods',
      content: 'We accept major credit cards (Visa, Mastercard, Verve), debit cards, bank transfers, and mobile money payments. All payment methods are processed through PCI-DSS compliant payment providers.',
    },
    {
      id: 'storage',
      title: '3. Payment Information Storage',
      content: 'We do not store your complete credit card details on our servers. Payment card information is securely stored by our payment gateway providers in compliance with international security standards.',
    },
    {
      id: 'encryption',
      title: '4. Data Encryption',
      content: 'All sensitive payment data is encrypted using 256-bit SSL/TLS encryption during transmission. This ensures that your payment information cannot be intercepted by unauthorized parties.',
    },
    {
      id: 'fraud',
      title: '5. Fraud Prevention',
      content: 'We employ advanced fraud detection systems to monitor and prevent fraudulent transactions. Suspicious activities are flagged and investigated to protect both guests and property owners.',
    },
    {
      id: 'verification',
      title: '6. Payment Verification',
      content: 'Some transactions may require additional verification steps such as 3D Secure authentication or OTP verification to ensure the security of your payment.',
    },
    {
      id: 'disputes',
      title: '7. Payment Disputes',
      content: 'If you notice any unauthorized charges or have concerns about a payment, please contact our support team immediately at support@drivrabookings.com. We will investigate and resolve the issue promptly.',
    },
    {
      id: 'compliance',
      title: '8. Regulatory Compliance',
      content: 'Our payment processing systems comply with international payment security standards including PCI-DSS, GDPR, and local financial regulations in South Africa.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <Navbar />
      <LegalLayout
        title="Payment Security"
        lastUpdated="January 2024"
        description="Your payment security is our top priority. Learn how we protect your financial information and ensure safe transactions."
        sections={sections}
      />
      <Footer />
    </div>
  );
}