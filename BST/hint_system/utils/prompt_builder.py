# Variablizing these two inputs so that they can be reused in the future 
concept = "Binary Search tree - __contains__ method"
concept_code = """
def __contains__(self, item: Any) -> bool:
    if self.is_empty():
        return False
    elif item == self._root:
        return True
    elif item < self._root:
        return item in self._left
    else:
        return item in self._right
bst1.__contains__(30)
"""

def llm_prompt(code_context, current_node, previous_hints):
    """
    Function for creating the prompt that the LLM will use which changes dynamically 
    due to the changing context at each step of the BST search.
    """
    history_context = "\n".join(previous_hints) if previous_hints else "None yet." 
    return f"""
You are a teaching assistant for CSC148 helping a student understand the concept of: 
**{concept}**.

Concept's code:
{concept_code}

Current program state:
- Code context: {code_context}
- Highlighted node in visualization: {current_node}

Previous hints:
{history_context}

Now, generate the next **5 step-by-step hints** in this exact structured format:
1. Prompt (a reflective question)
2. Reasoning (the logic behind what to check or infer)
3. Explanation (conceptual summary)
4. Connection (link this reasoning to previous steps)
5. Next Step (suggest upcoming thinking)
"""