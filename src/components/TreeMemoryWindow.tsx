'use client';

import React from 'react';

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
  script: MemoryStep[];
}

const MemoryBox = ({ 
  id, 
  title, 
  attributes, 
  scope = false, 
  isHighlighted = false 
}: {
  id?: string;
  title: string;
  attributes: { name: string; value: string | number }[];
  scope?: boolean;
  isHighlighted?: boolean;
}) => {
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
                <div className="flex items-center gap-2">
                  <span className="attribute-name font-bold">{attribute.name}:</span>
                  {attribute.name === '_subtrees' && (
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  )}
                  <span className="attribute-value font-medium">{attribute.value}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MemoryWindow: React.FC<MemoryWindowProps> = ({ currentStep, script }) => {
  const currentMemory = script[currentStep];

  return (
    <div className="memory-window relative border border-black border h-[600px] overflow-hidden bg-white rounded-lg">
      <div className="absolute inset-0 flex">
        <div className="w-[200px] overflow-y-auto p-4">
          <h3 className="font-bold mb-4 text-center text-black border-b-2 border-black font-bold">Call Stack</h3>
          <div className="flex flex-col-reverse gap-4">
            {currentMemory.callStack.map((frame, index) => (
                <MemoryBox
                key={index}
                title={frame.functionName}
                scope={true}
                attributes={Object.entries(frame.variables).map(([name, value]) => ({
                    name,
                    value
                }))}
                />
            ))}
          </div>
        </div>
        <div className="w-[2px] bg-gray-300 h-full self-stretch border border-black h-5/6 my-auto" />
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="font-bold mb-4 text-center text-black border-b-2 border-black font-bold">Memory Objects</h3>
          <div className="grid grid-cols-2 gap-4 auto-rows-max">
            {Object.entries(currentMemory.heap).map(([id, obj]) => (
                <MemoryBox
                key={id}
                id={id}
                title={obj.type}
                attributes={[
                    { name: '_root', value: obj.root },
                    { name: '_subtrees', value: obj.subtrees.join(', ') }
                ]}
                />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryWindow;