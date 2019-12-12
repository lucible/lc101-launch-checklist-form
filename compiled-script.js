function showMission() {
    fetch('https://handlers.education.launchcode.org/static/planets.json').then((response) => {
        response.json().then((json) => {
            const destination = document.getElementById('missionTarget');
            let index = Math.floor(Math.random() * 10);
            while (index >= json.length) {
                index = Math.floor(Math.random() * 10);
            }
            if (destination) {
                let html = `<h2>Mission Destination</h2>
                            <ol>
                                <li>Name: ${json[index].name}</li>
                                <li>Diameter: ${json[index].diameter}</li>
                                <li>Star: ${json[index].star}</li>
                                <li>Distance from Earth: ${json[index].distance}</li>
                                <li>Number of Moons: ${json[index].moons}</li>
                            </ol>
                            <img src="${json[index].image}">`;
                destination.innerHTML = html;
            }
            else {
                console.log('document elements not found!');
            }
        });
    });
}
function validateForm(e, inputs) {
    prepRequirements(inputs);
    if (inputs.every((item) => item.value !== "")) {
        e.preventDefault();
    }
    else {
        alert('Please fill out all fields!');
        e.preventDefault();
    }
    if (typeof inputs[0].value !== "string" || typeof inputs[1].value !== "string") {
        alert('Please enter a valid name!');
        e.preventDefault();
    }
    if (isNaN(Number(inputs[2].value)) || isNaN(Number(inputs[3].value))) {
        alert('Please enter a valid number!');
        e.preventDefault();
    }
}
function prepRequirements(inputs) {
    const display = document.getElementById('faultyItems');
    const h2Status = document.getElementById('launchStatus');
    const liPilot = document.getElementById('pilotStatus');
    const liCoPilot = document.getElementById('copilotStatus');
    const liFuel = document.getElementById('fuelStatus');
    const liMass = document.getElementById('cargoStatus');
    if (display && h2Status && liPilot && liCoPilot && liFuel && liMass) {
        h2Status.innerHTML = 'Shuttle is ready for launch.';
        h2Status.style.color = 'green';
        display.style.visibility = 'hidden';
        liPilot.innerHTML = `Pilot ${inputs[0].value} is ready for launch.`;
        liCoPilot.innerHTML = `Co-pilot ${inputs[1].value} is ready for launch.`;
        liFuel.innerHTML = 'Fuel level high enough for launch.';
        liMass.innerHTML = 'Cargo mass low enough for launch.';
        if (inputs.every((item) => item.value !== "")) {
        }
        else {
            h2Status.innerHTML = 'Shuttle not ready for launch!';
            h2Status.style.color = 'red';
        }
        if (typeof inputs[0].value !== "string" || typeof inputs[1].value !== "string") {
            h2Status.innerHTML = 'Shuttle not ready for launch!';
            h2Status.style.color = 'red';
        }
        if (isNaN(Number(inputs[2].value)) || isNaN(Number(inputs[3].value))) {
            h2Status.innerHTML = 'Shuttle not ready for launch!';
            h2Status.style.color = 'red';
        }
        if (Number(inputs[2].value) < 10000) {
            display.style.visibility = 'visible';
            h2Status.innerHTML = 'Shuttle not ready for launch!';
            h2Status.style.color = 'red';
            liFuel.innerHTML = 'Fuel level too low for launch!';
        }
        if (Number(inputs[3].value) > 10000) {
            display.style.visibility = 'visible';
            h2Status.innerHTML = 'Shuttle not ready for launch!';
            h2Status.style.color = 'red';
            liMass.innerHTML = 'Shuttle mass too heavy for launch!';
        }
    }
    else {
        console.log('document elements not found!');
    }
}
function onSubmit() {
    const submit = document.getElementById('formSubmit');
    const inputs = Array.from(document.getElementsByTagName('input'));
    if (submit) {
        submit.addEventListener('click', (e) => {
            validateForm(e, inputs);
            prepRequirements(inputs);
        });
    }
    else {
        console.log('document elements not found!');
    }
}
function genesis() {
    showMission();
    onSubmit();
}
window.onload = genesis;
