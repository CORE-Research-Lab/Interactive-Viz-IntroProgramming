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

async function generateHint(){
    //getting current step from window object
    const currentStep = window.currentStep ?? 0;
    // Initialize hint history foro this step --- check parameters
    if (!hintHistory[currentStep])
        hintHistory[currentStep] = {
            hints: [],
            hintsShown: 0
        };
    const stepData = hintSystem.history[currentStep];
    const code_context = window.currentCodeContext;
    const current_node = window.currentNode;
    const previous_hints = stepData.hints;
    try{
        // Sending request to the backend 
        const response = await fetch("http://localhost:5000/generate_hint", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({code_context, current_node, previous_hints})
        });
        // Parse the response FROM the backend
        const data = await response.json();
        const hints_dict = data.hint_output.hints; // dict of 5 hints

        stepData.hints.push(hints_dict);
        stepData.hintsShown++;

        createHintModal();

        //Display current hint
        document.querySelector('.hint-content').textContent = hints_dict; //edit?
        document.getElementById('hint-modal').style.display = 'block';

        // Update hint button text
        updateHintButtonText();
    } catch (error) {
        console.error("Error generating hint:", error);
    }
}
/**
 * 
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
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeHintModal();
        }
    });
}

/**
 * 
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
 * 
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

