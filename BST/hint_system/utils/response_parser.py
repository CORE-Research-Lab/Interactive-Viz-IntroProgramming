"""
Provides the output of the hints in a dictionary format
"""

def parse_hints(raw_text):
    """
    Provides the output of the hints in a dictionary format.
    """
    hints = {}
    if not raw_text or not raw_text.strip():
        return {"hints":{}, "error": "No hints provided"}

    for line in raw_text.strip().split("\n"):
        line = line.strip()
        if line.startswith("1. "): 
            hints["prompt"] = line[3:].strip()
        elif line.startswith("2. "): 
            hints["reasoning"] = line[3:].strip()
        elif line.startswith("3. "): 
            hints["explanation"] = line[3:].strip()
        elif line.startswith("4. "): 
            hints["connection"] = line[3:].strip()
        elif line.startswith("5. "): 
            hints["next_step"] = line[3:].strip()
    return {"hints":hints}