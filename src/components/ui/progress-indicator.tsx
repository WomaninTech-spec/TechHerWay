interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full transition-all duration-300 ${
            index < currentStep
              ? 'w-8 bg-linear-to-r from-purple-600 to-pink-500'
              : 'w-2 bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
}