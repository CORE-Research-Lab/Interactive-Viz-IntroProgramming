//Handles hint generation, display, and state management
const hintSystem = {
    history: {},
    maxHints: 5
}
/* Example
hintSystem.history[0] = {
    hintsShown: 0,
    hintSet: null,
    currHintLevel: 0,
    feedback: {},
    viewedHints: [],
    currentHintIndex: -1
}

*/

// Hint levels in order
const hint_levels = ['prompt', 'reasoning', 'explanation', 'connection', 'next_step'];
// Labels for each of the hint levels
const hint_labels = {
    'prompt': 'Prompt',
    'reasoning': 'Reasoning',
    'explanation': 'Explanation',
    'connection': 'Connection',
    'next_step': 'Next Step'
};
// Backend URL configuration - automatically detects environment
const BACKEND_URL = (() => {
    // If running on localhost, use local backend
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:5000';
    }
    // Otherwise, use your Render backend URL
    return 'https://interactive-viz-introprogramming.onrender.com';
})();
function getCodeContext(){
    // Get the code context for the current step
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
    /*
    Function that generates a hint for the current step.
    */
    const currentStep = window.currentStep ?? 0;
    // Initialize hint history for this step --- check parameters
    if (!hintSystem.history[currentStep])
        hintSystem.history[currentStep] = {
            hintsShown: 0,
            hintSet: null,
            currHintLevel: 0,
            feedback: {},
            viewedHints:[],
            currentHintIndex: -1
        };
    const stepData = hintSystem.history[currentStep];
    logInteraction('hint_requested',{step: currentStep, hintsAlreadyShown: stepData.hintsShown});
    const code_context = getCodeContext();
    const current_node = getCurrentNode();


    let previousAvgHintUsage=0;
    let counter = 0;
    // Get previous steps' average hint usage
    for (let i = currentStep -1; i>=0; i--){
        if (hintSystem.history[i]){
            counter +=1;
            previousAvgHintUsage += hintSystem.history[i].hintsShown;
        }
    }
    if (counter > 0){
        previousAvgHintUsage = Math.round(previousAvgHintUsage / counter);
    } else {
        previousAvgHintUsage = null;
    }
    /* 
    Check if the current hint level is less than the length of the hint levels array and if the hint level can be revealed.
    */
    if (
        stepData.hintSet && stepData.currHintLevel < hint_levels.length && revealHintLevel(stepData)){
            return; // don't fetch yet - use exisiting hint, no API call needed
        }
    try{
        // Sending request to the backend 
        const response = await fetch(`${BACKEND_URL}/generate_hint`, {            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({code_context, current_node, previousAvgHintUsage})
        });
        // check if the response was ok
        if (!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the response FROM the backend
        const data = await response.json();
        const hints_dict = data.hint_output.hints; // dict of 5 hints 

        stepData.hintSet = hints_dict;
        stepData.currHintLevel = 0;
        revealHintLevel(stepData); // display the first hint


    } catch (error) {
        console.error("Error generating hint:", error);
    }
}

function revealHintLevel(stepData){
    /*
    Function that reveals a hint level for the current step.
    */
    const currentHint = stepData.hintSet;
    const index = stepData.currHintLevel;
    const level_key = hint_levels[index];
    if (!currentHint || !level_key){
        return false;
    }
    const hintText = currentHint[level_key];
    const currentStep = window.currentStep ?? 0;

    // Initialize viewedHints array if it doesn't exist
    if (!stepData.viewedHints) {
        stepData.viewedHints = [];
    }

    // Only add to viewedHints if we're not navigating backwards
    if (!stepData.isNavigating) {
        stepData.viewedHints.push({
            level: level_key,
            levelIndex: index,
            hintText: hintText,
            hintObject: currentHint
        });
        stepData.currentHintIndex = stepData.viewedHints.length - 1;
    }
    
    //log the hint revealed event to firebase
    window.logInteraction('hint_revealed',{
        step: currentStep,
        level: level_key,
        levelIndex: index,
        hintText: hintText,
        hintsShown: stepData.hintsShown + 1
    });

    // Show hint in speech bubble
    const goBack = stepData.currentHintIndex > 0;
    const goForward = stepData.currentHintIndex < stepData.viewedHints.length - 1;
    displayHintInBubble(hintText, currentStep, level_key, index, goBack, goForward);

    // Activate robot assistant
    activateRobotAssistant();

    stepData.currHintLevel ++;
    stepData.hintsShown ++;
    updateHintButtonText();
    stepData.isNavigating = false; //Reset flag
    return true;
}

// Update the text and state of the hint button
function updateHintButtonText(){
    const hintButton = document.getElementById('hint-button')
    if (!hintButton){
        return;
    }
    const currentStep = window.currentStep;
    const stepData = hintSystem.history[currentStep];
    if (!stepData){
        return;
    }
    const hintsShown = stepData.hintsShown;
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
        hintButton.disabled = true; //all hints used, to disable button
    }
}

