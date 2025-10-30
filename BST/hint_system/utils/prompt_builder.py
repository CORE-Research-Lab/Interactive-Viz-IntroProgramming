

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
    Function for creating the  prompt that the LLM will have which changes dynamically 
    due to the changing context at each step.
    """
    history_context = "\n".join(previous_hints) if previous_hints else "None so far." 
    return f"""
You are a teaching assistant for CSC148. 
The student is learning about {concept}.

Concept's code:
{concept_code}

Current code execution context:
{code_context}

Highlighted node in visualization:
{current_node}

Prior hints so far:
{history_context}

Generate the next 5 progressive hints following this format:
1. Prompt (reflective question)
2. Reasoning (guiding logic)
3. Explanation (conceptual summary)
4. Connection (link to previous step)
5. Next Step (suggest upcoming thinking)
"""