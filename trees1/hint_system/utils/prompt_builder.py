# Concept and code definitions so that they can be reused in the future 
concept =  "Tree - delete_item method"
concept_code = """
def delete_item(self, item: Any) -> bool:
    if self.is_empty():
        return False  # tree is empty
    elif self._subtrees == []:
        if self._root != item:
            return False
        else:
            self._root = None
            return True
    else:
        if self._root == item:
            self._delete_root()  # promote a child
            return True
        else:
            for subtree in self._subtrees:
                subtree.delete_item(item)
# Example call:
delete_item(70)
"""


def _memory_ids_from_context(code_context):
    """Extract memory IDs from code context variables for the prompt."""
    variables = code_context.get("variables") if isinstance(code_context, dict) else {}
    if not variables:
        return "None in this step."
    ids = [f"{k}={v}" for k, v in variables.items() if isinstance(v, str) and v.startswith("id")]
    return ", ".join(ids) if ids else "None in this step."


def llm_prompt(code_context, current_node, previousAvgHintUsage):
    """
    Function for creating the prompt that the LLM will use which changes dynamically 
    due to the changing context at each step of the tree deletion.
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
    memory_ids_list = _memory_ids_from_context(code_context)
    return f"""
You are a teaching assistant for CSC148. Your task is to generate **5 scaffolded hints** that guide the student through the next step of the concept:
**{concept}**. 

Follow the difficulty rule:
{difficulty_level}

VISUAL GROUNDING RULE (REQUIRED):
The student is viewing a three-panel visualization: left = Tree diagram, middle = Memory model (objects with IDs like id24, id25, id28), right = code.

You MUST reference at least one memory ID from "Memory IDs in this step" in at least 2 of your 5 hints. Use the exact IDs from the current program state (e.g. id24, id28). Do not invent IDs.

Examples of including memory IDs:
- "In the memory panel, look at the object at id24. What is its _root?"
- "The _subtrees list at id25 contains the children; which one are we considering for promotion?"

Current program state:
- Code context: {code_context}
- Current node being inspected in the visualization: {current_node}
- Memory IDs in this step (YOU MUST use some of these in your hints): {memory_ids_list}

METACOGNITIVE APPROACH: Help students think about their own thinking. Include questions that encourage:
- Self-monitoring: "Do you understand why...?"
- Strategic thinking: "What approach are you using?"
- Reflection: "How does this connect to what you know?"
- Planning: "What will you check next?"

Concept's code:
{concept_code}

Current program state:
- Code context: {code_context}
- Current node being inspected in the visualization: {current_node}

Only once, produce one list of 5 hints that follow this format, using exactly the numbering shown:
1. Prompt (a METACOGNITIVE question that is reflective and helps the student think about the concept)
2. Reasoning (the logic behind what to check or infer; MUST make use of one/more of the relevant memory IDs)
3. Explanation (conceptual summary; MUST make use of one/more of the relevant memory IDs)
4. Connection (link this reasoning to previous steps; MUST make use of one/more of the relevant memory IDs)
5. Next Step (suggest upcoming thinking)

IMPORTANT: Each line must start with the number (1., 2., 3., 4., 5.) followed by a space, then directly the hint content. Do NOT include words like "Prompt:", "Reasoning:", "Explanation:", "Connection:", or "Next Step:" in your response. The numbering alone indicates the hint type.
REMINDER: For this step, Memory IDs = {memory_ids_list}. At least 2 of the 5 hints must include one of these IDs by name.
"""