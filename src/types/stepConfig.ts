export interface MemoryObject {
  class: string;
  variables: { [key: string]: string };
}

export interface MemoryData {
  main: { [key: string]: string };
  classes: { [key: string]: any };
  objects: { [key: string]: MemoryObject };
}

export interface CallStackFrame {
  id: string;
  title: string;
  attributes: Array<{ name: string; value: string }>;
}

export interface VisualNode {
  data: number;
  hasNext: boolean;
}

export interface StepConfig {
  description: string;
  highlightLine?: number;
  memoryData?: any;
  callStack?: any[];
  visualNodes?: any[];
  memoryImagePath?: string;
  visualImagePath?: string;
}

export interface StepConfigs {
  [key: number]: StepConfig;
} 

export type CodeConfig = { 
  number: number; 
  content: string; 
}[];