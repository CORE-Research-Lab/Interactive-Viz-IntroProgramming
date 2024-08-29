let currentStep = 0;
const steps = [
    { line: "line1", changes: [{ variable: 'a', value: 5 }] },
    { line: "line2", changes: [{ variable: 'b', value: 6 }] },
    { line: "line3", changes: [{ variable: 'c', value: 7 }] },
    { line: "line4", changes: [{ variable: 'temp', value: 'a' }] },
    { line: "line5", changes: [{ variable: 'a', value: 'b' }] },
    { line: "line6", changes: [{ variable: 'b', value: 'c' }] },
    { line: "line7", changes: [{ variable: 'c', value: 'temp' }] }
];

const stepExplanations = [
    "Step 1: Assigning the value 5 to a",
    "Step 2: Assigning the value 6 to b",
    "Step 3: Assigning the value 7 to c",
    "Step 4: Assigning the value of a to temp",
    "Step 5: Assigning the value of b to a",
    "Step 6: Assigning the value of c to b",
    "Step 7: Assigning the value of temp to c"
];

const variables = { a: null, b: null, c: null, temp: null };

function incrementStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateMemory();
        updateVisual();
        updateStepExplanation();
    } else {
        alert("All lines have been executed.");
    }
}


function decrementStep() {
    if (currentStep > 0) {
        currentStep--;
        updateMemory();
        updateVisual();
        updateStepExplanation();
    } else {
        alert("You are at the beginning.");
    }
}

function resetSteps() {
    currentStep = 0;
    variables.a = null;
    variables.b = null;
    variables.c = null;
    variables.temp = null;
    updateMemory();
    updateVisual();
    updateStepExplanation();
}

function updateStepExplanation() {
    const stepExplanation = document.getElementById('step-explanation');
    stepExplanation.textContent = stepExplanations[currentStep];
}

function runAllSteps() {
    currentStep = steps.length - 1;
    const stepExplanation = document.getElementById('step-explanation');
    stepExplanation.textContent = stepExplanations[currentStep];
    updateMemory();
    updateVisual();
}

function showInfo(message) {
    const interactiveElement = document.getElementById('interactive-element');
    const questionDiv = document.getElementById('question');
    interactiveElement.classList.remove('hidden');
    questionDiv.innerHTML = `<p>${message}</p>`;
}

function hideInteractive() {
    const interactiveElement = document.getElementById('interactive-element');
    interactiveElement.classList.add('hidden');
}

