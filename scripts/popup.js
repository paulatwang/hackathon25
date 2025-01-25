// popup.js (for popup UI)
document.addEventListener("DOMContentLoaded", function () {
    const imageSelector = document.getElementById("image-selector");

    // Listen for changes to the image selection
    imageSelector.addEventListener("change", function (event) {
        const selectedImage = event.target.value;

        // Save the selected image in chrome.storage
        chrome.storage.local.set({ selectedImage: selectedImage }, function () {
            console.log("Image selected: " + selectedImage);
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const aggressiveToggle = document.getElementById("aggressiveToggle");

    // Load the initial state of the toggle
    chrome.storage.local.get(["isAggressiveMode"], (result) => {
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