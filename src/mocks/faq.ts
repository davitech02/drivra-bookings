export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'bookings' | 'payments' | 'cancellations' | 'account';
}

export const faqItems: FaqItem[] = [
  // BOOKINGS
  {
    id: 'b1',
    category: 'bookings',
    question: 'How do I make a booking on Drivra Bookings?',
    answer: 'Simply search for your destination, select your check-in and check-out dates, choose a property that suits your needs, and click "Reserve". Follow the checkout steps to complete your booking securely.',
  },
  {
    id: 'b2',
    category: 'bookings',
    question: 'Can I book on behalf of someone else?',
    answer: 'Yes, you can book for another person. During the Guest Details step, enter the primary guest\'s name and contact information. Make sure the details match the guest who will be checking in.',
  },
  {
    id: 'b3',
    category: 'bookings',
    question: 'How will I receive my booking confirmation?',
    answer: 'Once your payment is confirmed, a booking confirmation email will be sent to the email address you provided during checkout. The email includes your booking reference number, property details, check-in instructions, and host contact information.',
  },
  {
    id: 'b4',
    category: 'bookings',
    question: 'Can I modify my booking dates after confirming?',
    answer: 'Modification requests must be submitted before the check-in date and are subject to property availability. Please contact our support team at support@drivrabooking.com with your booking reference number to request a date change.',
  },
  {
    id: 'b5',
    category: 'bookings',
    question: 'What is the minimum and maximum stay duration?',
    answer: 'Minimum and maximum stay requirements vary by property. Each listing displays its specific stay requirements on the property detail page. Most properties accept stays from 1 night up to 30 nights.',
  },
  {
    id: 'b6',
    category: 'bookings',
    question: 'Are all listed properties verified?',
    answer: 'Yes. We work exclusively with verified property owners and accommodation providers. Each listing goes through a review process before being published on our platform to ensure quality and accuracy.',
  },
  {
    id: 'b7',
    category: 'bookings',
    question: 'What does the service fee cover?',
    answer: 'The service fee covers platform maintenance, 24/7 customer support, secure payment processing, and the tools we provide to both guests and property owners to ensure a smooth booking experience.',
  },

  // PAYMENTS
  {
    id: 'p1',
    category: 'payments',
    question: 'What payment methods are accepted?',
    answer: 'We accept payments via Flutterwave and Interswitch, which support debit/credit cards (Visa, Mastercard, Verve), bank transfers, and USSD payments. All transactions are processed securely.',
  },
  {
    id: 'p2',
    category: 'payments',
    question: 'Is my payment information secure?',
    answer: 'Absolutely. All payments are processed through PCI-DSS compliant payment gateways (Flutterwave and Interswitch). We do not store your card details on our servers. All transactions are encrypted with SSL technology.',
  },
  {
    id: 'p3',
    category: 'payments',
    question: 'What currencies are supported?',
    answer: 'We primarily support USD, NGN, GBP, EUR, and ZAR. You can select your preferred currency during checkout. The final charge will be converted based on the current exchange rate at the time of payment.',
  },
  {
    id: 'p4',
    category: 'payments',
    question: 'Why was my payment declined?',
    answer: 'Payments can be declined for several reasons: insufficient funds, incorrect card details, bank restrictions on international transactions, or daily transaction limits. Please contact your bank or try a different payment method. You can also reach our support team for assistance.',
  },
  {
    id: 'p5',
    category: 'payments',
    question: 'When will I be charged for my booking?',
    answer: 'Payment is collected in full at the time of booking confirmation. You will not be charged until you click "Proceed to Secure Payment" and your transaction is successfully authorized.',
  },
  {
    id: 'p6',
    category: 'payments',
    question: 'Do you charge any hidden fees?',
    answer: 'No hidden fees. The total amount shown at checkout — including the nightly rate, taxes (10%), and service charge — is exactly what you will be charged. All costs are clearly itemized before you confirm payment.',
  },
  {
    id: 'p7',
    category: 'payments',
    question: 'Can I pay in installments?',
    answer: 'Currently, we require full payment at the time of booking. Installment payment options are not available at this time. We are working on introducing flexible payment plans in the future.',
  },

  // CANCELLATIONS
  {
    id: 'c1',
    category: 'cancellations',
    question: 'How do I cancel my booking?',
    answer: 'To cancel a booking, log into your account, go to "My Bookings", select the booking you wish to cancel, and click "Cancel Booking". Alternatively, contact our support team at support@drivrabooking.com with your booking reference number.',
  },
  {
    id: 'c2',
    category: 'cancellations',
    question: 'What is the cancellation policy?',
    answer: 'Cancellation policies vary by property and are clearly displayed on each listing page and during checkout. Policies range from "Free cancellation" (full refund if cancelled before a specified date) to "Non-refundable" bookings.',
  },
  {
    id: 'c3',
    category: 'cancellations',
    question: 'How long does a refund take to process?',
    answer: 'Approved refunds are processed within 7–14 business days back to your original payment method. Processing times may vary depending on your bank or card issuer.',
  },
  {
    id: 'c4',
    category: 'cancellations',
    question: 'What happens if I cancel a non-refundable booking?',
    answer: 'Non-refundable bookings are not eligible for a refund upon cancellation. This policy is clearly indicated on the property listing and during checkout before you confirm payment. We recommend purchasing travel insurance for added protection.',
  },
  {
    id: 'c5',
    category: 'cancellations',
    question: 'What is a no-show?',
    answer: 'A no-show occurs when a guest fails to check in on the scheduled date without prior cancellation. In this case, the full booking amount may be charged and no refund will be issued, regardless of the property\'s cancellation policy.',
  },
  {
    id: 'c6',
    category: 'cancellations',
    question: 'What if the property cancels my booking?',
    answer: 'In the rare event that a property cancels your confirmed booking, you will receive a full refund within 5–7 business days. Our team will also assist you in finding an alternative property at no extra cost.',
  },
  {
    id: 'c7',
    category: 'cancellations',
    question: 'Are cancellations covered during force majeure events?',
    answer: 'In the event of circumstances beyond our control — such as natural disasters, government travel restrictions, or pandemics — refunds or booking changes will be handled on a case-by-case basis. Please contact our support team as soon as possible.',
  },

  // ACCOUNT
  {
    id: 'a1',
    category: 'account',
    question: 'How do I create an account?',
    answer: 'Click "Sign Up" in the top navigation bar. You can register using your email address or sign in with Google, Facebook, or Apple. Fill in your name, email, and password to complete registration.',
  },
  {
    id: 'a2',
    category: 'account',
    question: 'I forgot my password. How do I reset it?',
    answer: 'Click "Login" and then select "Forgot Password". Enter your registered email address and we will send you a password reset link. The link expires after 24 hours for security purposes.',
  },
  {
    id: 'a3',
    category: 'account',
    question: 'How do I update my profile information?',
    answer: 'Log into your account and navigate to "Profile Settings" from the user menu. You can update your name, email address, phone number, and profile photo from there.',
  },
  {
    id: 'a4',
    category: 'account',
    question: 'Can I have multiple accounts?',
    answer: 'We recommend having only one account per person. Creating multiple accounts may result in all associated accounts being suspended. If you have trouble accessing your account, please contact our support team.',
  },
  {
    id: 'a5',
    category: 'account',
    question: 'How do I view my booking history?',
    answer: 'Log into your account and click "My Bookings" from the user menu. You will see a full list of your past and upcoming bookings, along with their status and details.',
  },
  {
    id: 'a6',
    category: 'account',
    question: 'How do I delete my account?',
    answer: 'To request account deletion, please contact our support team at support@drivrabooking.com. Note that deleting your account will permanently remove all your booking history and personal data from our platform.',
  },
  {
    id: 'a7',
    category: 'account',
    question: 'Is my personal data safe with Drivra Bookings?',
    answer: 'Yes. We take data privacy seriously and comply with applicable data protection regulations. Your personal information is never sold or rented to third parties. Please review our Privacy Policy for full details on how we handle your data.',
  },
];

export const faqCategories = [
  { id: 'all', label: 'All Topics', icon: 'ri-apps-2-line' },
  { id: 'bookings', label: 'Bookings', icon: 'ri-calendar-check-line' },
  { id: 'payments', label: 'Payments', icon: 'ri-secure-payment-line' },
  { id: 'cancellations', label: 'Cancellations', icon: 'ri-refund-2-line' },
  { id: 'account', label: 'Account', icon: 'ri-user-settings-line' },
];
