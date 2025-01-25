// popup.js (for popup UI)
document.addEventListener("DOMContentLoaded", function () {
    const plantSelector = document.getElementById("plant-selector");
    const aggressiveToggle = document.getElementById("aggressiveToggle");

    // Listen for changes to the image selection
    plantSelector.addEventListener("change", function (event) {
        const selectedImage = event.target.value;

        // Save the selected image in chrome.storage
        chrome.storage.local.set({ selectedPlant: selectedImage }, function () {
            console.log("Image selected: " + selectedPlant);
        });
    });

    // // Save selected plant
    // plantSelector.addEventListener("change", () => {
    //     const selectedPlant = plantSelector.value;
    //     chrome.storage.local.set({ selectedPlant }, () => {
    //         console.log("Selected plant set to:", selectedPlant);
    //     });
    // });

    // const aggressiveToggle = document.getElementById("aggressiveToggle");

    // // Listen for changes to the image selection
    // imageSelector.addEventListener("change", function (event) {
    //     const selectedPlant = event.target.value;

    //     // Save the selected image in chrome.storage
    //     chrome.storage.local.set({ selectedPlant: selectedPlant }, function () {
    //         console.log("Plant selected: " + selectedPlant);
    //     });
    // });

    // Load the initial state of the toggle
    chrome.storage.local.get(["selectedPlant", "isAggressiveMode"], (result) => {
        imageSelector.value = result.selectedPlant || "plant1";
        aggressiveToggle.checked = result.isAggressiveMode || false;
    });

    // Listen for toggle changes
    aggressiveToggle.addEventListener("change", () => {
        const isAggressiveMode = aggressiveToggle.checked;
        chrome.storage.local.set({ isAggressiveMode }, () => {
            console.log("Aggressive Mode set to:", isAggressiveMode);
        });
    });
});