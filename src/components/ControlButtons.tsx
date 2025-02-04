'use client';

interface ControlButtonsProps {
  currentStep: number;
  totalSteps: number;
  onReset: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onRunAll: () => void;
}

export default function ControlButtons({
  currentStep,
  totalSteps,
  onReset,
  onPrevious,
  onNext,
  onRunAll
}: ControlButtonsProps) {
  return (
    <div className="mx-auto">
      <div className="flex gap-4">
        <button
          onClick={onReset}
          className="group relative px-4 py-3 bg-red-500 text-white font-bold rounded-xl shadow-lg"
        >
          <span className="relative z-10">Reset</span>
        </button>
        <button
          onClick={onPrevious}
          disabled={currentStep === 0}
          className="group relative px-4 py-3 bg-yellow-500 text-white font-bold rounded-xl shadow-lg"
        >
          <span className="relative z-10">Previous</span>
        </button>
        <button
          onClick={onNext}
          disabled={currentStep === totalSteps}
          className="group relative px-4 py-3 bg-blue-500 text-white font-bold rounded-xl shadow-lg"
        >
          <span className="relative z-10">Next</span>
        </button>
        <button
          onClick={onRunAll}
          disabled={currentStep === totalSteps}
          className="group relative px-4 py-3 bg-green-500 text-white font-bold rounded-xl shadow-lg"
        >
          <span className="relative z-10">Run All</span>
        </button>
      </div>
    </div>
  );
} 