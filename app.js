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

for (const route in routes) {
    let newOption = new Option(route, route);
    select_route.add(newOption, undefined);
}

function onSubmition() {
    const selectedState = select_state.options[select_state.selectedIndex].text;
    const selectedRoute = select_route.options[select_route.selectedIndex].text;

    // Расчет выбросов
    const co2PerKm = states[selectedState];
    const distance = routes[selectedRoute];
    const wasteEmissionFactor = 0.5;
    const wasteEmissions = co2PerKm * distance * wasteEmissionFactor;

    document.getElementById("output-route").textContent = wasteEmissions;
}
