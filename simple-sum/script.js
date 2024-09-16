let currentIteration = 0;
let maxIterations = 5;
let total = 0;
let lst = [2, 4, 6, 8];
let previousTotals = [];

// Step explanations
const stepExplanations = [
    "Step 1: Initialize total to 0 and define the list lst",
    "Step 2: Start loop - add lst[0] to total.",
    "Step 3: Add lst[1] to total.",
    "Step 4: Add lst[2] to total",
    "Step 5: Add lst[3] to total",
    "Looping complete!"
];

// Update step explanation
function updateStepExplanation() {
    const stepExplanation = document.getElementById('step-explanation');
    stepExplanation.textContent = stepExplanations[currentIteration];
}

// Increment loop
function incrementLoop() {
    if (currentIteration < maxIterations) {
        if (currentIteration > 0) {
            previousTotals.push(total);  // Save the current state
            total += lst[currentIteration - 1];  // Add the current value to total
        }
        currentIteration++;
        updateMemory();
        updateVisual();
        updateCodeHighlight();
        updateStepExplanation();
    } else {
        alert("Loop has completed all iterations.");
    }
}

// Decrement loop
function decrementLoop() {
    if (currentIteration > 0) {
        currentIteration--;
        if (currentIteration > 0) {
            total = previousTotals.pop();  // Restore the previous state
        } else {
            total = 0;
        }
        updateMemory();
        updateVisual();
        updateCodeHighlight();
        updateStepExplanation();
    } else {
        alert("You are at the beginning of the loop.");
    }
}



// Reset loop
function resetLoop() {
    currentIteration = 0;
    total = 0;
    previousTotals = [];  // Reset the state history
    updateMemory();
    updateVisual();
    updateCodeHighlight();
    updateStepExplanation();
    
}

// Run all iterations
function runAllIterations() {
    while (currentIteration < maxIterations) {
        incrementLoop();
    }
    
}

// Update code highlight
function updateCodeHighlight() {
    const lines = ["line1", "line2", "line3", "line4"];
    lines.forEach(line => {
        document.getElementById(line).classList.remove("highlight");
        document.getElementById(line).querySelector('.iteration-values')?.remove();  // Remove previous iteration values if any
    });

    if (currentIteration === 0) {
        document.getElementById("line1").classList.add("highlight");
        document.getElementById("line2").classList.add("highlight");
    } 
    else if (currentIteration <= maxIterations) {        
        document.getElementById("line4").classList.add("highlight");
        document.getElementById("line4").insertAdjacentHTML('beforeend', `<span class="iteration-values" style="color: blue; font-size: small;"> i = ${currentIteration - 1}</span>`);
    
        document.getElementById("line3").classList.add("highlight");
        document.getElementById("line3").insertAdjacentHTML('beforeend', `<span class="iteration-values" style="color: blue; font-size: small;"> i = ${currentIteration - 1}</span>`);
    
    }
}

// Update memory
function updateMemory() {
    const memoryIValue = document.getElementById('memory-i-value');
    const memoryTotalValue = document.getElementById('memory-total-value');
    const memoryLstValue = document.getElementById('memory-lst-value');

    memoryIValue.textContent = currentIteration < maxIterations ? currentIteration - 1 : maxIterations - 1;
    memoryTotalValue.textContent = total;

    memoryLstValue.innerHTML = `
        <div class="nested-list">
            <div class="list-container">
                ${lst.map((value, index) => `
                    <div class="index-container">
                        <div class="list-index ${index === currentIteration - 1 ? 'highlight-item' : ''}">[${index}]
                        
                        
                        </div>
                        <div class="arrow-down"></div>
                        <div class="list-value ${index === currentIteration - 1 ? 'highlight-item' : ''}">${value}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}


