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
    chrome.storage.local.get(["plantType", "plantStage"], function (result) {
        // Get the selected image option from the storage mechanism
        let plantType = result.plantType;
        let plantStage = result.plantStage;
        console.log("Selected image: " + plantType);


        // Add the plant class and type to the plant element
        plant.classList.add(plantType); // e.g., plant1, plant2, etc.
        plant.classList.add(plantStage); // e.g., pot, sprout1, sprout2, etc.
    });

    document.body.appendChild(plant);
    const plantElement = document.querySelector(".plant");

    // Set the initial position for the plant
    setPosition(plantElement);
    const imageUrl = chrome.runtime.getURL("images/pot.png");

    console.log("Image Path: ", imageUrl);
    plantElement.style.backgroundImage = `url(${imageUrl})`;

}
window.addEventListener("load", onload);


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "timerSetOff") {
        console.log("timerSetOff event received in content.js");

        const reminderBox = document.createElement("div");
        reminderBox.classList.add("hydration-reminder");
        reminderBox.innerHTML = `
            <h3>I'm Parched!</h3>
            <p>Hydrate yourself to hydrate me!</p>
        `;

        document.body.appendChild(reminderBox);

        setTimeout(() => {
            document.body.removeChild(reminderBox);
        }, 10000);
    }
    return true;
});

window.addEventListener("load", onload);

function displayModal() {
    const modalStyle = document.createElement("style");
    modalStyle.innerHTML = `
    .modal-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      justify-content: center;
      align-items: center;
    }
    .modal {
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      width: 100%;
      text-align: center;
    }
    .modal-header {
      font-size: 18px;
      margin-bottom: 10px;
    }`;
    const modalDiv = document.createElement("div");
    modalDiv.classList.add("modal");
    `<div class="modal-header">Enter Your Input</div>
      <input type="text" id="userInput" placeholder="Type something..." style="width: 100%; padding: 10px; margin-bottom: 10px;">
      <div class="modal-footer">
        <button id="closeModalBtn">Submit</button>
      </div>`
    document.body.appendChild(reminderBox);

    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalOverlay = document.getElementById('modalOverlay');

    openModalBtn.addEventListener('click', () => {
        modalOverlay.style.display = 'flex';
    });

    closeModalBtn.addEventListener('click', () => {
        const userInput = document.getElementById('userInput').value;
        console.log('User Input:', userInput); // Do something with the input
        modalOverlay.style.display = 'none';
    });
}
// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(
        sender.tab
            ? "(Im content.js) from a content script:" + sender.tab.url
            : "(Im content.js) from the extension"
    );
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


