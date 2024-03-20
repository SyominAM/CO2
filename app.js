const states = {
    "Маршрутное такси МУ БГПАТП": 200,
    "автобус МАЗ-206.086": 150,
    "троллейбус ПКТС-6281 «Адмирал»": 0,
};
const routes = {
    "Микрорайон Московский - Ходаринка": 5.3,
    "Школа №61 - Дизельный завод": 6.7,
    "пос.Дарковичи - Мясокомбинат": 7.8,
};

const select_state = document.getElementById("select-state");
const select_route = document.getElementById("select-route");

for (const state in states) {
    let newOption = new Option(state, state);
    select_state.add(newOption, undefined);
}

// No need for a separate route selection functionality as all routes will be displayed

function calculateEmissions(state, route) {
    const co2PerKm = states[state];
    const distance = routes[route];
    const wasteEmissionFactor = 0.5;
    return Math.round(co2PerKm * distance * wasteEmissionFactor); // Round to nearest integer
}

function displayEmissionsTable() {
    const tableBody = document.getElementById("emissions-table").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ""; // Clear table contents before adding new rows

    for (const route in routes) {
        const state = select_state.value;
        const distance = routes[route];
        const emissions = calculateEmissions(state, route);

        const tableRow = document.createElement("tr");
        const stateCell = document.createElement("td");
        stateCell.textContent = state;
        tableRow.appendChild(stateCell);

        const routeCell = document.createElement("td");
        routeCell.textContent = route;
        tableRow.appendChild(routeCell);

        const distanceCell = document.createElement("td");
        distanceCell.textContent = distance;
        tableRow.appendChild(distanceCell);

        const emissionsCell = document.createElement("td");
        emissionsCell.textContent = emissions;
        tableRow.appendChild(emissionsCell);

        tableBody.appendChild(tableRow);
    }
}

// Download button functionality
function downloadEmissionsData() {
    const tableBody = document.getElementById("emissions-table").getElementsByTagName("tbody")[0];
    const rows = tableBody.querySelectorAll("tr");

    // Build the text file content
    let dataText = "";
    for (const row of rows) {
        const cells = row.querySelectorAll("td");
        const text = [...cells].map(cell => cell.textContent).join("\t"); // Use tab separator
        dataText += text + "\n";
    }

    // Create a Blob object with the data
    const blob = new Blob([dataText], { type: "text/plain" });

    // Create a link element (invisible) to trigger download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "emissions_data.txt";
    link.style.display = "none";
    document.body.appendChild(link);

    // Simulate a click to initiate download
    link.click();

    // Clean up the link element
    document.body.removeChild(link);
}

// Add event listener to the download button
document.getElementById("download-button").addEventListener("click", downloadEmissionsData);

// Initial table population on page load
displayEmissionsTable();
