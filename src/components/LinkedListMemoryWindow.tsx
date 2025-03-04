'use client';

import { useEffect, useState } from 'react';
import { StepConfig } from '@/types/stepConfig';

interface MemoryData {
  main: Record<string, string>;
  classes: Record<string, any>;
  objects: Record<string, any>;
}

interface CallStackFrame {
  id: string;
  title: string;
  attributes: { name: string; value: string }[];
}

interface MemoryWindowProps {
  currentStep: number;
  script: { [key: number]: StepConfig };
}

interface ObjectBoxProps {
  id: string;
  title: string;
  attributes: { name: string; value: string }[];
  scope?: boolean;
  highlight?: boolean;
  x?: number;
  y?: number;
}

export default function MemoryWindow({ currentStep = 0, script }: MemoryWindowProps) {
  const [memoryData, setMemoryData] = useState<MemoryData>({
    main: {},
    classes: {},
    objects: {}
  });

  const [callStack, setCallStack] = useState<CallStackFrame[]>([]);

  useEffect(() => {
    if (currentStep === 0) {
      setMemoryData({
        main: {},
        classes: {},
        objects: {}
      });
      setCallStack([]);
      return;
    }
    const currentConfig = script[currentStep];
    if (currentConfig?.memoryData) {
      setMemoryData(currentConfig.memoryData as MemoryData);
      setCallStack(currentConfig.callStack || []);
    }
  }, [currentStep, script]);

  const ObjectBox = ({ id, title, attributes, scope = false }: Omit<ObjectBoxProps, 'x' | 'y'>) => {
    const currentIds = Object.keys(script[currentStep]?.memoryData?.objects ?? {});
    const previousIds = Object.keys(script[currentStep - 1]?.memoryData?.objects ?? {});
    
    const isLatestCallStackFrame = scope && (
      (currentStep === 1 && title === "__main__") ||
      (callStack.length > 0 && id === callStack[callStack.length - 1].id)
    );
    
    const isNewObject = !scope && currentIds.includes(id) && !previousIds.includes(id);
    
    const isHighlighted = isLatestCallStackFrame || isNewObject;

    return (
      <div className="relative">
        <div 
          className={`absolute inset-0 ${isHighlighted ? 'animate-pulse' : ''}`}
          style={{ 
            border: '2px solid #000',
            padding: '10px',
            background: isHighlighted ? '#f5ba1a' : 'white',
            boxShadow: isHighlighted ? '0 0 8px rgb(245, 186, 26)' : '2px 2px 4px rgba(0, 0, 0, 0.1)',
            minWidth: '120px',
            maxWidth: '200px',
            borderRadius: '4px'
          }}
        />
        <div 
          className={`${scope ? 'scope-box' : 'object-box'} relative`}
          style={{ 
            border: '2px solid transparent',
            padding: '10px',
            minWidth: '120px',
            maxWidth: '200px',
            height: 'fit-content'
          }}
        >
          {!scope && (
            <>
              <h4 className="absolute top-0 right-0 text-sm text-black bg-white border-2 border-black p-1 font-bold">
                {title}
              </h4>
              <div className="absolute top-0 left-0 text-[#ff8519] text-xs p-1 bg-white border-2 border-black font-bold">
                {id}
              </div>
            </>
          )}
          {scope && (
            <h4 className="font-bold text-black">{title}</h4>
          )}
          <div className="h-3"></div>
          <div className={`object-content ${!scope ? 'mt-5' : ''}`}>
            {attributes.map((attribute, index) => (
              <div 
                key={index} 
                className="attribute-box border-2 border-black m-1 p-1 text-black"
              >
                {attribute.name.trim() === "" ? (
                  <span className="single-attribute text-center block font-medium">
                    {attribute.value}
                  </span>
                ) : (
                  <>
                    <span className="attribute-name font-bold mr-1">{attribute.name}:</span>
                    <span className="attribute-value font-medium">{attribute.value}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="memory-window relative border border-black border h-[600px] overflow-hidden bg-white rounded-lg">
      <div className="absolute inset-0 flex">
        <div className="w-[200px] overflow-y-auto p-4">
          <h3 className="font-bold mb-4 text-center text-black border-b-2 border-black font-bold">Call Stack</h3>
          <div className="flex flex-col-reverse gap-4">
            {currentStep >= 1 && (
              <ObjectBox
                id="id3"
                title="__main__"
                attributes={[{ name: "ll1", value: "id60" }]}
                scope={true}
              />
            )}
            {callStack.map((frame, index) => (
              <ObjectBox
                key={`${frame.id}-${index}`}
                id={frame.id}
                title={frame.title}
                attributes={frame.attributes}
                scope={true}
              />
            ))}
          </div>
        </div>
        <div className="w-[2px] bg-gray-300 h-full self-stretch border border-black h-5/6 my-auto" />
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="font-bold mb-4 text-center text-black border-b-2 border-black font-bold">Memory Objects</h3>
          <div className="grid grid-cols-2 gap-4 auto-rows-max">
            {Object.entries(memoryData.objects).map(([id, obj]: [string, any]) => (
              obj && <ObjectBox
                key={id}
                id={id}
                title={obj.class}
                attributes={Object.entries(obj?.variables ?? {}).map(([name, value]) => ({
                  name,
                  value: String(value)
                }))}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
