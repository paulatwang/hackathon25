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
