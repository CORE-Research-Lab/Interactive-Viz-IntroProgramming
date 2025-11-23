# Concept and code definitions so that they can be reused in the future 
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

def llm_prompt(code_context, current_node, previousAvgHintUsage):
    """
    Function for creating the prompt that the LLM will use which changes dynamically 
    due to the changing context at each step of the BST search.
    """
    # Determining the level of difficulty for hint generation
    difficulty_level = 'No difficulty data available yet.'
    if previousAvgHintUsage is not None:
        if previousAvgHintUsage >= 3:
            difficulty_level = f"The student previously required many hints on average: {previousAvgHintUsage}. Provide simpler, more scaffolded hints."
        elif previousAvgHintUsage >= 2:
            difficulty_level = f"The student previously required a moderate number of hints: {previousAvgHintUsage}. Provide normal-level hints."
        else:
            difficulty_level = f"The student previously required none/ very few hints on average: {previousAvgHintUsage}. Provide more challenging hints."
    print(f'difficulty level: {difficulty_level}')    
    return f"""
You are a teaching assistant for CSC148. Your task is to generate **5 scaffolded hints** that guide the student through the next step of the concept:
**{concept}**. 

METACOGNITIVE APPROACH: Help students think about their own thinking. Include questions that encourage:
- Self-monitoring: "Do you understand why...?"
- Strategic thinking: "What approach are you using?"
- Reflection: "How does this connect to what you know?"
- Planning: "What will you check next?"

Follow the difficulty rule:
{difficulty_level}

Concept's code:
{concept_code}

Current program state:
- Code context: {code_context}
- Current node being inspected in the visualization: {current_node}

Only once, produce one list of 5 hints that follow this format, using exactly the numbering shown:
1. Prompt (a METACOGNITIVE question that is reflective and helps the student think about the concept)
2. Reasoning (the logic behind what to check or infer)
3. Explanation (conceptual summary)
4. Connection (link this reasoning to previous steps)
5. Next Step (suggest upcoming thinking)

IMPORTANT: Each line must start with the number (1., 2., 3., 4., 5.) followed by a space, then directly the hint content. Do NOT include words like "Prompt:", "Reasoning:", "Explanation:", "Connection:", or "Next Step:" in your response. The numbering alone indicates the hint type.
"""