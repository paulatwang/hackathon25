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
    chrome.storage.local.get(["selectedImage"], function (result) {
        // Get the selected image option from the storage mechanism
        const { selectedImage } = result;
        console.log("Selected image: " + selectedImage);

        // Get the plant element
        const plant = document.querySelector(".plant");

        // Remove all classes from the plant element
        plant.classList.remove(...plant.classList);

        // Add the plant class and the selected image class to the plant element
        plant.classList.add("plant", selectedImage);
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
    chrome.storage.local.get(["selectedImage"], function (result) {
        // Get the selected image option from the storage mechanism
        let { selectedImage } = result;
        console.log("Selected image: " + selectedImage);

        // If no image selected, set a default
        if (!selectedImage) {
            selectedImage = "plant1";
            console.log("No image selected. Defaulting to: " + selectedImage);
        }

        // Add the plant class and the selected image class to the plant element
        plant.classList.add("plant", selectedImage);
    });

    document.body.appendChild(plant);
    const plantElement = document.querySelector(".plant");
    // Set the initial random position for the plant
    setPosition(plantElement);

}