function updateVisual() {
    const colors = { a: "powderblue", b: "powderblue", c: "powderblue", temp: "powderblue" };
    const positions = { a: [50, 70], b: [150, 70], c: [250, 70], temp: [350, 70] };
    const svg = document.getElementById('visual');
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }

    const arrowhead = document.createElementNS("http://www.w3.org/2000/svg", "marker");
    arrowhead.setAttribute("id", "arrowhead");
    arrowhead.setAttribute("markerWidth", 10);
    arrowhead.setAttribute("markerHeight", 7);
    arrowhead.setAttribute("refX", 0);
    arrowhead.setAttribute("refY", 3.5);
    arrowhead.setAttribute("orient", "auto");
    arrowhead.setAttribute("markerUnits", "strokeWidth");

    const arrowheadPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    arrowheadPath.setAttribute("d", "M0,0 L0,7 L10,3.5 Z");
    arrowheadPath.setAttribute("fill", "black");

    arrowhead.appendChild(arrowheadPath);
    svg.appendChild(arrowhead);

    for (let i = 0; i <= currentStep; i++) {
        const variable = steps[i].changes[0].variable;
        const value = variables[variable];
        const [x, y] = positions[variable];

        // Draw open boxes instead of glasses
        const boxWidth = 40;
        const boxHeight = 40;
        const lidHeight = 10;

        // Main box
        const varBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        varBox.setAttribute("x", x - boxWidth / 2);
        varBox.setAttribute("y", y - boxHeight / 2);
        varBox.setAttribute("width", boxWidth);
        varBox.setAttribute("height", boxHeight);
        varBox.setAttribute("fill", "powderblue");
        varBox.setAttribute("stroke", "black");
        varBox.setAttribute("stroke-width", 2);
        svg.appendChild(varBox);

        // Lid of the box
        const lidLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        lidLine.setAttribute("x1", x - boxWidth / 2);
        lidLine.setAttribute("y1", y - boxHeight / 2);
        lidLine.setAttribute("x2", x + boxWidth / 2);
        lidLine.setAttribute("y2", y - boxHeight / 2 - lidHeight);
        lidLine.setAttribute("stroke", "black");
        lidLine.setAttribute("stroke-width", 2);
        svg.appendChild(lidLine);

        const varText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        varText.setAttribute("x", x);
        varText.setAttribute("y", y - boxHeight / 2 - lidHeight - 10);
        varText.setAttribute("text-anchor", "middle");
        varText.setAttribute("fill", "black");
        varText.textContent = variable;
        svg.appendChild(varText);

        if (value !== null) {
            const valueRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            valueRect.setAttribute("x", x - 10);
            valueRect.setAttribute("y", y + 10);
            valueRect.setAttribute("width", 20);
            valueRect.setAttribute("height", 20);
            valueRect.setAttribute("fill", "yellow");
            svg.appendChild(valueRect);

            const valueText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            valueText.setAttribute("x", x);
            valueText.setAttribute("y", y + 25);
            valueText.setAttribute("text-anchor", "middle");
            valueText.setAttribute("fill", "black");
            valueText.textContent = value;
            svg.appendChild(valueText);
        }
    }

    if (currentStep >= 3) {
        const variable = steps[0].changes[0].variable;
        const [x, y] = positions[variable];
        const nextVariable = steps[3].changes[0].variable;
        const [nextX, nextY] = positions[nextVariable];
        const arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");

        const pathDescription = `
            M ${x + 16},${y + 20}
            C ${x + 70},${y + 150} ${nextX - 70},${nextY + 150} ${nextX - 25},${nextY + 25}
        `;
        arrow.setAttribute("d", pathDescription);
        arrow.setAttribute("stroke", "black");
        arrow.setAttribute("stroke-width", 2);
        arrow.setAttribute("fill", "none");
        arrow.setAttribute("marker-end", "url(#arrowhead)"); // Attach the arrowhead marker
        svg.appendChild(arrow);

        // Add info button for this arrow
        addInfoButton(svg, (x + nextX) / 2, nextY + 150, "temp stores the value in a temporarily.");
    }

    if (currentStep >= 4) {
        for (let i = 0; i < currentStep - 4 + 1; i++) {
            const variable = steps[i + 1].changes[0].variable; // Start from the next variable
            const [x, y] = positions[variable];

            const nextVariable = steps[i].changes[0].variable; // Go to the current variable
            const [nextX, nextY] = positions[nextVariable];

            const arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");

            const pathDescription = `
                M ${x - 20},${y - 20}
                C ${x - 70},${y - 50} ${nextX + 70},${nextY - 50} ${nextX + 30},${nextY - 30}
            `;

            arrow.setAttribute("d", pathDescription);
            arrow.setAttribute("stroke", "black");
            arrow.setAttribute("stroke-width", 2);
            arrow.setAttribute("fill", "none");
            arrow.setAttribute("marker-end", "url(#arrowhead)"); // Attach the arrowhead marker
            svg.appendChild(arrow);

            // Add info button for this arrow
            const messages = [
                "a now refers to the value that b was referring to.",
                "b now refers to the value that c was referring to.",
                "c now refers to the value that temp was referring to."
            ];
            addInfoButton(svg, (x + nextX) / 2, (y + nextY) / 2, messages[i]);
        }
    }

    if (currentStep == 3) {
        const prevVariable = steps[3].changes[0].variable;
        const curVariable = steps[0].changes[0].variable;
        const prevPos = positions[prevVariable];
        const curPos = positions[curVariable];

        highlightBucket(svg, prevPos, prevVariable, variables[prevVariable]);
        highlightBucket(svg, curPos, curVariable, variables[curVariable]);
    }
    if (currentStep >= 4 && currentStep !== steps.length - 1) {
        const prevVariable = steps[currentStep].changes[0].variable;
        const curVariable = steps[currentStep + 1].changes[0].variable;
        const prevPos = positions[prevVariable];
        const curPos = positions[curVariable];

        highlightBucket(svg, prevPos, prevVariable, variables[prevVariable]);
        highlightBucket(svg, curPos, curVariable, variables[curVariable]);
    }

    if (currentStep === steps.length - 1) {
        const prevVariable = steps[currentStep].changes[0].variable;
        const curVariable = steps[3].changes[0].variable;

        const prevPos = positions[prevVariable];
        const curPos = positions[curVariable];

        highlightBucket(svg, prevPos, prevVariable, variables[prevVariable]);
        highlightBucket(svg, curPos, curVariable, variables[curVariable]);
    }
}


function highlightBucket(svg, position, variable, value) {
    const [x, y] = position;
    const boxWidth = 40;
    const boxHeight = 40;
    const lidHeight = 10;

    // Draw main box
    const varBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    varBox.setAttribute("x", x - boxWidth / 2);
    varBox.setAttribute("y", y - boxHeight / 2);
    varBox.setAttribute("width", boxWidth);
    varBox.setAttribute("height", boxHeight);
    varBox.setAttribute("fill", "yellow");
    varBox.setAttribute("stroke", "black");
    varBox.setAttribute("stroke-width", 2);
    svg.appendChild(varBox);

    // Draw lid line
    const lidLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    lidLine.setAttribute("x1", x - boxWidth / 2);
    lidLine.setAttribute("y1", y - boxHeight / 2);
    lidLine.setAttribute("x2", x + boxWidth / 2);
    lidLine.setAttribute("y2", y - boxHeight / 2 - lidHeight);
    lidLine.setAttribute("stroke", "black");
    lidLine.setAttribute("stroke-width", 2);
    svg.appendChild(lidLine);

    const varText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    varText.setAttribute("x", x);
    varText.setAttribute("y", y - boxHeight / 2 - lidHeight - 10);
    varText.setAttribute("text-anchor", "middle");
    varText.setAttribute("fill", "black");
    varText.textContent = variable;
    svg.appendChild(varText);

    if (value !== null) {
        const valueRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        valueRect.setAttribute("x", x - 10);
        valueRect.setAttribute("y", y + 10);
        valueRect.setAttribute("width", 20);
        valueRect.setAttribute("height", 20);
        valueRect.setAttribute("fill", "yellow");
        svg.appendChild(valueRect);

        const valueText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        valueText.setAttribute("x", x);
        valueText.setAttribute("y", y + 25);
        valueText.setAttribute("text-anchor", "middle");
        valueText.setAttribute("fill", "black");
        valueText.textContent = value;
        svg.appendChild(valueText);
    }
}

