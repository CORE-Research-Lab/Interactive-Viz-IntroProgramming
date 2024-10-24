// script.js

let currentStep = 0;
const totalSteps = 4; // Total steps based on your description
const memoryData = {
    main: {},
    classes: {},
    objects: {}
};
let idCounter = 60; // Starting ID as per your example

const stepInfo = document.getElementById('step-info');
const stepExplanation = document.getElementById('step-explanation');
const codeElement = document.getElementById('code');
const memoryWindow = document.getElementById('memory-window');

const stepDescriptions = [
    "Step 1: Create a LinkedList instance.",
    "Step 2: Execute LinkedList.__init__ constructor.",
    "Step 3: Append a node with data=10 to the LinkedList.",
    "Step 4: Append a node with data=20 to the LinkedList."
];

function highlightCode(step) {
    // Remove existing highlights
    for (let i = 1; i <= 20; i++) { // Updated to 20 lines
        const line = document.getElementById(`line${i}`);
        if (line) {
            line.classList.remove('highlight');
        }
    }
    // Highlight current step's relevant line
    switch(step) {
        case 1:
            const line18 = document.getElementById('line18');
            if (line18) line18.classList.add('highlight');
            break;
        case 2:
            const line6 = document.getElementById('line6');
            if (line6) line6.classList.add('highlight');
            break;
        case 3:
            const line19 = document.getElementById('line19');
            if (line19) line19.classList.add('highlight');
            break;
        case 4:
            const line20 = document.getElementById('line20');
            if (line20) line20.classList.add('highlight');
            break;
        default:
            break;
    }
}

function updateStepDescription(step) {
    if (step >= 1 && step <= stepDescriptions.length) {
        stepExplanation.innerHTML = stepDescriptions[step - 1];
    } else {
        stepExplanation.innerHTML = "Step 0: Initialize two empty Linked Lists.";
    }
}

function updateStepInfo(step) {
    stepInfo.textContent = `Step ${step}`;
}

function resetSteps() {
    currentStep = 0;
    memoryData.main = {};
    memoryData.classes = {};
    memoryData.objects = {};
    idCounter = 60; // Reset ID counter
    // Clear memory window
    memoryWindow.innerHTML = '';
    // Clear linked list visualization
    updateVisualDiagram();
    // Reset highlights and descriptions
    highlightCode(0);
    updateMemoryDiagram();
    updateVisualDiagram();
    updateStepDescription(0);
    updateStepInfo(0);
}

function incrementStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        executeStep(currentStep);
    } else {
        alert("All steps completed.");
    }
}

function decrementStep() {
    if (currentStep > 0) {
        currentStep--;
        executeStep(currentStep);
    } else {
        alert("Already at the first step.");
    }
}

function runAllSteps() {
    while (currentStep < totalSteps) {
        currentStep++;
        executeStep(currentStep);
    }
}

function executeStep(step) {
    removeHighlights(); // Clear previous highlights
    switch(step) {
        case 1:
            // Step 1: Execute line18 - ll1 = LinkedList()
            createLinkedListInstance();
            updateVisualDiagram(18);
            break;
        case 2:
            // Step 2: Execute line6 - LinkedList.__init__()
            executeLinkedListConstructor();
            break;
        case 3:
            // Step 3: Execute line19 - ll1.append(10)
            appendNode(10);
            updateVisualDiagram(19);
            break;
        case 4:
            // Step 4: Execute line20 - ll1.append(20)
            appendNode(20);
            updateVisualDiagram(20);
            break;
        default:
            break;
    }
    highlightCode(step);
    updateStepDescription(step);
    updateStepInfo(step);
}

function createLinkedListInstance() {
    // Simulate: ll1 = LinkedList()
    const linkedListId = `id${idCounter++}`; // e.g., id60
    memoryData.main['ll1'] = linkedListId;
    // Show __main__ scope with ll1 variable
    createObjectBox("id3", "__main__", [
        {name: "ll1", value: linkedListId},
        {name: "ll2", value: "id61"} // Assuming ll2 is unused or another list
    ], 20, 520, true);
}

function executeLinkedListConstructor() {
    const linkedListId = memoryData.main['ll1']; // e.g., id60
    // Define LinkedList class if not already defined
    if (!memoryData.classes['LinkedList']) {
        memoryData.classes['LinkedList'] = {
            id: `id${idCounter++}`, // e.g., id61
            name: 'LinkedList',
            instanceVariables: ['_first']
        };
    }
    // Instantiate LinkedList object
    memoryData.objects[linkedListId] = {
        class: 'LinkedList',
        variables: {
            '_first': 'id63' // id63 refers to 'None'
        }
    };
    // Show LinkedList.__init__ scope
    createObjectBox("id2", "LinkedList.__init__", [
        {name: "self", value: linkedListId}
    ], 20, 380, true);
    // Show LinkedList object in memory
    createObjectBox(linkedListId, "LinkedList", [
        {name: "_first", value: "id63"}
    ], 260, 20, false);
    // Show NoneType object
    createObjectBox("id63", "NoneType", [
        {name: "", value: "None"}
    ], 450, 20, false);
}

