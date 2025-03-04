'use client';

import { useState } from 'react';
import CodeWindow from '@/components/CodeWindow';
import MemoryWindow from '@/components/TreeMemoryWindow';
import VisualWindow from '@/components/LinkedListVisualWindow';
import ImageMemoryWindow from '@/components/ImageMemoryWindow';
import ImageVisualWindow from '@/components/ImageVisualWindow';
import ControlButtons from '@/components/ControlButtons';
import { stepConfigs, linkedListCode } from './config';


// Check if image paths are provided in the step configs
const hasImagePaths = Object.values(stepConfigs).some(
  step => step.memoryImagePath && step.visualImagePath
);

// Extract image paths from step configs
const memoryImagePaths = hasImagePaths 
  ? Object.values(stepConfigs).map(step => step.memoryImagePath || '')
  : [];

const visualImagePaths = hasImagePaths
  ? Object.values(stepConfigs).map(step => step.visualImagePath || '')
  : [];

export default function LinkedListPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 6;
  
  // Always use image components if image paths are provided
  const useImageComponents = hasImagePaths;

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
      <h1 className="text-5xl font-bold my-8 text-black text-center">Interactive Tree Deletion Visualization with Brushing &amp; Lines</h1>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-2">
          <CodeWindow currentStep={currentStep} codeConfig={linkedListCode} script={stepConfigs} />
          
          {useImageComponents ? (
            <>
              <ImageVisualWindow 
                currentStep={currentStep} 
                imagePaths={visualImagePaths} 
              />
              <ImageMemoryWindow 
                currentStep={currentStep} 
                imagePaths={memoryImagePaths} 
              />
            </>
          ) : null}
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