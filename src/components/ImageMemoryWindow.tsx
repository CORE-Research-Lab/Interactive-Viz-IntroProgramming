'use client';

import React from 'react';
import Image from 'next/image';

interface MemoryObject {
  id: string;
  type: 'Tree';
  root: number;
  subtrees: string[];
}

interface MemoryStep {
  callStack: {
    functionName: string;
    variables: { [key: string]: string };
  }[];
  heap: {
    [key: string]: MemoryObject;
  };
}

interface MemoryWindowProps {
  currentStep: number;
  imagePaths: string[]; // Array of image paths for each step
}

const ImageMemoryWindow: React.FC<MemoryWindowProps> = ({ currentStep, imagePaths }) => {
  const currentImagePath = imagePaths[currentStep] || '/images/memory-default.png';

  return (
    <div className="memory-window relative border border-black h-[600px] overflow-hidden bg-white rounded-lg">
      <div className="absolute inset-0 flex flex-col">
        <h3 className="font-bold p-4 text-center text-black border-b-2 border-black">Memory Visualization</h3>
        <div className="flex-1 relative">
          <Image 
            src={currentImagePath}
            alt={`Memory state at step ${currentStep}`}
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default ImageMemoryWindow; 