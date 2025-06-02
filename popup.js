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

  const color1 = document.getElementById('color1');
  const color1SaveButton = document.getElementById('saveColor1');
  const color2 = document.getElementById('color2');
  const color2SaveButton = document.getElementById('saveColor2');

  const setTheme = document.getElementById('setTheme');
  const removeTheme = document.getElementById('removeTheme');



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


  color1SaveButton.addEventListener("click", () => {
    const value = color1.value;
    console.log("value of color 1: " + value);

    chrome.storage.local.set({
          'color1' : value
        }).then(() => {
          document.getElementById('color1Status').textContent = "Color 1 Saved";
        })


  })


  color2SaveButton.addEventListener("click", () => {
  const value = color2.value;
  console.log("value of color 2: " + value);

  chrome.storage.local.set({
          'color2' : value
        }).then(() => {
          document.getElementById('color2Status').textContent = "Color 2 Saved";
        })
})


  setTheme.addEventListener('click', () => {
    chrome.storage.local.set({
          'setTheme' : true
        })
    document.getElementById('themeStatus').textContent = "Theme Set";
  });


  removeTheme.addEventListener("click", () => {
    chrome.storage.local.set({
          'setTheme' : false
        })
    document.getElementById('themeStatus').textContent = "Theme Removed";
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