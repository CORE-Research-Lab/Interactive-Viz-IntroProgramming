/**
 * Handles hint generation, display, and state management
 */

/*define constants
define empty object for hinthistory
define variables for previousStep
 */


function createHintModal(hint){
    /* Creates the modal popup */
    if (document.getElementById('hint-modal')) {
        return; // Modal already exists
    }
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


function closeHintModal(hint){
    /* Closes the modal popup */
    const modal = document.getElementById('hint-modal');
    if (modal){
        modal.style.display = 'none';
    }
}

function updateHintButtonText(){
    /* Updates the text of the hint button */
    const hintButton = document.getElementById('hint-button')
    if (!hintButton){
        return;
    }
    const hintsShown = getHintsShownForCurrentStep();
    const maxHints = 5;
    const remaining = maxHints - hintsShown;

    // Updating the button text and state based on remaining
    if (hintsShown ===0){
        hintButton.textContent = 'Hint';
        hintButton.disabled = false;
    } else if (hintsShown < maxHints){
        hintButton.textContent = `Next Hint ${remaining}/${maxHints}`;
        hintButton.disabled = false;
    } else {
        hintButton.textContent = 'No more hints';
        hintButton.disabled = true;
    }
}

function getHintsShownForCurrentStep(){
    hintHistory[currentStep]?.hintsShown ||0
}