function appendNode(data) {
    // Simulate: ll1.append(data)
    const linkedListId = memoryData.main['ll1']; // e.g., id60
    if (!linkedListId || !memoryData.objects[linkedListId]) {
        console.error("LinkedList instance not found.");
        return;
    }
    // Create a new node (constructor execution)
    const nodeInitId = `id${idCounter++}`; // e.g., id64, id66
    const nodeId = `id${idCounter++}`; // e.g., id65, id67
    const intId = `id${idCounter++}`; // e.g., id65, id67 for int values

    // Create Node.__init__ scope
    createObjectBox(nodeInitId, "Node.__init__", [
        {name: "self", value: nodeId},
        {name: "data", value: intId }
    ], 20, (data === 10 ? 200 : 20), true);

    // Create int object for data
    createObjectBox(intId, "int", [
        {name: "", value: data}
    ], 450, (data === 10 ? 200 : 400), false);

    // Create Node object with data
    createObjectBox(nodeId, "Node", [
        {name: "data", value: intId}, // id65 for 10, id67 for 20
        {name: "next", value: "id63"} // None
    ], 260, (data === 10 ? 200 : 400), false);

    // Update LinkedList's _first or last.next
    const linkedList = memoryData.objects[linkedListId];
    if (linkedList.variables['_first'] === 'id63') { // If list is empty
        linkedList.variables['_first'] = nodeId;
    } else {
        // Traverse to the end and append
        let lastNodeId = linkedList.variables['_first'];
        while (memoryData.objects[lastNodeId].variables['next'] !== 'id63') {
            lastNodeId = memoryData.objects[lastNodeId].variables['next'];
        }
        memoryData.objects[lastNodeId].variables['next'] = nodeId;
    }

    // Show LinkedList object updated
    updateObjectBox(linkedListId, "_first", memoryData.objects[linkedListId].variables['_first']);
}

function updateObjectBox(objId, varName, varValue) {
    const objBox = document.getElementById(objId);
    if (objBox) {
        // Find the attribute div
        const attributes = objBox.querySelectorAll('.attribute');
        attributes.forEach(attr => {
            if (attr.textContent.startsWith(`${varName}:`)) {
                attr.textContent = `${varName}: ${varValue}`;
            }
        });
    }
}

function updateMemoryDiagram() {
    // No action needed as boxes are created per step
}

function drawMemory() {
    // All boxes are created per step, no need to draw all at once
}

function createObjectBox(id, title, attributes, x, y, scope) {
    const objectBox = document.createElement("div");

    if (!scope){
        objectBox.className = "object-box highlight"; // Add 'highlight' class
        objectBox.style.left = `${x}px`;
        objectBox.style.top = `${y}px`;

        // Title (Class or Function Name)
        const objectTitle = document.createElement("h4");
        objectTitle.textContent = title;
        objectTitle.style.top = "0";
        objectTitle.style.right = "0";
        objectTitle.style.fontSize = "14px";
        objectTitle.style.backgroundColor = "white"; // Background to ensure readability
        objectTitle.style.border = "1px solid black"; // To match the border of the box
        objectTitle.style.position = "absolute";
        objectBox.appendChild(objectTitle);

        // ID in the top-left corner
        const idLabel = document.createElement("div");
        idLabel.textContent = id;
        idLabel.style.position = "absolute";
        idLabel.style.color = "#ff8519";
        idLabel.style.top = "0";
        idLabel.style.left = "0";
        idLabel.style.fontSize = "12px";
        idLabel.style.padding = "3px";
        idLabel.style.backgroundColor = "white"; // Background to ensure readability
        idLabel.style.border = "1px solid black"; // To match the border of the box
        objectBox.appendChild(idLabel);
    }
    else {
        objectBox.className = "scope-box highlight"; // Add 'highlight' class
        objectBox.style.left = `${x}px`;
        objectBox.style.top = `${y}px`;
        const objectTitle = document.createElement("h4");
        objectTitle.textContent = title;
        objectBox.appendChild(objectTitle);
    }

    // Content (Attributes or Variables)
    const contentDiv = document.createElement("div");
    contentDiv.className = "object-content";
    if (!scope) contentDiv.style.marginTop = "20px"; // Add some space between title/ID and attributes

    attributes.forEach(attribute => {
        // Wrap both attribute name and value inside a div for boxing
        const attributeDiv = document.createElement("div");
        attributeDiv.className = "attribute-box"; // Class for the box around each attribute

        if (attribute.name.trim() === "") {
            attributeDiv.innerHTML = `<span class="single-attribute">${attribute.value}</span>`;
        } else {
            attributeDiv.innerHTML = `<span class="attribute-name">${attribute.name}:</span> <span class="attribute-value">${attribute.value}</span>`;
        }
        contentDiv.appendChild(attributeDiv);
    });

    objectBox.appendChild(contentDiv);
    memoryWindow.appendChild(objectBox);

    // Trigger animation
    setTimeout(() => {
        objectBox.classList.add('visible');
    }, 10); // Slight delay to ensure transition
}


