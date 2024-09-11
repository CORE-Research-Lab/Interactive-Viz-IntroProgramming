let currentStep = 0; // Initialize step counter

// Define the steps corresponding to each line of the code for condition checking
const steps = [
    { line: "line1", changes: [{ variable: 'weather', value: "sunny" }] }, // Setting weather
    { line: "line2", changes: [{ variable: 'time_of_day', value: "morning" }] }, // Setting time_of_day
    { line: "line3", changes: [] }, // Start of first condition
    { line: "line4", changes: [] }, // Checking if time_of_day == 'morning'
    { line: "line5", changes: [] }, // Printing 'Go for a jog!'
    { line: "line5", changes: [] }, // Printing 'Go for a jog!'
];

const stepExplanations = [
    "Step 1: Assigning 'sunny' to <span class='variable'>weather</span>",
    "Step 2: Assigning 'morning' to <span class='variable'>time_of_day</span>",
    "Step 3: Checking if <span class='variable'>weather == 'sunny'</span>",
    "Step 4: Checking if <span class='variable'>time_of_day == 'morning'</span>",
    "Step 5: Printing 'Go for a jog!' because <span class='variable'>weather == 'sunny'</span> and <span class='variable'>time_of_day == 'morning'</span>",
    "All conditions are complete."
];

function incrementStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateMemory();
        updateVisual();
        updateStepExplanation();
    } else {
        alert("All steps have been executed.");
    }
}

function decrementStep() {
    if (currentStep > 0) {
        currentStep--;
        updateMemory();
        updateVisual();
        updateStepExplanation();
    } else {
        alert("You are at the start.");
    }
}

function resetSteps() {
    currentStep = 0;
    updateMemory();
    updateVisual();
    updateStepExplanation();
}

function updateStepExplanation() {
    const stepExplanation = document.getElementById('step-explanation');
    stepExplanation.innerHTML = stepExplanations[currentStep];
}

function updateMemory() {
    const svg = document.getElementById('memory');
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
    steps.forEach(step => document.getElementById(step.line).classList.remove('highlight'));
    document.getElementById(steps[currentStep].line).classList.add('highlight');

    if (currentStep >= 0) {
        drawVariableBox(svg, "weather", 30, 10, "sunny", currentStep === 0);
        drawValueBox(svg, "\"sunny\"", 280, 10, currentStep === 0);
        drawMemoryArrow(svg, 130, 25, 280, 25, currentStep === 0);
    }

    if (currentStep >= 1) {
        drawVariableBox(svg, "time_of_day", 30, 80, "morning", currentStep === 1);
        drawValueBox(svg, "\"morning\"", 280, 80, currentStep === 1);
        drawMemoryArrow(svg, 130, 95, 280, 95, currentStep === 1);
    }

}


function drawVariableBox(svg, name, x, y, value, highlight) {
    const varBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    varBox.setAttribute("x", x);
    varBox.setAttribute("y", y);
    varBox.setAttribute("width", 100);
    varBox.setAttribute("height", 30);
    varBox.setAttribute("fill", "#b3e5fc"); // Light blue for variables
    varBox.setAttribute("stroke", "black");
    varBox.setAttribute("stroke-width", 2);
    if (highlight) {
        varBox.setAttribute("stroke", "#ff6a00");
        varBox.setAttribute("fill", "#ffff00");
        varBox.setAttribute("stroke-width", 3);
    }
    svg.appendChild(varBox);

    const varText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    varText.setAttribute("x", x + 50);
    varText.setAttribute("y", y + 20);
    varText.setAttribute("text-anchor", "middle");
    varText.setAttribute("fill", "black");
    varText.textContent = name;
    svg.appendChild(varText);
}

function drawValueBox(svg, value, x, y, highlight) {
    const valueBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    valueBox.setAttribute("x", x);
    valueBox.setAttribute("y", y);
    valueBox.setAttribute("width", 100);
    valueBox.setAttribute("height", 30);
    valueBox.setAttribute("fill", "#cdf8bf"); // Light green for values
    valueBox.setAttribute("stroke", "black");
    valueBox.setAttribute("stroke-width", 2);
    if (highlight) {
        valueBox.setAttribute("fill", "#ffff00");
        valueBox.setAttribute("stroke", "#ff6a00");
        valueBox.setAttribute("stroke-width", 3);
    }
    svg.appendChild(valueBox);

    const valueText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    valueText.setAttribute("x", x + 50);
    valueText.setAttribute("y", y + 20);
    valueText.setAttribute("text-anchor", "middle");
    valueText.setAttribute("fill", "black");
    valueText.textContent = value;
    svg.appendChild(valueText);
}

function drawMemoryArrow(svg, x1, y1, x2, y2, highlight) {
    const arrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
    arrow.setAttribute("x1", x1);
    arrow.setAttribute("y1", y1);
    arrow.setAttribute("x2", x2);
    arrow.setAttribute("y2", y2);
    arrow.setAttribute("stroke", "black");
    arrow.setAttribute("stroke-width", 2);
    arrow.setAttribute("marker-end", "url(#arrow)"); // Use an arrowhead marker
    if (highlight) {
        arrow.setAttribute("stroke", "#ff6a00");
        arrow.setAttribute("stroke-width", 3);
    }
    svg.appendChild(arrow);
}


