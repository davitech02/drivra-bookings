interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { number: 1, label: 'Order Review' },
    { number: 2, label: 'Guest Details' },
    { number: 3, label: 'Payment' },
    { number: 4, label: 'Confirmation' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  step.number < currentStep
                    ? 'bg-[#FF385C] text-white'
                    : step.number === currentStep
                    ? 'bg-[#FF385C] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.number < currentStep ? (
                  <i className="ri-check-line text-xl"></i>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`mt-3 text-sm font-medium ${
                  step.number <= currentStep ? 'text-[#222222]' : 'text-[#717171]'
                }`}
              >
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-4 mb-8">
                <div
                  className={`h-full transition-all ${
                    step.number < currentStep ? 'bg-[#FF385C]' : 'bg-gray-200'
                  }`}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}