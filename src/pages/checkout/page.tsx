import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import StepIndicator from './components/StepIndicator';
import OrderReview from './components/OrderReview';
import GuestDetails from './components/GuestDetails';
import PaymentPanel from './components/PaymentPanel';
import FinalOrderSummary from './components/FinalOrderSummary';

export default function CheckoutPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const step = parseInt(searchParams.get('step') || '1', 10);

  // Mock booking data - in production, fetch from API
  const [bookingData] = useState({
    property: {
      id: '1',
      name: 'Luxury Beachfront Villa',
      location: 'Lagos, Nigeria',
      image: 'https://readdy.ai/api/search-image?query=luxury%20modern%20beachfront%20villa%20exterior%20with%20infinity%20pool%20ocean%20view%20sunset%20tropical%20paradise%20architectural%20photography%20high%20end%20resort%20style&width=800&height=600&seq=villa-main-001&orientation=landscape',
      type: 'Entire Villa',
      pricePerNight: 200,
    },
    checkIn: searchParams.get('checkIn') || '2024-03-15',
    checkOut: searchParams.get('checkOut') || '2024-03-17',
    guests: parseInt(searchParams.get('guests') || '2', 10),
    nights: 2,
    cancellationPolicy: 'Free cancellation before Mar 13, 2024',
  });

  const [currency, setCurrency] = useState('USD');
  const [paymentMethod, setPaymentMethod] = useState<'flutterwave' | 'interswitch'>('flutterwave');
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    specialRequests: '',
  });

  // Calculate pricing
  const subtotal = bookingData.property.pricePerNight * bookingData.nights;
  const taxRate = 0.1; // 10%
  const tax = subtotal * taxRate;
  const serviceCharge = 20;
  const total = subtotal + tax + serviceCharge;

  // Redirect to step 1 if no step is specified
  useEffect(() => {
    if (!searchParams.get('step')) {
      navigate(`/checkout/${bookingId}?step=1`, { replace: true });
    }
  }, [searchParams, navigate, bookingId]);

  // Validate step progression
  useEffect(() => {
    if (step < 1 || step > 3) {
      navigate(`/checkout/${bookingId}?step=1`, { replace: true });
    }
  }, [step, navigate, bookingId]);

  const handleContinueToGuestDetails = () => {
    navigate(`/checkout/${bookingId}?step=2`);
  };

  const handleContinueToPayment = (info: typeof guestInfo, method: 'flutterwave' | 'interswitch') => {
    setGuestInfo(info);
    setPaymentMethod(method);
    navigate(`/checkout/${bookingId}?step=3`);
  };

  const handleChangePaymentMethod = () => {
    navigate(`/checkout/${bookingId}?step=2`);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Step Indicator */}
          <StepIndicator currentStep={step} />

          {/* Step Content */}
          <div className="mt-8">
            {step === 1 && (
              <OrderReview
                property={bookingData.property}
                checkIn={bookingData.checkIn}
                checkOut={bookingData.checkOut}
                guests={bookingData.guests}
                nights={bookingData.nights}
                cancellationPolicy={bookingData.cancellationPolicy}
                pricePerNight={bookingData.property.pricePerNight}
                taxRate={taxRate}
                serviceCharge={serviceCharge}
                currency={currency}
                onCurrencyChange={setCurrency}
                onContinue={handleContinueToGuestDetails}
              />
            )}

            {step === 2 && (
              <GuestDetails
                property={bookingData.property}
                checkIn={bookingData.checkIn}
                checkOut={bookingData.checkOut}
                guests={bookingData.guests}
                total={total}
                currency={currency}
                onContinue={handleContinueToPayment}
              />
            )}

            {step === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Payment Panel */}
                <div className="lg:col-span-2">
                  <PaymentPanel
                    bookingId={bookingId || '1'}
                    paymentMethod={paymentMethod}
                    totalAmount={total}
                    currency={currency}
                    onChangeMethod={handleChangePaymentMethod}
                  />
                </div>

                {/* Right Column - Final Order Summary */}
                <div className="lg:col-span-1">
                  <FinalOrderSummary
                    propertyImage={bookingData.property.image}
                    propertyName={bookingData.property.name}
                    location={bookingData.property.location}
                    checkIn={bookingData.checkIn}
                    checkOut={bookingData.checkOut}
                    guests={bookingData.guests}
                    pricePerNight={bookingData.property.pricePerNight}
                    nights={bookingData.nights}
                    taxRate={taxRate}
                    serviceCharge={serviceCharge}
                    currency={currency}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}