// Update visual
function updateVisual() {
    const visualDiv = document.getElementById('visual');
    const paperDiv = document.querySelector('.lined-paper');
    const listItems = lst.map((value, index) => 
        `<div class="list-item ${index === currentIteration - 1 ? 'highlight-item' : ''}">
            <div class="index">${index}.</div>
            <div class="value">${value}</div>
        </div>`
    ).join("");

    paperDiv.innerHTML = listItems;

    visualDiv.innerHTML = ''; // Clear previous content
    if (currentIteration > 0 && currentIteration <= maxIterations) {
        const pencil = `<img src="pointer.png" alt="Pencil" id="pencil-image" class="pencil-image" style="top: ${currentIteration * 40}px" />`;
        visualDiv.innerHTML = pencil;
    }

    const totalBox = `
        <div class="total-box">
            <div class="total-box-title">Total</div>
            <div class="total-value">${total}</div>
        </div>`;

    paperDiv.insertAdjacentHTML('beforeend', totalBox);

    document.getElementById('iteration-info').textContent = `Iteration i = ${currentIteration < maxIterations ? currentIteration - 1 : maxIterations - 1}`;
 

}

// Function to update pencil position
function updatePencilPosition() {
    const pencilImage = document.getElementById('pencil-image');
    const listItems = document.querySelectorAll('.list-item');
    
    if (currentIteration > 0 && currentIteration <= listItems.length) {
        const targetItem = listItems[currentIteration - 1];
        const paperRect = document.querySelector('.lined-paper').getBoundingClientRect();
        const itemRect = targetItem.getBoundingClientRect();
        
        // Position the pencil to point to the current item
        pencilImage.style.top = (itemRect.top - paperRect.top + window.scrollY - pencilImage.clientHeight) + 'px';
        pencilImage.style.left = (itemRect.left - paperRect.left + window.scrollX - pencilImage.clientWidth / 2) + 'px';
    }
}

// Show question
function showQuestion(topic) {
    const interactiveElement = document.getElementById('interactive-element');
    const questionDiv = document.getElementById('question');
    interactiveElement.classList.remove('hidden');

    if (topic === 'range') {
        questionDiv.innerHTML = `
            <p>What is the purpose of the range function in the loop?</p>
            <ul>
                <li><button onclick="checkAnswer('A')">A) To set the starting value of i</button></li>
                <li><button onclick="checkAnswer('B')">B) To determine the number of iterations</button></li>
                <li><button onclick="checkAnswer('C')">C) To increase the value of total</button></li>
            </ul>
        `;
    } else if (topic === 'increment') {
        questionDiv.innerHTML = `
            <p>What does the statement <code>total += lst[i]</code> do?</p>
            <ul>
                <li><button onclick="checkAnswer('A')">A) It sets the value of total to the value at lst[i]</button></li>
                <li><button onclick="checkAnswer('B')">B) It increases the value of total by the value at lst[i]</button></li>
                <li><button onclick="checkAnswer('C')">C) It decreases the value of total by the value at lst[i]</button></li>
            </ul>
        `;
    }
}

// Show info
function showInfo(variable) {
    const interactiveElement = document.getElementById('interactive-element');
    const questionDiv = document.getElementById('question');
    interactiveElement.classList.remove('hidden');

    if (variable === 'i') {
        questionDiv.innerHTML = `<p>The variable <code>i</code> is used as the loop counter.</p>`;
    } else if (variable === 'total') {
        questionDiv.innerHTML = `<p>The variable <code>total</code> is used to keep track of the running total of the list elements.</p>`;
    } else if (variable === 'lst') {
        questionDiv.innerHTML = `<p>The variable <code>lst</code> is the 1D list of values being iterated over.</p>`;
    }
}

// Check answer
function checkAnswer(answer) {
    if (answer === 'B') {
        alert('Correct!');
    } else {
        alert('Try again.');
    }
}

// Hide interactive
function hideInteractive() {
    const interactiveElement = document.getElementById('interactive-element');
    interactiveElement.classList.add('hidden');
}

window.onload = () => {
    updateCodeHighlight();
    updateMemory();
    updateVisual();
    updateStepExplanation();
};

