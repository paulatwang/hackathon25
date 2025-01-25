// PLANT

// Set plant position
function setPosition(element, ratio = 0.1) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Calculate the position based on the ratio
    const rightMargin = screenWidth * ratio; // e.g., 10% of the screen width
    const bottomMargin = screenHeight * ratio;

    element.style.position = 'absolute';
    element.style.right = `${rightMargin}px`;
    element.style.bottom = `${bottomMargin}px`;
}

// Show plant
function onload() {
    const plant = document.createElement("div");
    plant.classList.add("plant");

    // Check if there is a selected image option from the storage mechanism
    chrome.storage.local.get(["selectedPlant"], function (result) {
        // Get the selected image option from the storage mechanism
        let { selectedPlant } = result;
        console.log("Selected image: " + selectedPlant);

        // If no image selected, set a default
        if (!selectedPlant) {
            selectedPlant = "plant1.pot";
            console.log("No image selected. Defaulting to: " + selectedPlant);
        }

        // Split the selectedPlant string into plant type and growth stage
        const [plantType, plantStage] = selectedPlant.split('.');

        // Add the plant class and type to the plant element
        plant.classList.add(plantType); // e.g., plant1, plant2, etc.
        plant.classList.add(plantStage); // e.g., pot, sprout1, sprout2, etc.
    });

    document.body.appendChild(plant);
    const plantElement = document.querySelector(".plant");
    // Set the initial random position for the plant
    setPosition(plantElement);
}

// Listen for hydration reminders from background.js
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "hydrationReminder") {
        // Create a text box element when the alarm triggers
        const reminderBox = document.createElement("div");
        reminderBox.classList.add("hydration-reminder");

        // Add some content to the text box
        reminderBox.innerHTML = `
            <h3>I'm Parched!</h3>
            <p>Hydrate yourself to hydrate me!</p>
        `;

        // Append the reminder box to the body
        document.body.appendChild(reminderBox);

        // Set a timer to remove the reminder box after a few seconds
        setTimeout(() => {
            document.body.removeChild(reminderBox);
        }, 10000);  // Remove after 10 seconds
    }
});


// Listen for messages from the popup script
// chrome.runtime.onMessage.addListener(function (request, sendResponse) {
//     if (request.message === "updatePlant") {
//         console.log(`Message: ${request.message}`);
//         updatePlant();
//         sendResponse({ status: "Image update success" });
//     }
// });

// function updatePlant() {
//     // Get the selected image option from the storage mechanism
//     chrome.storage.local.get(["selectedPlant", "plantState"], function (result) {
//         // Get the selected image option from the storage mechanism
//         const { selectedPlant = "plant1", plantState = "pot" } = result;
//         console.log(`Selected plant: ${selectedPlant}, Plant state: ${plantState}`);

//         // Get the plant element
//         const plant = document.querySelector(".plant");

//         // // Remove all classes from the plant element
//         // plant.classList.remove(...plant.classList);

//         // Add the plant class and the selected image class to the plant element
//         plant.className = `plant ${selectedPlant} ${plantState}`;
//     });
// }


// if (request.action === "aggressiveReminder") {
//     // Handle aggressive mode behavior
//     triggerAggressiveMode();
//     sendResponse({ status: "Aggressive mode triggered" });
// }
// // Function to trigger aggressive mode behavior
// function triggerAggressiveMode() {
//     const plant = document.querySelector(".plant");
//     if (plant) {
//         // Make the plant very big
//         plant.style.transform = "scale(3)"; // Increase the size by 3x
//         plant.style.transition = "transform 0.5s ease"; // Smooth transition

//         // Revert to normal size after a delay
//         setTimeout(() => {
//             plant.style.transform = "scale(1)"; // Back to normal size
//         }, 5000); // 5 seconds delay
//     }
// }



// WATER CONSUMPTION
// let totalWater = 0;

// // Initializes chrome.storage totalWater 
// document.addEventListener("DOMContentLoaded", function () {
//     chrome.storage.local.get(["totalWater"], function (result) {
//         // if total is NaN, initializes to 0
//         if (result.totalWater == undefined) {
//             chrome.storage.local.set({ totalWater: 0 });

//             let midnight = new Date(); midnight.setHours(24, 0, 0, 0);
//         } else {
//             totalWater = result.totalWater;
//         }

//         document.getElementById("totalWater").textContent = totalWater.toFixed(1);
//     })
// })

// // Drink button
// document.getElementById("drinkButton").addEventListener("click", function () {
//     let inputWater = parseFloat(document.getElementById("waterIn").value);

//     if (!isNaN(inputWater)) {
//         totalWater += inputWater;

//         chrome.storage.local.set({ totalWater: totalWater }); // save totalWater to chrome storage
//         document.getElementById("totalWater").textContent = totalWater.toFixed(1); // update displayed water
//         document.getElementById("waterIn").value = ""; // clear input value
//     }
// });

// TODO: ADD SKIP BUTTON



