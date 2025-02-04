'use client';

import { useState, useEffect } from 'react';
import { StepConfig, CodeConfig } from '@/types/stepConfig';


interface CodeWindowProps {
  currentStep: number;
  codeConfig: CodeConfig;
  script: { [key: number]: StepConfig };
}

export default function CodeWindow({ currentStep, codeConfig, script }: CodeWindowProps) {
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);

  useEffect(() => {
    setHighlightedLine(script[currentStep]?.highlightLine ?? null);
  }, [currentStep, script]);

  return (
    <div className="code-window bg-[#1e1e1e] text-white p-4 rounded-lg overflow-auto">
      <pre className="font-mono text-sm">
        {codeConfig.map((line) => (
          <div
            key={line.number}
            id={`line${line.number}`}
            className={`code-line relative ${
              highlightedLine === line.number ? 'bg-[#3e3e3e]' : ''
            } hover:bg-[#2e2e2e]`}
          >
            {highlightedLine === line.number && (
              <>
                <div className="absolute left-[-1rem] top-1/2 -translate-y-1/2 text-yellow-400">
                  ▶
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 px-4 text-sm text-yellow-400">
                  {script[currentStep]?.description || ""}
                </div>
              </>
            )}
            <span className="line-number text-gray-500 mr-4">
              {line.number.toString().padStart(2, ' ')}
            </span>
            <span className="line-content">{line.content}</span>
          </div>
        ))}
      </pre>
    </div>
  );
} 