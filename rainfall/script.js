let currentIteration = 0;
let maxIterations = 12;
let total = 0;
let lst = [
    [20, 12, -1, 5],
    [25, 10, 7, 17],
    [12, 30, 19, 0]
];
let previousTotals = [];

function incrementLoop() {
    if (currentIteration < maxIterations) {
        previousTotals.push(total);  // Save the current state
        const row = Math.floor(currentIteration / 4);
        const col = currentIteration % 4;
        total += lst[row][col];  // Add the current value to total
        currentIteration++;
        updateCodeHighlight();
        updateMemory();
        updateVisual();
    } else {
        alert("Loop has completed all iterations.");
    }
}

function decrementLoop() {
    if (currentIteration > 0) {
        currentIteration--;
        total = previousTotals.pop();  // Restore the previous state
        updateCodeHighlight();
        updateMemory();
        updateVisual();
    } else {
        alert("You are at the beginning of the loop.");
    }
}


function resetLoop() {
    currentIteration = 0;
    total = 0;
    previousTotals = [];  // Reset the state history
    updateCodeHighlight();
    updateMemory();
    updateVisual();
}

function runAllIterations() {
    while (currentIteration < maxIterations) {
        incrementLoop();
    }
    updateCodeHighlight();
    updateMemory();
    updateVisual();
}

function updateCodeHighlight() {
    const lines = ["line1", "line2", "line3", "line4", "line5"];
    lines.forEach(line => {
        document.getElementById(line).classList.remove("highlight");
        document.getElementById(line).querySelector('.iteration-values')?.remove();  // Remove previous iteration values if any
    });

    if (currentIteration === 0) {
        document.getElementById("line1").classList.add("highlight");
    } else if (currentIteration <= maxIterations) {
        const step = currentIteration % 2;
        if (step === 0) {
            document.getElementById("line5").classList.add("highlight");
            document.getElementById("line5").insertAdjacentHTML('beforeend', `<span class="iteration-values" style="color: blue; font-size: small;"> i = ${Math.floor(currentIteration / 4)}, j = ${(currentIteration - 1) % 4}</span>`);
        } else {
            document.getElementById("line5").classList.add("highlight");
            document.getElementById("line5").insertAdjacentHTML('beforeend', `<span class="iteration-values" style="color: blue; font-size: small;"> i = ${Math.floor((currentIteration - 1) / 4)}, j = ${(currentIteration - 1) % 4}</span>`);
        }
    }
}

function updateMemory() {
    const memoryIValue = document.getElementById('memory-i-value');
    const memoryTotalValue = document.getElementById('memory-total-value');
    const memoryJValue = document.getElementById('memory-j-value');
    const memoryLstValue = document.getElementById('memory-lst-value');

    const row = Math.floor(currentIteration / 4);
    const col = currentIteration % 4;

    memoryIValue.textContent = row;
    memoryJValue.textContent = col;
    memoryTotalValue.textContent = total;

    memoryLstValue.innerHTML = `
        <div class="nested-list">
            <div>[</div>
            ${lst.map((row, index) => `
                <div class="inner-list">
                    <div class="list-index">${index}:</div>
                    <div>[${row.join(", ")}]</div>
                </div>
            `).join('')}
            <div>]</div>
        </div>
    `;
}


function updateVisual() {
    const visualDiv = document.getElementById('visual');
    visualDiv.innerHTML = lst.flatMap((row, rowIndex) =>
        row.map((value, colIndex) => 
            `<div class="visual-box ${(rowIndex === Math.floor(currentIteration / 4) && colIndex === currentIteration % 4) ? 'light-blue' : ''}">
                ${value}
                <span class="index-value">[${rowIndex}][${colIndex}]</span>
            </div>`
        ).join("")
    ).join("");
    document.getElementById('iteration-info').textContent = `Iteration i = ${Math.floor(currentIteration / 4)}, j = ${currentIteration % 4}`;
}


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
                <li><button onclick="checkAnswer('A')">A) It sets the value of total to the value at lst[i][j]</button></li>
                <li><button onclick="checkAnswer('B')">B) It increases the value of total by the value at lst[i][j]</button></li>
                <li><button onclick="checkAnswer('C')">C) It decreases the value of total by the value at lst[i][j]</button></li>
            </ul>
        `;
    }
}

function showInfo(variable) {
    const interactiveElement = document.getElementById('interactive-element');
    const questionDiv = document.getElementById('question');
    interactiveElement.classList.remove('hidden');

    if (variable === 'i') {
        questionDiv.innerHTML = `<p>The variable <code>i</code> is used as the loop counter.</p>`;
    } else if (variable === 'total') {
        questionDiv.innerHTML = `<p>The variable <code>total</code> is used to keep track of the running total of the list elements.</p>`;
    } else if (variable === 'j') {
        questionDiv.innerHTML = `<p>The variable <code>j</code> is used to track the current index in the loop.</p>`;
    } else if (variable === 'lst') {
        questionDiv.innerHTML = `<p>The variable <code>lst</code> is the 2D list (or matrix) of values being iterated over.</p>`;
    }
}

function checkAnswer(answer) {
    if (answer === 'B') {
        alert('Correct!');
    } else {
        alert('Try again.');
    }
}

function hideInteractive() {
    const interactiveElement = document.getElementById('interactive-element');
    interactiveElement.classList.add('hidden');
}

window.onload = () => {
    updateCodeHighlight();
    updateMemory();
    updateVisual();
};