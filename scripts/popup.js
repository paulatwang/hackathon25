
document.addEventListener("DOMContentLoaded", function () {

    // Array of plant images
    const plantImages = [
        'images/seed1.png', // Image 1
        'images/seed2.png', // Image 2
        'images/seed3.png',  // Image 4
        'images/seed4.png', // Image 3
    ];

    let currentIndex = 0; // Index to track current image

    // Function to update the plant image
    function updatePlantImage() {
        const plantImageElement = document.getElementById("plantImage");
        plantImageElement.src = plantImages[currentIndex];
        plantImageElement.alt = `Plant ${currentIndex + 1}`;
    }

    // Event listener for the Next button
    document.getElementById("nextButton").addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % plantImages.length; // Increment index and wrap around
        updatePlantImage();
    });

    // Event listener for the Previous button
    document.getElementById("prevButton").addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + plantImages.length) % plantImages.length; // Decrement index and wrap around
        updatePlantImage();
    });



    // Event listener for the Select Plant button
    let isPlantSelected = false;

    document.getElementById("selectPlantButton").addEventListener("click", function () {
        isPlantSelected = !isPlantSelected; // Toggle the selection state

        const plantImage = document.getElementById("plantImage");

        if (isPlantSelected) {
            // Change button color to red
            selectPlantButton.textContent = 'Selected';
            this.style.backgroundColor = "red";
            this.style.color = "white"; // Optional: change text color for better contrast

            // Disable carousel buttons
            document.getElementById("prevButton").disabled = true;
            document.getElementById("nextButton").disabled = true;

            // Add pulse animation class to the plant image
            plantImage.classList.add("pulse");

            // Remove pulse class after animation ends
            setTimeout(() => {
                plantImage.classList.remove("pulse");
            }, 500); // Duration of the pulse animation (in ms)
        } else {
            // Reset button color
            selectPlantButton.textContent = 'Select Seed';
            this.style.backgroundColor = "#FFD700"; // or your original color
            this.style.color = "black"; // Reset text color

            // Enable carousel buttons
            document.getElementById("prevButton").disabled = false;
            document.getElementById("nextButton").disabled = false;
        }
    });



    // Event listener for the Start Watering button
    document.getElementById("startWatering").addEventListener("click", function () {
        const sound = document.getElementById('splashSound');
        sound.currentTime = 0; // Rewind to start
        sound.play(); // Play sound
        // Hide the main container
        document.getElementById("mainContainer").style.display = "none";


        // Show the watering popup
        document.getElementById("wateringPopup").style.display = "block";
    });

    // Event listener for the Back button in the popup
    document.getElementById("wateringPopup").addEventListener("click", function (event) {
        if (event.target.id === "backButton") {
            // Show the main container again
            document.getElementById("mainContainer").style.display = "block";

            // Hide the watering popup
            document.getElementById("wateringPopup").style.display = "none";
        }
    });

});

