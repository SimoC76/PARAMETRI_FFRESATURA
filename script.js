window.onload = () => {
    loadOperations();
};

function calculateParams() {
    const material = document.getElementById('material').value;
    const toolType = document.getElementById('toolType').value;
    const cuttingSpeed = parseFloat(document.getElementById('cuttingSpeed').value);
    const feedPerTooth = parseFloat(document.getElementById('feedPerTooth').value);
    const numberOfTeeth = parseInt(document.getElementById('numberOfTeeth').value);
    const toolDiameter = parseFloat(document.getElementById('toolDiameter').value);
    const pathDiam = parseFloat(document.getElementById('pathDiam').value);

    const rpm = (cuttingSpeed * 1000) / (Math.PI * toolDiameter);
    const feedRate = feedPerTooth * numberOfTeeth * rpm;
   
// Calcola l'avanzamento corretto (mm/min)
    const correctedFeedRate = feedRate * (1 - (toolDiameter / (pathDiam)));



    document.getElementById('rpm').innerText = `Numero di Giri (RPM): ${rpm.toFixed(2)}`;
    document.getElementById('feedRate').innerText = `Avanzamento (mm/min): ${feedRate.toFixed(2)}`;
    document.getElementById('correctedFeedRate').innerText = `Avanzamento Corretto (mm/min): ${correctedFeedRate.toFixed(2)}`;
}

function saveOperation() {
    const material = document.getElementById('material').value;
    const toolType = document.getElementById('toolType').value;
    const cuttingSpeed = parseFloat(document.getElementById('cuttingSpeed').value);
    const feedPerTooth = parseFloat(document.getElementById('feedPerTooth').value);
    const numberOfTeeth = parseInt(document.getElementById('numberOfTeeth').value);
    const toolDiameter = parseFloat(document.getElementById('toolDiameter').value);
    const pathDiam = parseFloat(document.getElementById('pathDiam').value);

    const operationName = prompt("Inserisci un nome per la lavorazione:");
    if (!operationName) return;

    const operation = {
        name: operationName,
        material,
        toolType,
        cuttingSpeed,
        feedPerTooth,
        numberOfTeeth,
        toolDiameter,
        pathDiam
    };

    let operations = JSON.parse(localStorage.getItem('operations')) || [];
    operations.push(operation);
    localStorage.setItem('operations', JSON.stringify(operations));

    loadOperations();
}

function loadOperations() {
    const operations = JSON.parse(localStorage.getItem('operations')) || [];
    const select = document.getElementById('savedOperations');
    select.innerHTML = '<option value="">--Seleziona--</option>';

    operations.forEach((op, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = op.name;
        select.appendChild(option);
    });
}

function loadOperation() {
    const operations = JSON.parse(localStorage.getItem('operations')) || [];
    const index = document.getElementById('savedOperations').value;
    if (index === "") return;

    const op = operations[index];
    document.getElementById('material').value = op.material;
    document.getElementById('toolType').value = op.toolType;
    document.getElementById('cuttingSpeed').value = op.cuttingSpeed;
    document.getElementById('feedPerTooth').value = op.feedPerTooth;
    document.getElementById('numberOfTeeth').value = op.numberOfTeeth;
    document.getElementById('toolDiameter').value = op.toolDiameter;
    document.getElementById('pathDiam').value = op.pathDiam;
}

function deleteOperation() {
    const operations = JSON.parse(localStorage.getItem('operations')) || [];
    const index = document.getElementById('savedOperations').value;
    if (index === "") return;

    operations.splice(index, 1);
    localStorage.setItem('operations', JSON.stringify(operations));
    loadOperations();
}