function goBacktoPreviousHint(step, event){
    // Stop event propagation to prevent triggering robot toggle
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    
    const stepData = hintSystem.history[step];
    const currentStep = window.currentStep ?? 0;
    if (!stepData || !stepData.viewedHints || stepData.viewedHints.length <= 1){
        return;
    }
    logInteraction('hint_navigation',{
        step: currentStep,
        fromIndex: stepData.currentHintIndex,
        toIndex: stepData.currentHintIndex -1
    });

    if (stepData.currentHintIndex > 0){
        stepData.currentHintIndex -=1;
        stepData.isNavigating = true; // set flag to prevent adding duplicate hints
        
        const previousHint = stepData.viewedHints[stepData.currentHintIndex]
        // Show hint in speech bubble
        const goBack = stepData.currentHintIndex >0;
        const goForward = stepData.currentHintIndex < stepData.viewedHints.length - 1;
        displayHintInBubble(previousHint.hintText,currentStep, previousHint.level, previousHint.levelIndex, goBack, goForward);
        // Activate robot assistant
        activateRobotAssistant();

        stepData.isNavigating = false; //reset flag
    }
}

function goForwardToNextHint(step, event){
    // Stop event propagation to prevent triggering robot toggle
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    
    const stepData = hintSystem.history[step];
    const currentStep = window.currentStep ?? 0;
    if (!stepData || !stepData.viewedHints || stepData.viewedHints.length <= 1){
        return;
    }
    
    const maxIndex = stepData.viewedHints.length - 1;
    if (stepData.currentHintIndex < maxIndex){
        stepData.currentHintIndex += 1;
        stepData.isNavigating = true; // to prevent adding duplicate hints
        
        const nextHint = stepData.viewedHints[stepData.currentHintIndex];
        // Show hint in speech bubble
        const goBack = stepData.currentHintIndex > 0;
        const goForward = stepData.currentHintIndex < maxIndex;
        displayHintInBubble(nextHint.hintText, currentStep, nextHint.level, nextHint.levelIndex, goBack, goForward);
        // Activate robot assistant
        activateRobotAssistant();

        stepData.isNavigating = false; //reset flag
        
        logInteraction('hint_navigation',{
            step: currentStep,
            fromIndex: stepData.currentHintIndex - 1,
            toIndex: stepData.currentHintIndex
        });
    }
}

// Create + activate the robot assistant
function activateRobotAssistant(){
    /*
    Function that activates the robot assistant.
    */
    const robot = document.getElementById('robot-assistant');
    const speechBubble = document.getElementById('speech-bubble');
    
    if (!robot || !speechBubble) {
        console.error('Robot assistant elements not found in HTML');
        return;
    }

    // Activate robot
    robot.classList.add('active');

    // Show speech bubble with animation
    setTimeout(() => {
        speechBubble.classList.add('show');
    }, 100);
}

// Collapse robot and hide speech bubble
function collapseRobot(){
    /*
    Function that collapses the robot assistant.
    */
    const robot = document.getElementById('robot-assistant');
    const speechBubble = document.getElementById('speech-bubble');
    
    if (!robot || !speechBubble) return;

    // Hide speech bubble
    speechBubble.classList.remove('show');
    
    // Shrink robot back to idle state
    setTimeout(() => {
        robot.classList.remove('active');
    }, 300);
}

// Toggle the robot assistant
function toggleRobot(){
    /*
    Function that toggles the robot assistant.
    */
    const robot = document.getElementById('robot-assistant');
    if (!robot) return;

    // If robot is active, collapse it
    if (robot.classList.contains('active')){
        collapseRobot();
    } 
    // Otherwise if robot idle, redisplay the last hint
    else{
        const currentStep = window.currentStep ?? 0;
        const stepData = hintSystem.history[currentStep];
        
        // If hints exist and have been viewed, use currentHintIndex to restore the correct hint
        if (stepData && stepData.viewedHints && stepData.viewedHints.length > 0){
            const lastIndex = stepData.currentHintIndex >= 0 ? stepData.currentHintIndex : stepData.viewedHints.length - 1;
            const lastHint = stepData.viewedHints[lastIndex];
            displayHintInBubble(lastHint.hintText, currentStep, lastHint.level, lastHint.levelIndex, lastIndex > 0);
            activateRobotAssistant();
        }
        // If no hints exist yet, just activate the robot
        else{
            activateRobotAssistant();
        }
    }
}


function displayHintInBubble(hint, currentStep, levelKey, levelIndex, canGoBack, canGoForward){
    /*
    Function that displays a hint in the speech bubble.
    */
    const speechBubbleContent = document.getElementById("speech-bubble-content");
    if (speechBubbleContent) {
        speechBubbleContent.innerHTML = `
        <div class="hint-header">
            ${canGoBack ? `<button class="hint-back-btn" onclick="goBacktoPreviousHint(${currentStep}, event)" title="Previous">👈</button>` : ''}
            <h3>${hint_labels[levelKey]}</h3>
            ${canGoForward ? `<button class="hint-forward-btn" onclick="goForwardToNextHint(${currentStep}, event)" title="Next">👉</button>` : ''}
        </div>
            <p>${hint}</p>
            <div class="speech-bubble-feedback">
                <p>Was this hint helpful?</p>
                <button onclick="submitHintFeedback(${currentStep}, ${levelIndex}, 'up', event)"
                        id="thumbs-up-${currentStep}-${levelIndex}"
                        style="border-color: #4CAF50;">
                    👍
                </button>
                <button onclick="submitHintFeedback(${currentStep}, ${levelIndex}, 'down', event)" 
                        id="thumbs-down-${currentStep}-${levelIndex}"
                        style="border-color: #f44336;">
                    👎
                </button>
            </div>
        `;
    }
}