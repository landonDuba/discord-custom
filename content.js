console.log("Content script loaded!");

// CONFIGURATION
//REMOVE BEFORE RELEASE: 1234248313432182844
const YOUR_USER_ID = "1234248313432182844"; // Replace with your ID from the URL
// https://media.giphy.com/media/r0vMIQG66Y6x5P5FYs/giphy.gif
let YOUR_GIF_URL = "";


async function getInfo() {
  const result = await chrome.storage.local.get(["gif"]);
  const id = await chrome.storage.local.get(["userId"]);
  console.log("THE ID IS", id.userId);
  console.log("THE GIF URL IS", result.gif);
  return result.gif;
}


async function changeProfilePictures() {
  const gifUrl = await getInfo();
  console.log("THE URL IS" + gifUrl);

  const avatars = document.querySelectorAll('img[class*="avatar"], img[src*="cdn.discordapp.com/avatars"]');
  console.log("Found avatars:", avatars.length);

  avatars.forEach(avatar => {
    if (avatar.src === gifUrl) return;

    if (avatar.src.includes(`/avatars/${YOUR_USER_ID}/`)) {
      console.log("Updating avatar to", gifUrl);
      avatar.src = gifUrl;
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