function addInfoButton(svg, x, y, message) {
    const button = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    button.setAttribute("x", x - 10);
    button.setAttribute("y", y - 30);
    button.setAttribute("width", 20);
    button.setAttribute("height", 20);

    const div = document.createElement("div");
    div.setAttribute("class", "info-button");
    div.setAttribute("onclick", `showInfo('${message}')`);
    div.innerHTML = "i";

    button.appendChild(div);
    svg.appendChild(button);
}

function updateMemory() {
    const svg = document.getElementById('memory');
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
    for (let i = 0; i <= currentStep; i++) {
        steps[i].changes.forEach(change => {
            variables[change.variable] = change.value === 'a' ? variables.a :
                                         change.value === 'b' ? variables.b :
                                         change.value === 'c' ? variables.c :
                                         change.value === 'temp' ? variables.temp : change.value;
        });
    }
    document.getElementById('step-info').textContent = `Step ${currentStep}`;
    steps.forEach(step => document.getElementById(step.line).classList.remove('highlight'));
    document.getElementById(steps[currentStep].line).classList.add('highlight');

    const positions = { a: [100, 50], b: [100, 100], c: [100, 150], temp: [100, 200] };
    const values = { 5: [300, 50], 6: [300, 100], 7: [300, 150] };

    Object.keys(variables).forEach(variable => {
        if (variables[variable] !== null) {
            const [x, y] = positions[variable];
            const value = variables[variable];
            const [vx, vy] = values[value];
            
            const varNode = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            varNode.setAttribute("x", x - 35);
            varNode.setAttribute("y", y - 15);
            varNode.setAttribute("width", 70);
            varNode.setAttribute("height", 30);
            varNode.setAttribute("fill", "lightblue");
            if (steps[currentStep].changes.some(change => change.variable === variable)) {
                varNode.classList.add("highlight-changes");
            }
            svg.appendChild(varNode);

            const varText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            varText.setAttribute("x", x);
            varText.setAttribute("y", y + 5);
            varText.setAttribute("text-anchor", "middle");
            varText.setAttribute("fill", "black");
            varText.textContent = variable;
            if (steps[currentStep].changes.some(change => change.variable === variable)) {
                varText.classList.add("highlight-changes");
            }
            svg.appendChild(varText);

            const arrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
            arrow.setAttribute("x1", x + 35);
            arrow.setAttribute("y1", y);
            arrow.setAttribute("x2", vx);
            arrow.setAttribute("y2", vy);
            arrow.setAttribute("stroke", "black");
            arrow.setAttribute("stroke-width", 2);
            arrow.setAttribute("marker-end", "url(#arrow)");
            if (steps[currentStep].changes.some(change => change.variable === variable)) {
                arrow.classList.add("highlight-changes");
            }
            svg.appendChild(arrow);

            const valueNode = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            valueNode.setAttribute("x", vx - 15);
            valueNode.setAttribute("y", vy - 15);
            valueNode.setAttribute("width", 30);
            valueNode.setAttribute("height", 30);
            valueNode.setAttribute("fill", "#ffa");
            valueNode.setAttribute("stroke", "#cc0");  // Set the border color
            valueNode.setAttribute("stroke-width", 2); // Set the border width (you can adjust the width as needed)
            if (steps[currentStep].changes.some(change => change.variable === variable)) {
                valueNode.classList.add("highlight-changes");
            }
            svg.appendChild(valueNode);
            

            const valueText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            valueText.setAttribute("x", vx);
            valueText.setAttribute("y", vy + 5);
            valueText.setAttribute("text-anchor", "middle");
            valueText.setAttribute("fill", "black");
            valueText.textContent = value;
            if (steps[currentStep].changes.some(change => change.variable === variable)) {
                valueText.classList.add("highlight-changes");
            }
            svg.appendChild(valueText);
        }
    });

    const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
    marker.setAttribute("id", "arrow");
    marker.setAttribute("markerWidth", "10");
    marker.setAttribute("markerHeight", "10");
    marker.setAttribute("refX", "5");
    marker.setAttribute("refY", "3");
    marker.setAttribute("orient", "auto");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M0,0 L0,6 L9,3 z");
    path.setAttribute("fill", "black");
    marker.appendChild(path);
    svg.appendChild(marker);
}


window.onload = () => {
    resetSteps();
    updateStepExplanation();
};
