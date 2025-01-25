// PLANT

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(
        sender.tab
            ? "from a content script:" + sender.tab.url
            : "from the extension"
    );
    if (request.message === "updatePlant") {
        console.log(`Message: ${request.message}`);
        updatePlant();
        sendResponse({ status: "Image update success" });
    }
});

function updatePlant() {
    // Get the selected image option from the storage mechanism
    chrome.storage.local.get(["plantState"], function (result) {
        // Get the selected image option from the storage mechanism
        const { plantState } = result;
        console.log("Selected image: " + plantState);

        // Get the plant element
        const plant = document.querySelector(".plant");

        // Remove all classes from the plant element
        plant.classList.remove(...plant.classList);

        // Add the plant class and the selected image class to the plant element
        plant.classList.add("plant", plantState);
    });
}

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
    chrome.storage.local.get(["plantState"], function (result) {
        // Get the selected image option from the storage mechanism
        let { plantState } = result;
        console.log("Selected image: " + plantState);

        // If no image selected, set a default
        if (!plantState) {
            plantState = "plant1";
            console.log("No image selected. Defaulting to: " + plantState);
        }

        // Add the plant class and the selected image class to the plant element
        plant.classList.add("plant", plantState);
    });

    document.body.appendChild(plant);
    const plantElement = document.querySelector(".plant");
    // Set the initial random position for the plant
    setPosition(plantElement);

}

// WATER CONSUMPTION
let totalWater = 0;

// Initializes chrome.storage totalWater 
document.addEventListener("DOMContentLoaded", function () {
    chrome.storage.local.get(["totalWater"], function (result) {
        // if total is NaN, initializes to 0
        if (result.totalWater == undefined) {
            chrome.storage.local.set({ totalWater: 0 });

            let midnight = new Date(); midnight.setHours(24, 0, 0, 0);
        } else {
            totalWater = result.totalWater;
        }

        document.getElementById("totalWater").textContent = totalWater.toFixed(1);
    })
})

// Drink button
document.getElementById("drinkButton").addEventListener("click", function () {
    let inputWater = parseFloat(document.getElementById("waterIn").value);

    if (!isNaN(inputWater)) {
        totalWater += inputWater;

        chrome.storage.local.set({ totalWater: totalWater }); // save totalWater to chrome storage
        document.getElementById("totalWater").textContent = totalWater.toFixed(1); // update displayed water
        document.getElementById("waterIn").value = ""; // clear input value
    }
});

// TODO: ADD SKIP BUTTON

function resetNewDay() {
    let now = new Date();
    let midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    let timeTOMidnight = midnight - now;
    setTimeout(() => {
        totalWater = 0;

        chrome.storage.local.set({ totalWater: totalWater }); //reset totalWater in chrome storage
        document.getElementById("totalWater").textContent = totalWater.toFixed(1);
        resetNewDay(); //call again for next day
    }, timeTOMidnight);
}

resetNewDay();


