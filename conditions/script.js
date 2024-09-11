let currentStep = 0; // Initialize step counter
const steps = [
    { condition: "weather == 'sunny'", nextStep: "time_of_day" }, // First condition: weather check
    { condition: "time_of_day == 'morning'", result: "Go for a jog!" }, // Nested condition: morning
    { condition: "time_of_day == 'afternoon'", result: "Go for a picnic!" }, // Nested condition: afternoon
    { condition: "time_of_day == 'evening'", result: "Watch the sunset" }, // Nested condition: evening
    { condition: "weather == 'rainy'", result: "Take an umbrella!" }, // Else condition: rainy weather
    { condition: "default", result: "Stay indoors and relax." } // Else condition: default (invalid weather)
];

const stepExplanations = [
    "Checking if the weather is sunny...",
    "Checking if it's morning...",
    "Checking if it's afternoon...",
    "Checking if it's evening...",
    "The weather is rainy, so we take an umbrella.",
    "Unknown weather, let's stay indoors."
];

function incrementStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateVisual();
        updateStepExplanation();
    } else {
        alert("All conditions have been checked.");
    }
}

function decrementStep() {
    if (currentStep > 0) {
        currentStep--;
        updateVisual();
        updateStepExplanation();
    } else {
        alert("You are at the start.");
    }
}

function resetSteps() {
    currentStep = 0;
    updateVisual();
    updateStepExplanation();
}

function updateStepExplanation() {
    const stepExplanation = document.getElementById('step-explanation');
    stepExplanation.innerHTML = stepExplanations[currentStep];
}

function updateVisual() {
    const svg = document.getElementById('visual');
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }

    // Draw the main road and decision points
    drawRoad(svg, 100, 50, 100, 200);  // Main road from the top

    // First condition: weather == 'sunny'
    if (currentStep >= 0) {
        drawSignpost(svg, "Weather == 'sunny'?", 70, 100);
        drawRoad(svg, 100, 100, 50, 150); // Path for Sunny
        drawRoad(svg, 100, 100, 150, 150); // Path for Rainy
    }

    // If condition is sunny, check time of day
    if (currentStep >= 1 && currentStep <= 3) {
        drawSignpost(svg, "Time == 'morning'?", 20, 150);
        drawRoad(svg, 50, 150, 10, 200); // Morning path
        drawRoad(svg, 50, 150, 90, 200); // Afternoon path
        drawRoad(svg, 50, 150, 50, 250); // Evening path
    }

    // Show destinations based on conditions
    if (currentStep >= 1) {
        if (currentStep === 1) drawDestination(svg, "Go for a jog!", 10, 200); // Morning result
        if (currentStep === 2) drawDestination(svg, "Go for a picnic!", 90, 200); // Afternoon result
        if (currentStep === 3) drawDestination(svg, "Watch the sunset", 50, 250); // Evening result
    }

    // If weather is rainy
    if (currentStep >= 4) {
        drawDestination(svg, "Take an umbrella!", 150, 150); // Rainy result
    }

    // Default condition
    if (currentStep === 5) {
        drawDestination(svg, "Stay indoors and relax", 120, 250); // Default result
    }
}

function drawRoad(svg, x1, y1, x2, y2) {
    const road = document.createElementNS("http://www.w3.org/2000/svg", "line");
    road.setAttribute("x1", x1);
    road.setAttribute("y1", y1);
    road.setAttribute("x2", x2);
    road.setAttribute("y2", y2);
    road.setAttribute("stroke", "black");
    road.setAttribute("stroke-width", 2);
    svg.appendChild(road);
}

function drawSignpost(svg, label, x, y) {
    const signpost = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    signpost.setAttribute("x", x);
    signpost.setAttribute("y", y);
    signpost.setAttribute("width", 100);
    signpost.setAttribute("height", 30);
    signpost.setAttribute("fill", "#e4ecf0");
    signpost.setAttribute("stroke", "black");
    svg.appendChild(signpost);

    const signText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    signText.setAttribute("x", x + 50);
    signText.setAttribute("y", y + 20);
    signText.setAttribute("text-anchor", "middle");
    signText.setAttribute("fill", "black");
    signText.textContent = label;
    svg.appendChild(signText);
}

function drawDestination(svg, label, x, y) {
    const destination = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    destination.setAttribute("x", x - 30);
    destination.setAttribute("y", y - 15);
    destination.setAttribute("width", 80);
    destination.setAttribute("height", 30);
    destination.setAttribute("fill", "#cdf8bf");
    destination.setAttribute("stroke", "black");
    svg.appendChild(destination);

    const destinationText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    destinationText.setAttribute("x", x + 10);
    destinationText.setAttribute("y", y);
    destinationText.setAttribute("text-anchor", "middle");
    destinationText.setAttribute("fill", "black");
    destinationText.textContent = label;
    svg.appendChild(destinationText);
}

window.onload = () => {
    resetSteps();
    updateStepExplanation();
}
