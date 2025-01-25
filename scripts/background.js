// Initialize the extension
let isAggressiveMode = false;

// * Initialize hydration data when the extension is installed
chrome.runtime.onInstalled.addListener(async () => {
    console.log("Plant Extension Installed");

    // Set default values if not already set
    const data = await chrome.storage.local.get(["totalWater", "plantState"]);
    if (!data.totalWater) {
        await chrome.storage.local.set({
            totalWater: { timesDrank: 0, totalWaterDrank: 0 },
        });
    }
    if (!data.plantState) {
        await chrome.storage.local.set({ plantState: "seed" });
    }
});

// * Set reminders based on user-defined frequency
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "setHydrationReminder") {
        const { frequency } = request.goals;

        // Clear existing alarms
        chrome.alarms.clearAll(() => {
            console.log("Existing alarms cleared.");

            // Create a new hydration reminder alarm
            chrome.alarms.create("hydrationReminder", { periodInMinutes: frequency });
            console.log(`Hydration reminder set for every ${frequency} minutes.`);
        });

        sendResponse({ status: "success" });
    }
});

// * Handle alarms for hydration reminders
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "hydrationReminder") {
        chrome.notifications.create({
            type: "basic",
            iconUrl: "icon.png",
            title: "Time to Drink Water!",
            message: "Stay hydrated and help your plant grow!",
        });

        // Notify content.js only if aggressive mode is enabled
        chrome.storage.local.get(["isAggressiveMode"], (result) => {
            if (result.isAggressiveMode) {
                chrome.runtime.sendMessage({ action: "aggressiveReminder" });
            }
        });
    }
});


// * Update progress and plant state when the user drinks water
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "drinkWater") {
        const amount = request.amount;

        chrome.storage.local.get(["hydrationData", "hydrationGoals"], (data) => {
            const hydrationData = data.hydrationData || { timesDrank: 0, totalWaterDrank: 0 };
            hydrationData.timesDrank += 1;
            hydrationData.totalWaterDrank += amount;

            chrome.storage.local.set({ hydrationData }, () => {
                // Update the plant state based on progress
                const { dailyGoal } = data.hydrationGoals || { dailyGoal: 2000 };
                const progress = hydrationData.totalWaterDrank / dailyGoal;

                let newPlantState = "seed";
                if (progress >= 1) newPlantState = "full-plant";
                else if (progress >= 0.5) newPlantState = "small-plant";
                else if (progress >= 0.25) newPlantState = "sprout";

                chrome.storage.local.set({ plantState: newPlantState }, () => {
                    console.log("Plant state updated to:", newPlantState);
                });

                sendResponse({ status: "success", hydrationData, newPlantState });
            });
        });

        return true; // Keep the messaging channel open for async response
    }
});

// Reset reminders and tracking on browser startup
chrome.runtime.onStartup.addListener(async () => {
    console.log("Browser started. Resetting reminders.");
    const data = await chrome.storage.local.get("hydrationGoals");
    if (data.hydrationGoals) {
        const { frequency } = data.hydrationGoals;
        chrome.alarms.clearAll(() => {
            chrome.alarms.create("hydrationReminder", { periodInMinutes: frequency });
            console.log(`Hydration reminder reset for every ${frequency} minutes.`);
        });
    }
});
