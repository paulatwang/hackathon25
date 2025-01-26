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

        // Get plant type by seed image index
        let userType = "plant1";
        switch (currentIndex) {
            case 0: userType = "plant1";
                break;
            case 1: userType = "plant2";
                break;
            case 2: userType = "plant3";
                break;
            case 3: userType = "plant4";
                break;
        }

        
        const freq = parseInt(document.getElementById("minutesInput").value);
        const goal = parseInt(document.getElementById("mLInput").value);

        if (isNaN(freq) || isNaN(goal)) {
            console.error("Invalid input: Please enter numeric values for frequency and water goal.");
            return;
        }

    
        // Send message to background.js
        chrome.runtime.sendMessage({
            action: "setUserInput",
            frequency: freq,
            waterGoal: goal,
            plantType: userType
        }, function (response) {

            console.log("Response from background:", response);
        });
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

    checkActiveSession();

});

document.addEventListener("DOMContentLoaded", function () {

    const currentScreen = localStorage.getItem("currentScreen") || "mainContainer"; 

    document.querySelectorAll(".container").forEach(container => {
        container.style.display = "none"; 
    });
    
    document.getElementById(currentScreen).style.display = "block";
 
    document.getElementById("startWatering").addEventListener("click", function () {
   
        localStorage.setItem("currentScreen", "wateringPopup");
        document.getElementById("mainContainer").style.display = "none";
        document.getElementById("wateringPopup").style.display = "block";
    });

 
    document.getElementById("backButton").addEventListener("click", function () {
      
    localStorage.setItem("currentScreen", "mainContainer");
        document.getElementById("mainContainer").style.display = "block";
    });
});