function updateVisualDiagram() {
    const visualContainer = document.querySelector('.linked-list-container');
    visualContainer.innerHTML = ''; // Clear previous visualization

    // Create Head Node
    const headDiv = document.createElement('div');
    headDiv.classList.add('head-node');
    headDiv.textContent = 'L1'; // Name of the LinkedList head
    visualContainer.appendChild(headDiv);

    // Create Pointer from Head to First Node
    const headPointer = document.createElement('div');
    headPointer.classList.add('pointer');
    headPointer.innerHTML = `
        <svg height="50" width="100">
            <line x1="0" y1="25" x2="94" y2="25" stroke="orange" stroke-width="1.5"/>
            <circle cx="6" cy="25" r="6" fill="orange" />
            <polygon points="90,20 100,25 90,30" fill="orange"/>
        </svg>
    `;
    visualContainer.appendChild(headPointer);

    // Function to create a node
    function createNode(data) {
        const nodeDiv = document.createElement('div');
        nodeDiv.classList.add('node', 'highlight'); // Add 'highlight' class

        // Value Part
        const valueDiv = document.createElement('div');
        valueDiv.classList.add('value');
        valueDiv.textContent = data;
        nodeDiv.appendChild(valueDiv);

        // Pointer Dot Part
        const pointerDotDiv = document.createElement('div');
        pointerDotDiv.classList.add('pointer-dot');
        nodeDiv.appendChild(pointerDotDiv);

        return nodeDiv;
    }

    if (currentStep >= 1){
        // Create First Node (data = 10)
        const node1Div = createNode('10');
        visualContainer.appendChild(node1Div);

        // Create Pointer from First Node to Second Node
        const pointer1 = document.createElement('div');
        pointer1.classList.add('pointer');
        pointer1.innerHTML = `
            <svg height="50" width="100">
                <line x1="0" y1="25" x2="94" y2="25" stroke="orange" stroke-width="1.5"/>
                <circle cx="6" cy="25" r="6" fill="orange" />
                <polygon points="90,20 100,25 90,30" fill="orange"/>
            </svg>
        `;
        visualContainer.appendChild(pointer1);
    }

    if (currentStep >= 2) {
        // Create Second Node (data = 20)
        const node2Div = createNode('20');
        visualContainer.appendChild(node2Div);

        // Create Pointer from Second Node to None (End of List)
        const pointer2 = document.createElement('div');
        pointer2.classList.add('pointer');
        pointer2.innerHTML = `
            <svg height="50" width="100">
                <circle cx="6" cy="25" r="6" fill="orange" />
            </svg>
        `;
        visualContainer.appendChild(pointer2);
    }
}


function removeHighlights() {
    // Remove 'highlight' class from all memory boxes
    const memoryBoxes = memoryWindow.querySelectorAll('.object-box, .scope-box');
    memoryBoxes.forEach(box => box.classList.remove('highlight'));

    // Remove 'highlight' class from all visual nodes
    const visualNodes = document.querySelectorAll('.linked-list-container .node');
    visualNodes.forEach(node => node.classList.remove('highlight'));

    // Remove 'highlight' class from all pointers if they have it
    const pointers = document.querySelectorAll('.linked-list-container .pointer');
    pointers.forEach(pointer => pointer.classList.remove('highlight'));
}


function getAttributeValue(variables, key) {
    const value = variables[key];
    if (value.startsWith('id')) {
        // Retrieve the actual value from objects
        if (memoryData.objects[value]) {
            const obj = memoryData.objects[value];
            if (obj.class === 'int') {
                return obj.variables[''] || '';
            } else if (obj.class === 'NoneType') {
                return 'None';
            } else {
                return value; // Reference to another object
            }
        } else {
            return value;
        }
    } else {
        return value;
    }
}

window.onload = () => {
    resetSteps();
};
