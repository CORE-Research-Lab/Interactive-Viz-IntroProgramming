/**
 * Handles hint generation, display, and state management
 */
const hintSystem = {
    history: {},
    previousStep: -1,
    maxHints: 5
}
let hintHistory = hintSystem.history;
let previousStep = hintSystem.previousStep;
const level_order = ['prompt', 'reasoning', 'explanation', 'connection', 'next_step'];
const level_labels = {
    'prompt': 'Prompt',
    'reasoning': 'Reasoning',
    'explanation': 'Explanation',
    'connection': 'Connection',
    'next_step': 'Next Step'
};

function revealHintLevel(stepData){
    const currentHint = stepData.lastHint;
    const index = stepData.lastHintLevel;
    const level_key = level_order[index];
    if (!currentHint || !level_key){
        return false;
    }
    const hintText = currentHint[level_key];
    const currentStep = window.currentStep ?? 0;

    document.querySelector(".hint-content").innerHTML = `
        <h3>${level_labels[level_key]}</h3>
        <p>${hintText}</p>
        <div class="hint-feedback" style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd; text-align: center;">
            <p style="margin-bottom: 10px; color: #666; font-size: 14px;">Was this hint helpful?</p>
            <button onclick="submitHintFeedback(${currentStep}, ${index}, 'up')" 
                    id="thumbs-up-${currentStep}-${index}"
                    class="feedback-btn" 
                    style="background: none; border: 2px solid #4CAF50; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; margin-right: 10px; transition: all 0.2s;">
                👍
            </button>
            <button onclick="submitHintFeedback(${currentStep}, ${index}, 'down')" 
                    id="thumbs-down-${currentStep}-${index}"
                    class="feedback-btn" 
                    style="background: none; border: 2px solid #f44336; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; transition: all 0.2s;">
                👎
            </button>
        </div>
    `;
    document.getElementById("hint-modal").style.display = "block";

    stepData.lastHintLevel ++;
    stepData.hintsShown ++;
    updateHintButtonText();
    return true;
}

function getCodeContext(){
    const step = window.currentStep ?? 0;
    const contexts = {
        0: {
            current_line: "bst1.__contains__(30)",
            line_number: 11,
            step_number: 0,
            variables: { item: 30 },
            visualization_state: "Initial BST setup"
        },
        1: {
            current_line: "if self.is_empty():",
            line_number: 3,
            step_number: 1,
            variables: { item: 30, root: 40 },
            visualization_state: "Checking if tree is empty, then comparing root (40) with item (30)"
        },
        2: {
            current_line: "elif item < self._root:",
            line_number: 7,
            step_number: 2,
            variables: { item: 30, root: 40, comparison: "30 < 40" },
            visualization_state: "Navigating to left subtree (rooted at 20)"
        },
        3: {
            current_line: "elif item > self._root:",
            line_number: 9,
            step_number: 3,
            variables: { item: 30, root: 20, comparison: "30 > 20" },
            visualization_state: "In left subtree, comparing with node 20, moving to right subtree"
        },
        4: {
            current_line: "return item in self._right",
            line_number: 10,
            step_number: 4,
            variables: { item: 30, root: 30, found: true },
            visualization_state: "Found item 30 in right subtree of node 20"
        }
    };
    return contexts[step] || contexts[0];
}

function getCurrentNode(){
    const step = window.currentStep ?? 0;
    const nodes = {
        0: { value: null, position: "initial"},
        1: { value: 40, position: "root"},
        2: { value: 40, position: "root"},
        3: { value: 20, position: "left_subtree"},
        4: { value: 30, position: "right_subtree"}
    };
    return nodes[step] || nodes[0];
}


async function generateHint(){
    //getting current step from window object
    const currentStep = window.currentStep ?? 0;
    // Initialize hint history for this step --- check parameters
    if (!hintHistory[currentStep])
        hintHistory[currentStep] = {
            hints: [],
            hintsShown: 0,
            lastHint: null,
            lastHintLevel: 0,
            feedback: {}
        };
    const stepData = hintHistory[currentStep];
    const code_context = getCodeContext();
    const current_node = getCurrentNode();
    const previous_hints = stepData.hints;

    if (
        stepData.lastHint && stepData.lastHintLevel < level_order.length && revealHintLevel(stepData)){
            return; // don't fetch yet - use exisiting hint, no API call needed
        }
    try{
        // Sending request to the backend 
        const response = await fetch("http://localhost:5000/generate_hint", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({code_context, current_node, previous_hints})
        });
        // check if the response was ok
        if (!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the response FROM the backend
        const data = await response.json();
        const hints_dict = data.hint_output.hints; // dict of 5 hints (new)
        // store as formatted string
        const hintString = `Prompt: ${hints_dict.prompt || ''}\nReasoning: ${hints_dict.reasoning || ''}\nExplanation: ${hints_dict.explanation || ''}`;

        stepData.hints.push(hintString);
        createHintModal();
        stepData.lastHint = hints_dict;
        stepData.lastHintLevel = 0;
        revealHintLevel(stepData); // display the first hint


    } catch (error) {
        console.error("Error generating hint:", error);
    }
}
/**
 * Create modal popup 
 */
function createHintModal(){
    // Check if modal already exists
    if (document.getElementById('hint-modal')) {
        return;
    }
    // Create modal element
    const modal = document.createElement('div');
    modal.id = 'hint-modal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
    `;
    
    modal.innerHTML = `
        <div style="background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 80%; max-width: 600px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <span onclick="closeHintModal()" style="color: #aaa; float: right; font-size: 28px; font-weight: bold; cursor: pointer; line-height: 20px;">&times;</span>
            <div class="hint-content"></div>
            <div style="margin-top: 20px; text-align: right;">
                <button onclick="closeHintModal()" style="padding: 8px 16px; background-color: #bdd5d7; border: none; border-radius: 4px; cursor: pointer;">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    // Close modal when clicking outside
    // modal.addEventListener('click', function(e) {
    //     if (e.target === modal) {
    //         closeHintModal();
    //     }
    // });
}

/**
 * Close modal popup
 */
function closeHintModal(hint){
    /* Closes the modal popup */
    const modal = document.getElementById('hint-modal');
    if (modal){
        modal.style.display = 'none';
    }
}

/**
 * Update the text and state of the hint button
 */
function updateHintButtonText(){
    /* Updates the text of the hint button */
    const hintButton = document.getElementById('hint-button')
    if (!hintButton){
        return;
    }
    const currentStep = window.currentStep;
    const stepData = hintSystem.history[currentStep];
    if (!stepData){
        return;
    }
    const hintsShown = stepData ? stepData.hintsShown : 0;
    const remaining = hintSystem.maxHints - hintsShown;

    // Updating the button text and state based on remaining
    if (hintsShown ===0){
        hintButton.textContent = 'Hint';
        hintButton.disabled = false;
    } else if (hintsShown < hintSystem.maxHints){
        hintButton.textContent = `Next Hint (${remaining} left)`;
        hintButton.disabled = false;
    } else {
        hintButton.textContent = 'No more hints';
        hintButton.disabled = true;
    }
}

