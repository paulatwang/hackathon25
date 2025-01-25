// popup.js (for popup UI)

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


// Array of plant image options
const plantImages = [
    { id: "plant1", src: "images/plant1.png", alt: "Plant 1" },
    { id: "plant2", src: "images/plant2.png", alt: "Plant 2" },
    { id: "plant3", src: "images/plant3.png", alt: "Plant 3" }
];

// Carousel state
let currentIndex = 0;

// Get popup container and create elements
const container = document.body;
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.alignItems = "center";
container.style.justifyContent = "center";
container.style.gap = "10px";

// Create image element
const imageElement = document.createElement("img");
imageElement.style.width = "150px";
imageElement.style.height = "150px";
imageElement.style.borderRadius = "10px";
imageElement.style.border = "2px solid transparent";
imageElement.src = plantImages[currentIndex].src;
imageElement.alt = plantImages[currentIndex].alt;
container.appendChild(imageElement);

// Create navigation buttons
const buttonContainer = document.createElement("div");
buttonContainer.style.display = "flex";
buttonContainer.style.justifyContent = "space-between";
buttonContainer.style.gap = "10px";

const prevButton = document.createElement("button");
prevButton.textContent = "Previous";
prevButton.style.padding = "5px 10px";
prevButton.style.cursor = "pointer";
prevButton.disabled = currentIndex === 0; // Disable initially if at the first image
buttonContainer.appendChild(prevButton);

const nextButton = document.createElement("button");
nextButton.textContent = "Next";
nextButton.style.padding = "5px 10px";
nextButton.style.cursor = "pointer";
nextButton.disabled = currentIndex === plantImages.length - 1; // Disable if at the last image
buttonContainer.appendChild(nextButton);

container.appendChild(buttonContainer);

// Create "Select" button
const selectButton = document.createElement("button");
selectButton.textContent = "Select";
selectButton.style.padding = "10px 20px";
selectButton.style.backgroundColor = "#4CAF50";
selectButton.style.color = "white";
selectButton.style.border = "none";
selectButton.style.borderRadius = "5px";
selectButton.style.cursor = "pointer";
container.appendChild(selectButton);

// Event listeners for navigation buttons
prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateImage();
    }
});

nextButton.addEventListener("click", () => {
    if (currentIndex < plantImages.length - 1) {
        currentIndex++;
        updateImage();
    }
});

// Event listener for "Select" button
selectButton.addEventListener("click", () => {
    const selectedImage = plantImages[currentIndex].id;
    chrome.storage.local.set({ selectedImage: selectedImage }, function () {
        console.log(`Selected image saved: ${selectedImage}`);
    });

    // Notify the content script
    chrome.runtime.sendMessage({ message: "updatePlant", selectedImage: selectedImage });
});

// Function to update the displayed image and button states
function updateImage() {
    imageElement.src = plantImages[currentIndex].src;
    imageElement.alt = plantImages[currentIndex].alt;

    // Enable/disable navigation buttons based on current index
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === plantImages.length - 1;
}


