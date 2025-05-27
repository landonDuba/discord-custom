document.addEventListener("DOMContentLoaded", () => {
  const gifUpload = document.getElementById('gifUrl');
  const idUpload = document.getElementById('userId');
  const saveButton = document.getElementById('saveButton');
  
  saveButton.addEventListener('click', () => {
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
})


function clearFields() {
  document.getElementById("gifUrl").value = "";
  document.getElementById("userId").value = "";
}