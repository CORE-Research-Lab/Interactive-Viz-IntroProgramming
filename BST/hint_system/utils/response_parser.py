"""
Provides the output of the hints in a dictionary format
"""

def parse_hints(raw_text):
    hints = {}
    for line in raw_text.strip().split("\n"):
        line = line.strip()
        print(f"here is the line: {line}")
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