console.log("Content script loaded!");

// CONFIGURATION
//REMOVE BEFORE RELEASE: 1234248313432182844
const YOUR_USER_ID = "1234248313432182844"; // Replace with your ID from the URL
// https://media.giphy.com/media/r0vMIQG66Y6x5P5FYs/giphy.gif
let YOUR_GIF_URL = "";


async function getGifUrl() {
  const result = await chrome.storage.local.get(["gif"]);
  console.log("THE GIF URL IS", result.gif);
  return result.gif;
}

async function getId() {
  const id = await chrome.storage.local.get(["userId"]);
  console.log("THE ID IS", id.userId);
  return id.userId;
}


async function getName() {
  const name = await chrome.storage.local.get(["name"]);
  console.log("THE NAME IS", name.name);
  return name.name;
}


async function getBanner() {
  const banner = await chrome.storage.local.get(["banner"]);
  console.log("THE banner IS", banner.banner);
  return banner.banner;
}


async function changeProfilePictures() {
  const gifUrl = await getGifUrl();
  const idNum = await getId();
  const username = await getName();
  const bannerUrl = await getBanner();
  //console.log("THE URL IS" + gifUrl);
  //console.log("THE ID IS" + idNum);

  /*
  For future decoration implemenation
  const decoration = document.createElement("img");
  decoration.className = "avatarDecoration_c19a55";
  decoration.src = "https://cdn.discordapp.com/avatar-decoration-presets/a_44d96dca4f514777925f23d841f36fac.png?size=300&passthrough=false";
  */

  const avatars = document.querySelectorAll('img[class*="avatar"], img[src*="cdn.discordapp.com/avatars"]');
  console.log("Found avatars:", avatars.length);

  avatars.forEach(avatar => {
    if (avatar.src === gifUrl) return;

    if (avatar.src.includes(`/avatars/${idNum}/`)) { //SWITCH TO idNum once have sol
      console.log("Updating avatar to", gifUrl);
      avatar.src = gifUrl;
    }
  });
  

  /*
  For possible banner implemntation - missing unique identifier
  const bannerDiv = document.querySelector('.banner__68edb');
  console.log("Updating banner to", gifUrl);
  bannerDiv.style.backgroundImage = "url(https://i.imgur.com/2sSL9dy.jpeg)";
  */

  /*
  Testing for banner implentation by using username
  */
  const profilePopout = document.querySelector(`div[aria-label="${username}"]`);
  const bannerDiv = profilePopout.querySelector(".banner__68edb");
  bannerDiv.style.backgroundImage = `url(${bannerUrl})`;

  /*
  Code for the popout theme
  
  const popoutWhole = document.querySelector(".outer_c0bea0 ");
  popoutWhole.className = "outer_c0bea0 theme-dark images-dark user-profile-popout custom-theme-background custom-user-profile-theme";
  popoutWhole.style = "--profile-gradient-primary-color: rgb(64, 233, 126); --profile-gradient-secondary-color: hsla(203, 60%, 47.1%, 1); --profile-gradient-overlay-color: #00000099; --profile-gradient-button-color: hsla(201, 100%, 16.1%, 1); --theme-base-color-light-hsl: 203.5294117647059 100% 90%; --theme-base-color-light: rgb(204,235,255); --theme-text-color-light: rgb(0,82,128); --theme-base-color-dark-hsl: 203.07692307692307 100% 5.098039215686274%; --theme-base-color-dark: rgb(0,16,26); --theme-text-color-dark: rgb(153,215,255); --theme-base-color-amount: 50%; --theme-text-color-amount: 25%; --bg-overlay-selected: unset; --bg-overlay-hover: unset; --bg-overlay-active: unset;";
  */
 
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

