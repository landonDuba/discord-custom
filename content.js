console.log("Content script loaded!");

// CONFIGURATION
const YOUR_USER_ID = "1234248313432182844"; // Replace with your ID from the URL
const YOUR_GIF_URL = "https://media.giphy.com/media/r0vMIQG66Y6x5P5FYs/giphy.gif";

function changeProfilePictures() {
  // Find all avatar images
  const avatars = document.querySelectorAll('img[class*="avatar"], img[src*="cdn.discordapp.com/avatars"]');
  
  avatars.forEach(avatar => {
    // Skip if already modified
    if (avatar.src === YOUR_GIF_URL) return;
    
    // Check if avatar URL contains your user ID
    if (avatar.src.includes(`/avatars/${YOUR_USER_ID}/`)) {
      avatar.src = YOUR_GIF_URL;
      console.log("Updated your profile picture");
    }
  });
}

// Run immediately and set up observer
function init() {
  changeProfilePictures();
  
  // Efficient MutationObserver (only checks added nodes)
  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length) {
        changeProfilePictures();
        break;
      }
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Start with delay to allow DOM load
setTimeout(init, 2000);