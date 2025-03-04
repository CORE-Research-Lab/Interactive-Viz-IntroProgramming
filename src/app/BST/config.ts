import { StepConfig, CodeConfig } from '@/types/stepConfig';

export const linkedListCode: CodeConfig = [
  { number: 1, content: 'def delete_item(self, item: Any) -> bool:' },
  { number: 2, content: '    if self.is_empty():' },
  { number: 3, content: '        return False  # tree is empty' },
  { number: 4, content: '    elif self._subtrees == []:' },
  { number: 5, content: '        if self._root != item:' },
  { number: 6, content: '            return False' },
  { number: 7, content: '        else:' },
  { number: 8, content: '            self._root = None' },
  { number: 9, content: '            return True' },
  { number: 10, content: '    else:' },
  { number: 11, content: '        if self._root == item:\n\t' },
  { number: 12, content: '            self._delete_root()  # promote a child' },
  { number: 13, content: '            return True' },
  { number: 14, content: '        else:' },
  { number: 15, content: '        for subtree in self._subtrees:\n\n\t' },
  { number: 16, content: '            subtree.delete_item(item)\n\t' },
  { number: 17, content: '# Example call:' },
  { number: 18, content: 'delete_item(70)\n\t' },
];

export const stepConfigs: { [key: number]: StepConfig } = {
  0: {
    description: "Step 0: Initial.",
    memoryImagePath: '/bst-comp/memory/Step0.png',
    visualImagePath: '/bst-comp/visual/Step0.png'
  },
  1: {
    description: "\nStep 1: delete_item(70)called on the root – it is not 70.",
    highlightLine: 18,
    memoryImagePath: '/bst-comp/memory/Step1.png',
    visualImagePath: '/bst-comp/visual/Step1.png'
  },
  2: {
    description: "\nStep 2: delete_item(70) called on subtree[0] but 30 is not 70.",
    highlightLine: 11,
    memoryImagePath: '/bst-comp/memory/Step2.png',
    visualImagePath: '/bst-comp/visual/Step2.png'
  },
  3: {
    description: "Step 3: delete_item(70)\ncalled on subtree[1] and\nthis node should be deleted.",
    highlightLine: 15,
    memoryImagePath: '/bst-comp/memory/Step3.png',
    visualImagePath: '/bst-comp/visual/Step3.png'
  },
  4: {
    description: "\nStep 4: Need to promote the last child (80) – pop() it.",
    highlightLine: 15,
    memoryImagePath: '/bst-comp/memory/Step4.png',
    visualImagePath: '/bst-comp/visual/Step4.png'
  },
  5: {
    description: "\nStep 5: Replace current tree's node with child's root.",
    highlightLine: 16,
    memoryImagePath: '/bst-comp/memory/Step5.png',
    visualImagePath: '/bst-comp/visual/Step5.png'
  },
  6: {
    description: "Step 6: New tree.",
    highlightLine: 16,
    memoryImagePath: '/bst-comp/memory/Step6.png',
    visualImagePath: '/bst-comp/visual/Step6.png'
  }
};