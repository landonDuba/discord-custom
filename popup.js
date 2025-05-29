document.addEventListener("DOMContentLoaded", () => {
  const gifUpload = document.getElementById('gifUrl');
  const idUpload = document.getElementById('userId');
  //const updateButton = document.getElementById('updateButton');
  const saveIdButton = document.getElementById('saveId');
  const saveGifButton = document.getElementById('saveGif');

  const nameUpload = document.getElementById('nameInput');
  const bannerUpload = document.getElementById('bannerInput');
  const saveNameButton = document.getElementById('saveName');
  const saveBannerButton = document.getElementById('saveBanner');


  saveIdButton.addEventListener('click', () => {
    const id = idUpload.value.trim();

    if (!id){
      alert("Please enter an ID");
    }
    else {
      chrome.storage.local.set({
        'userId' : id
      }).then(() => {
        console.log("ID Set");
      })

      clearId();     
      document.getElementById('idStatus').textContent = "Saved ID!";
    }
  })


  saveGifButton.addEventListener('click', () => {
    const gif = gifUpload.value.trim();

    if (!gif){
      alert("Please enter a GIF");
    }
    else {
      chrome.storage.local.set({
        'gif' : gif
      }).then(() => {
        console.log("GIF Set");
      })

      clearGif();
      document.getElementById('gifStatus').textContent = "Saved Gif!";
    }
  })


  saveNameButton.addEventListener('click', () => {
    const name = nameUpload.value.trim();

    if (!name){
      alert("Please enter a name");
    }
    else {
      chrome.storage.local.set({
        'name' : name
      }).then(() => {
        console.log("Name Set");
      })

      clearId();     
      document.getElementById('nameStatus').textContent = "Saved Name!";
    }
  })


  saveBannerButton.addEventListener('click', () => {
    const banner = bannerUpload.value.trim();

    if (!banner){
      alert("Please enter a GIF URL");
    }
    else {
      chrome.storage.local.set({
        'banner' : banner
      }).then(() => {
        console.log("Banner Set");
      })

      clearId();     
      document.getElementById('bannerStatus').textContent = "Saved GIF!";
    }
  })
  
  /*
  Old event listener for when events were not updated individually
  updateButton.addEventListener('click', () => {
    const id = idUpload.value.trim();
    const gif = gifUpload.value.trim();
    console.log("The ID is: " + id);
    console.log("The gif is: " + gif);

    clearFields();

    chrome.storage.local.set({
      'userId' : id,
      'gif' : gif
    }).then(() => {
      console.log("Values set");
    });
  })

  */

})



function clearGif() {
  document.getElementById("gifUrl").value = "";
}

function clearId() {
  document.getElementById("userId").value = "";
}