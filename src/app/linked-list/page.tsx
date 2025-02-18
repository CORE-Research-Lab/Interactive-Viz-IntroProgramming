'use client';

import { useState } from 'react';
import CodeWindow from '@/components/CodeWindow';
import MemoryWindow from '@/components/MemoryWindow';
import VisualWindow from '@/components/VisualWindow';
import ControlButtons from '@/components/ControlButtons';
import { stepConfigs, linkedListCode } from './config';

export default function LinkedListPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 6;

  const resetSteps = () => {
    setCurrentStep(0);
  };

  const incrementStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const decrementStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const runAllSteps = () => {
    setCurrentStep(totalSteps);
  };

  return (
    <main className="min-h-screen p-4 bg-gray-300">
      <h1 className="text-5xl font-bold my-8 text-black text-center">Linked List Visualization</h1>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-2">
          <CodeWindow currentStep={currentStep} codeConfig={linkedListCode} script={stepConfigs} />
          <VisualWindow currentStep={currentStep} script={stepConfigs} />
          <MemoryWindow currentStep={currentStep} script={stepConfigs} />
        </div>
        <div className="flex justify-center mt-16">
          <ControlButtons 
            currentStep={currentStep}
            totalSteps={totalSteps}
            onReset={resetSteps}
            onPrevious={decrementStep}
            onNext={incrementStep}
            onRunAll={runAllSteps}
          />
        </div>
      </div>
    </main>
  );
}