function updateVisual() {
    const svg = document.getElementById('visual');
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }

    // Draw all roads first
    drawRoad(svg, 200, 50, 200, 120, currentStep == 2);  // Main road
    drawRoad(svg, 200, 120, 100, 180, currentStep == 3);  // Branch to sunny path
    drawRoad(svg, 100, 180, 60, 240, currentStep == 4);  // Path to morning result
    drawRoad(svg, 100, 180, 140, 240, false);  // Path to afternoon result
    drawRoad(svg, 140, 240, 80, 300, false);  // Path to picnic
    drawRoad(svg, 140, 240, 200, 300, false);  // Path to sunset

    //drawRoad(svg, 100, 180, 100, 240);  // Path to else/sunset result

    drawRoad(svg, 200, 120, 300, 180, false);  // Branch to rainy path
    drawRoad(svg, 300, 180, 280, 240, false);  // Path to rainy result
    drawRoad(svg, 300, 180, 350, 240, false);  // Path to else/default result

    // Draw the signposts and decisions
    drawSignpost(svg, "sunny?", 150, 110, currentStep == 2);  // First decision: weather == "sunny"
    drawYesNoLabels(svg, 110, 150, 290, 150); // Yes and No signs for weather == sunny

    drawSignpost(svg, "morning?", 45, 170, currentStep == 3);  // Nested decision: time_of_day == "morning"
    drawYesNoLabels(svg, 45, 220, 150, 220); // Yes and No signs for time_of_day == morning

    drawSignpost(svg, "afternoon?", 100, 230, false);  // First decision: weather == "sunny"
    drawYesNoLabels(svg, 75, 280, 200, 280);

    drawSignpost(svg, "rainy?", 250, 170, false);  // Second decision: weather == "rainy"
    drawYesNoLabels(svg, 260, 220, 360, 220);  // Yes and No signs for weather == rainy

    // Draw the destination results last
    drawDestination(svg, "images/running.png", 50, 255);  // Morning result
    if (currentStep == 4) {
        drawDestination(svg, "images/running-hl.png", 50, 255);  // Morning result
    }
    drawDestination(svg, "images/picnic.png", 80, 320);  // Afternoon result
    drawDestination(svg, "images/sunrise.png", 200, 320);  // Else result for sunny

    drawDestination(svg, "images/umbrella.png", 280, 265);  // Rainy result
    drawDestination(svg, "images/indoor.png", 350, 265);  // Else result
}

function drawRoad(svg, x1, y1, x2, y2, highlight) {
    const road = document.createElementNS("http://www.w3.org/2000/svg", "line");
    road.setAttribute("x1", x1);
    road.setAttribute("y1", y1);
    road.setAttribute("x2", x2);
    road.setAttribute("y2", y2);
    road.setAttribute("stroke", "black");
    road.setAttribute("stroke-width", 15);
    if (highlight){
        road.setAttribute("stroke", "#ff6a00");
        road.setAttribute("stroke-width", 20);
    }
    svg.appendChild(road);
}

function drawSignpost(svg, label, x, y, highlight) {
    const signpost = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    signpost.setAttribute("x", x);
    signpost.setAttribute("y", y);
    signpost.setAttribute("width", 100);
    signpost.setAttribute("height", 30);
    signpost.setAttribute("fill", "#e4ecf0");
    signpost.setAttribute("stroke", "black");
    if(highlight){
        signpost.setAttribute("stroke", "#ff6a00");
        signpost.setAttribute("fill", "#ffff00");
    }
    svg.appendChild(signpost);

    const signText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    signText.setAttribute("x", x + 50);
    signText.setAttribute("y", y + 20);
    signText.setAttribute("text-anchor", "middle");
    signText.setAttribute("fill", "black");
    signText.textContent = label;
    svg.appendChild(signText);
}

// function drawDestination(svg, label, x, y) {
//     const destination = document.createElementNS("http://www.w3.org/2000/svg", "rect");
//     destination.setAttribute("x", x - 30);
//     destination.setAttribute("y", y - 15);
//     destination.setAttribute("width", 80);
//     destination.setAttribute("height", 30);
//     destination.setAttribute("fill", "#cdf8bf");
//     destination.setAttribute("stroke", "black");
//     svg.appendChild(destination);

//     const destinationText = document.createElementNS("http://www.w3.org/2000/svg", "text");
//     destinationText.setAttribute("x", x + 10);
//     destinationText.setAttribute("y", y);
//     destinationText.setAttribute("text-anchor", "middle");
//     destinationText.setAttribute("fill", "black");
//     destinationText.textContent = label;
//     svg.appendChild(destinationText);
// }

function drawDestination(svg, imageUrl, x, y) {
    const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
    img.setAttributeNS("http://www.w3.org/1999/xlink", "href", imageUrl);
    img.setAttribute("x", x - 15);  // Adjust the x-coordinate
    img.setAttribute("y", y - 15);  // Adjust the y-coordinate
    img.setAttribute("width", 30);  // Set the width of the icon
    img.setAttribute("height", 30); // Set the height of the icon
    svg.appendChild(img);
}


function drawYesNoLabels(svg, yesX, yesY, noX, noY) {
    const yesText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    yesText.setAttribute("x", yesX);
    yesText.setAttribute("y", yesY);
    yesText.setAttribute("text-anchor", "middle");
    yesText.setAttribute("fill", "green");
    yesText.setAttribute("font-size", "18px");
    yesText.setAttribute("font-weight", "bold");
    yesText.textContent = "Yes";
    svg.appendChild(yesText);

    const noText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    noText.setAttribute("x", noX);
    noText.setAttribute("y", noY);
    noText.setAttribute("text-anchor", "middle");
    noText.setAttribute("fill", "red");
    noText.setAttribute("font-size", "18px");
    noText.setAttribute("font-weight", "bold");
    noText.textContent = "No";
    svg.appendChild(noText);
}



window.onload = () => {
    resetSteps();
    updateStepExplanation();
}
