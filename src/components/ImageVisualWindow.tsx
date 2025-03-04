'use client';

import React from 'react';
import Image from 'next/image';

interface VisualWindowProps {
  currentStep: number;
  imagePaths: string[]; // Array of image paths for each step
}

const ImageVisualWindow: React.FC<VisualWindowProps> = ({ currentStep, imagePaths }) => {
  const currentImagePath = imagePaths[currentStep] || '/images/visual-default.png';

  return (
    <div className="visual-window relative border border-black h-[600px] overflow-hidden bg-white rounded-lg">
      <div className="absolute inset-0 flex flex-col">
        <h3 className="font-bold p-4 text-center text-black border-b-2 border-black">Visual Representation</h3>
        <div className="flex-1 relative">
          <Image 
            src={currentImagePath}
            alt={`Visual state at step ${currentStep}`}
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default ImageVisualWindow; 