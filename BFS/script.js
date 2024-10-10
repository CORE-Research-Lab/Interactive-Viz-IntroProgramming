let currentStep = 0;

const graph = {
    A: ['B', 'C'],
    B: ['D', 'E'],
    C: ['F'],
    D: [],
    E: ['F'],
    F: []
};

const steps = [
    { queue: ['A'], visited: [], codeLine: 2, currentNode: 'A' },
    { queue: ['B', 'C'], visited: ['A'], codeLine: 7, currentNode: 'B' },
    { queue: ['C', 'D', 'E'], visited: ['A', 'B'], codeLine: 7, currentNode: 'C' },
    { queue: ['D', 'E', 'F'], visited: ['A', 'B', 'C'], codeLine: 7, currentNode: 'D' },
    { queue: ['E', 'F'], visited: ['A', 'B', 'C', 'D'], codeLine: 7, currentNode: 'E' },
    { queue: ['F'], visited: ['A', 'B', 'C', 'D', 'E'], codeLine: 7, currentNode: 'F' },
    { queue: [], visited: ['A', 'B', 'C', 'D', 'E', 'F'], codeLine: 11, currentNode: null }
];

const stepExplanations = [
    "Starting with node A in the queue.",
    "Nodes B and C are added to the queue after visiting A.",
    "Node B is processed, and its neighbors D and E are added to the queue.",
    "Node C is processed, and its neighbor F is added to the queue.",
    "Node D is processed, no new nodes are added.",
    "Node E is processed, no new nodes are added.",
    "Node F is processed, BFS is complete."
];

function incrementStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateVisualization();
    } else {
        alert("All steps have been executed.");
    }
}

function decrementStep() {
    if (currentStep > 0) {
        currentStep--;
        updateVisualization();
    } else {
        alert("You are at the start.");
    }
}

function resetSteps() {
    currentStep = 0;
    updateVisualization();
}

function runAllSteps() {
    currentStep = steps.length - 1;
    updateVisualization();
}

function updateVisualization() {
    // Update step explanation
    document.getElementById('step-explanation').innerHTML = stepExplanations[currentStep];
    
    // Highlight current pseudocode line
    for (let i = 1; i <= 11; i++) {
        document.getElementById(`line${i}`).classList.remove('highlight');
    }
    document.getElementById(`line${steps[currentStep].codeLine}`).classList.add('highlight');

    // Update queue and visited table
    const table = document.getElementById('bfs-table');
    table.innerHTML = "<tr><th>Step</th><th>Queue</th><th>Visited</th></tr>"; // Reset table header
    for (let i = 0; i <= currentStep; i++) {
        const row = `<tr id="table-step-${i}" class="${i === currentStep ? 'highlight-table' : ''}">
                        <td>${i + 1}</td>
                        <td>${steps[i].queue.join(', ')}</td>
                        <td>${steps[i].visited.join(', ')}</td>
                    </tr>`;
        table.innerHTML += row;
    }

    // Update graph visualization
    drawGraph(steps[currentStep].queue, steps[currentStep].visited, steps[currentStep].currentNode);
}

function drawGraph(queue, visited, currentNode) {
    const svg = document.getElementById('graph');
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }

    const nodes = {
        A: { x: 200, y: 50 },
        B: { x: 100, y: 150 },
        C: { x: 300, y: 150 },
        D: { x: 50, y: 250 },
        E: { x: 150, y: 250 },
        F: { x: 300, y: 250 }
    };

    // Draw edges
    drawEdge(svg, nodes.A, nodes.B);
    drawEdge(svg, nodes.A, nodes.C);
    drawEdge(svg, nodes.B, nodes.D);
    drawEdge(svg, nodes.B, nodes.E);
    drawEdge(svg, nodes.C, nodes.F);
    drawEdge(svg, nodes.E, nodes.F);

    // Draw nodes with highlighting for currentNode
    Object.keys(nodes).forEach(node => {
        drawNode(svg, nodes[node], node, queue.includes(node), visited.includes(node), node === currentNode);
    });
}

function drawEdge(svg, from, to) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", from.x);
    line.setAttribute("y1", from.y);
    line.setAttribute("x2", to.x);
    line.setAttribute("y2", to.y);
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-width", 2);
    svg.appendChild(line);
}

function drawNode(svg, position, label, isInQueue, isVisited, isCurrentNode) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", position.x);
    circle.setAttribute("cy", position.y);
    circle.setAttribute("r", 20);
    circle.setAttribute("fill", isCurrentNode ? "#ffff00" : isVisited ? "#b3e5fc" : (isInQueue ? "#f0ad4e" : "#fff"));
    circle.setAttribute("stroke", "black");
    svg.appendChild(circle);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", position.x);
    text.setAttribute("y", position.y + 5);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "black");
    text.textContent = label;
    svg.appendChild(text);
}

// Initialize the visualization
window.onload = () => {
    resetSteps();
}
