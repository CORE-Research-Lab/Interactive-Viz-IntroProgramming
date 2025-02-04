import { StepConfig, CodeConfig } from '@/types/stepConfig';

export const linkedListCode: CodeConfig = [
  { number: 1, content: 'class Node:' },
  { number: 2, content: '    def __init__(self, data):' },
  { number: 3, content: '        self.data = data' },
  { number: 4, content: '        self.next = None' },
  { number: 5, content: '' },
  { number: 6, content: 'class LinkedList:' },
  { number: 7, content: '    def __init__(self):' },
  { number: 8, content: '        self._first = None' },
  { number: 9, content: '' },
  { number: 10, content: '    def append(self, data):' },
  { number: 11, content: '        new_node = Node(data)' },
  { number: 12, content: '        if self._first is None:' },
  { number: 13, content: '            self._first = new_node' },
  { number: 14, content: '        else:' },
  { number: 15, content: '            current = self._first' },
  { number: 16, content: '            while current.next is not None:' },
  { number: 17, content: '                current = current.next' },
  { number: 18, content: '            current.next = new_node' },
  { number: 19, content: '' },
  { number: 20, content: 'll1 = LinkedList()' },
  { number: 21, content: 'll1.append(10)' },
  { number: 22, content: 'll1.append(20)' }
];

export const stepConfigs: { [key: number]: StepConfig } = {
  0: {
    description: "Initial state: Empty LinkedList",
    visualNodes: []
  },
  1: {
    description: "Step 1: Create a LinkedList instance.",
    highlightLine: 20,
    memoryData: {
      main: { 'll1': 'id60' },
      classes: {},
      objects: {}
    },
    callStack: [],
    visualNodes: []
  },
  2: {
    description: "Step 2: Execute LinkedList.__init__ constructor.",
    highlightLine: 7,
    memoryData: {
      main: { 'll1': 'id60' },
      classes: {},
      objects: {
        'id60': {
          class: 'LinkedList',
          variables: { '_first': 'id63' }
        },
        'id63': {
          class: 'NoneType',
          variables: { '': 'None' }
        }
      }
    },
    callStack: [{
      id: "id2",
      title: "LinkedList.__init__",
      attributes: [{ name: "self", value: "id60" }]
    }],
    visualNodes: []
  },
  3: {
    description: "Step 3: Append a node with data=10 to the LinkedList.",
    highlightLine: 21,
    memoryData: {
      main: { 'll1': 'id60' },
      classes: {},
      objects: {
        'id60': {
          class: 'LinkedList',
          variables: { '_first': 'id63' }
        },
        'id63': {
          class: 'NoneType',
          variables: { '': 'None' }
        }
      }
    },
    callStack: [
      {
        id: "id2",
        title: "LinkedList.__init__",
        attributes: [{ name: "self", value: "id60" }]
      },
      {
        id: "id64",
        title: "ll1.append",
        attributes: [
          { name: "self", value: "id60" },
          { name: "data", value: "10" }
        ]
      }
    ],
    visualNodes: []
  },
  4: {
    description: "Step 4: Execute Node.__init__ constructor.",
    highlightLine: 2,
    memoryData: {
      main: { 'll1': 'id60' },
      classes: {},
      objects: {
        'id60': {
          class: 'LinkedList',
          variables: { '_first': 'id63' }
        },
        'id63': {
          class: 'NoneType',
          variables: { '': 'None' }
        },
        'id65': {
          class: 'Node',
          variables: {
            'data': 'id66',
            'next': 'id63'
          }
        },
        'id66': {
          class: 'int',
          variables: { '': '10' }
        }
      }
    },
    callStack: [
      {
        id: "id2",
        title: "LinkedList.__init__",
        attributes: [{ name: "self", value: "id60" }]
      },
      {
        id: "id64",
        title: "ll1.append",
        attributes: [
          { name: "self", value: "id60" },
          { name: "data", value: "10" }
        ]
      },
      {
        id: "id65",
        title: "Node.__init__",
        attributes: [
          { name: "self", value: "id65" },
          { name: "data", value: "10" }
        ]
      }
    ],
    visualNodes: [{ data: 10, hasNext: true }]
  },
  5: {
    description: "Step 5: Append a node with data=20 to the LinkedList.",
    highlightLine: 22,
    memoryData: {
      main: { 'll1': 'id60' },
      classes: {},
      objects: {
        'id60': {
          class: 'LinkedList',
          variables: { '_first': 'id63' }
        },
        'id63': {
          class: 'NoneType',
          variables: { '': 'None' }
        },
        'id65': {
          class: 'Node',
          variables: {
            'data': 'id66',
            'next': 'id63'
          }
        },
        'id66': {
          class: 'int',
          variables: { '': '10' }
        }
      }
    },
    callStack: [
      {
        id: "id2",
        title: "LinkedList.__init__",
        attributes: [{ name: "self", value: "id60" }]
      },
      {
        id: "id67",
        title: "ll1.append",
        attributes: [
          { name: "self", value: "id60" },
          { name: "data", value: "20" }
        ]
      }
    ],
    visualNodes: [{ data: 10, hasNext: true }]
  },
  6: {
    description: "Step 6: Execute Node.__init__ constructor.",
    highlightLine: 2,
    memoryData: {
      main: { 'll1': 'id60' },
      classes: {},
      objects: {
        'id60': {
          class: 'LinkedList',
          variables: { '_first': 'id63' }
        },
        'id63': {
          class: 'NoneType',
          variables: { '': 'None' }
        },
        'id65': {
          class: 'Node',
          variables: {
            'data': 'id66',
            'next': 'id63'
          }
        },
        'id66': {
          class: 'int',
          variables: { '': '10' }
        },
        'id68': {
          class: 'Node',
          variables: {
            'data': 'id69',
            'next': 'id63'
          }
        },
        'id69': {
          class: 'int',
          variables: { '': '20' }
        }
      }
    },
    callStack: [
      {
        id: "id2",
        title: "LinkedList.__init__",
        attributes: [{ name: "self", value: "id60" }]
      },
      {
        id: "id67",
        title: "ll1.append",
        attributes: [
          { name: "self", value: "id60" },
          { name: "data", value: "20" }
        ]
      },
      {
        id: "id68",
        title: "Node.__init__",
        attributes: [
          { name: "self", value: "id68" },
          { name: "data", value: "20" }
        ]
      }
    ],
    visualNodes: [
      { data: 10, hasNext: true },
      { data: 20, hasNext: true }
    ]
  }
}; 