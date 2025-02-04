'use client';

import { useState, useEffect } from 'react';
import { StepConfig } from '@/types/stepConfig';

interface Node {
  data: number;
  hasNext: boolean;
}

interface VisualWindowProps {
  currentStep: number;
  script: { [key: number]: StepConfig };
}

export default function VisualWindow({ currentStep, script }: VisualWindowProps) {
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    let stepToUse = currentStep;
    while (stepToUse >= 0 && !script[stepToUse]) {
      stepToUse--;
    }
    
    const currentNodes = stepToUse >= 0 ? script[stepToUse]?.visualNodes ?? [] : [];
    setNodes(currentNodes);
  }, [currentStep, script]);

  return (
    <div className="visual-window p-4 border rounded-lg bg-white border-black">
      <div className="flex flex-col gap-4">
        <div className="visualization-section">
          <h2 className="text-lg font-semibold mb-4 text-black">Linked List Visualization</h2>
          <div className="linked-list-container flex flex-col items-center">
            <div className="mb-4 head-node bg-blue-100 px-4 py-2 rounded-lg border border-blue-300 text-black">
              L1
            </div>
            {nodes.map((node, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative">
                  <div className={`absolute inset-0 border-2 rounded-lg ${
                    (currentStep === 4 && index === 0) || (currentStep === 6 && index === 1)
                      ? 'border-orange-500 animate-pulse'
                      : 'border-black'
                  }`}></div>
                  <div className="node bg-white border-2 border-transparent rounded-lg flex items-center gap-2 flex flex-col">
                    <div className="relative">
                      <div className={`absolute inset-x-0 bottom-0 border-b-2 ${
                        (currentStep === 4 && index === 0) || (currentStep === 6 && index === 1)
                          ? 'border-orange-500 animate-pulse'
                          : 'border-black'
                      }`}></div>
                      <div className="value-box px-3 py-1 text-black">
                        {node.data}
                      </div>
                    </div>
                    <div className="value-box px-3 py-2">
                    </div>
                  </div>
                </div>
                {node.hasNext && (
                  <div className="pointer h-8 flex justify-center">
                    <svg height="32" width="20">
                      <line
                        x1="10"
                        y1="0"
                        x2="10"
                        y2="28"
                        stroke="orange"
                        strokeWidth="2"
                      />
                      <polygon
                        points="5,24 10,32 15,24"
                        fill="orange"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
            {nodes.length > 0 && (
              <div className="none-pointer bg-gray-100 px-4 py-2 rounded-lg border-2 border-black text-black">
                None
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 