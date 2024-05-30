$('#uploadButton').on('click', function() {
    // Show loading screen
    $('#loadingScreen').show();
    
    var formData = new FormData();
    formData.append('image', $('#fileInput')[0].files[0]);

    $.ajax({
        method: 'POST',
        url: 'https://api.api-ninjas.com/v1/imagetotext',
        headers: {
            'X-Api-Key': 'nKh0AAEkt6LCza0zqtUv2A==3Z6RkeBcgLGKJn4Z'
        },
        data: formData,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false, 
        success: function(result) {
            var allText = "";
            result.forEach(function(data) {
                allText += data.text + " ";
            });
            $('#textContainer').text(allText.trim());
            
            // Hide loading screen
            $('#loadingScreen').hide();
        },
        error: function ajaxError(jqXHR, textStatus, errorThrown) {
            alert('Error: ' + jqXHR.responseText);
            
            // Hide loading screen in case of error
            $('#loadingScreen').hide();
        }
    });
});


const dropContainer = document.getElementById("dropcontainer")
const fileInput = document.getElementById("images")

dropContainer.addEventListener("dragover", (e) => {
  // prevent default to allow drop
  e.preventDefault()
}, false)

dropContainer.addEventListener("dragenter", () => {
  dropContainer.classList.add("drag-active")
})

dropContainer.addEventListener("dragleave", () => {
  dropContainer.classList.remove("drag-active")
})

dropContainer.addEventListener("drop", (e) => {
  e.preventDefault()
  dropContainer.classList.remove("drag-active")
  fileInput.files = e.dataTransfer.files
})