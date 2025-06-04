
function calculateParams() {
    // Ottieni i valori dal form
    const material = document.getElementById('material').value;
    const toolType = document.getElementById('toolType').value;
    const cuttingSpeed = parseFloat(document.getElementById('cuttingSpeed').value);
    const feedPerTooth = parseFloat(document.getElementById('feedPerTooth').value);
    const numberOfTeeth = parseInt(document.getElementById('numberOfTeeth').value);
    const toolDiameter = parseFloat(document.getElementById('toolDiameter').value);
    const pathRadius = parseFloat(document.getElementById('pathRadius').value);

    // Calcola il numero di giri (RPM)
    const rpm = (cuttingSpeed * 1000) / (Math.PI * toolDiameter);

    // Calcola l'avanzamento (mm/min)
    const feedRate = feedPerTooth * numberOfTeeth * rpm;

    // Calcola l'avanzamento corretto (mm/min)
    const correctedFeedRate = feedRate * (1 - (toolDiameter / (2 * pathRadius)));

    // Mostra i risultati
    document.getElementById('rpm').innerText = `Numero di Giri (RPM): ${rpm.toFixed(2)}`;
    document.getElementById('feedRate').innerText = `Avanzamento (mm/min): ${feedRate.toFixed(2)}`;
    document.getElementById('correctedFeedRate').innerText = `Avanzamento Corretto (mm/min): ${correctedFeedRate.toFixed(2)}`;
}
