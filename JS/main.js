const dropZone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const messageDiv = document.getElementById('message');



$(document).ready(function(){
    $('#navbar-toggle').click(function() {
        $('nav ul').slideToggle();
      });

      // Hamburger toggle
      $('#navbar-toggle').on('click', function() {
        this.classList.toggle('active');
      });
    

})




dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    handleFiles(files);
});

fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    handleFiles(files);
});

function handleFiles(files) {
    for (const file of files) {
        uploadFile(file);
    }
}

function uploadFile(file) {
    const formData = new FormData();
    formData.append('image', file);

    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
        messageDiv.textContent = data.message;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

