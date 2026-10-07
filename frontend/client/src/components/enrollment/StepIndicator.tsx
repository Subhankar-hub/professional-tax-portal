interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = [
  "Personal Info",
  "OTP Verify",
  "Establishment",
  "Type",
  "Details",
  "Review",
  "Submit",
  "Confirm"
];

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 w-full">
            {Array.from({ length: totalSteps }, (_, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === currentStep;
              const isCompleted = stepNumber < currentStep;
              
              return (
                <div
                  key={stepNumber}
                  className={`step-indicator flex items-center space-x-2 ${
                    isCompleted ? 'completed' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isActive || isCompleted
                        ? 'bg-primary text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {stepNumber}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      isActive || isCompleted
                        ? 'text-primary'
                        : 'text-gray-600'
                    }`}
                  >
                    {stepLabels[index]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
