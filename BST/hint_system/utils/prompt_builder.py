"The prompt that the LLM will have, kept in a seperate file so it's able to be edited"

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
    # create history_context of all previous hints as a string 
    return f"""
You are a teaching assistant for CSC148. The student is learning about {concept}.

Concept's code: {concept_code}
Current step: {code_context}
Highlighted node: {current_node}

Prior hints so far:
{history_context}

Generate the next 5 progressive hints following this format:
1. Prompt (reflective question)
2. Reasoning (guiding logic)
3. Explanation (conceptual summary)
4. Connection (link to previous step)
5. Next Step (suggest upcoming thinking)
"""