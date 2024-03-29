const dropZone = document.getElementById('drop-area');
const fileInput = document.getElementById('fileInput');
const messageDiv = document.getElementById('message');
const dropBox = document.getElementById('drop-box');



$(document).ready(function(){
    $('#navbar-toggle').click(function() {
        $('nav ul').slideToggle();
      });

      // Hamburger toggle
      $('#navbar-toggle').on('click', function() {
        this.classList.toggle('active');
      });
    
      $.ajax({
        url:"http://numbersapi.com/1/30/date?json",
        method:"GET",
        dataType:"json",
        success:function(data){
            // console.log(data)
            handleData(data);
        },
        error:function(jqHXR, textStatus, error){
            console.log("Error", textStatus, error)
        }
      })

      const handleData = (data)=>{
        $('#information').append(`
        <p>Text: ${data?.text}</p>
        <p>Type: ${data?.type}</p>
        <p>Number: ${data?.number}</p>
        <p>Years: ${data?.year}</p>
        <p>Found: ${data?.found}</p>
        
        `)
      }

      //about us section 

      aboutUs.forEach(about=>{
        $(".about-box").append(`
        <div class="about-card" style="--index:${about?.id}">
        <i class="${about.icon}"></i>
        <h4>${about.title}</h4>
        <p>${about.desc}</p>
      </div>
        `)
      })

      //Card group 
     services.forEach(service=>{
        $("#card-group").append(`
        <div class="card">
          <img src="${service?.image}" alt="Image">
          <div class="card-content">
            <h2>${service.title}</h2>
            <p>${service.desc}</p>
          </div>
        </div>
        `)
     });


     // show uploaded images
     $.ajax({
        url:"/getImages",
        method:"GET",
        dataType:"json",
        success: function(imagesFileName){
            // console.log(imagesFileName)
            $(".img-text").append(`
            <p>${imagesFileName.length >0 ? "Uploaded Images" :"Your don't have any uploaded images"}</p>
            `)
            imagesFileName.forEach(function(fileName){

                $('#gallery').append(`
                <img src="${fileName}"></img>
                `)

                // const img = document.createElement('img');
                // img.src =url;
                // $('#gallery').append(img);

            })
        },
        error: function (error) {
            console.error('Error fetching image file names:', error);
          }
     })

})


//toast show function

function showToast() {
    var toast = document.getElementById("toast");
    
    toast.style.display = "flex"; // Show the toast
    
    setTimeout(function () {
        toast.style.display = "none"; // Hide the toast after 2 seconds
    }, 2000);
}



// drag and drop start

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    console.log('dragover')
    dropBox.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', (e) => {
    console.log('drag Leave')
    e.preventDefault();
    dropBox.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    console.log('drop ')
    e.preventDefault();
    dropBox.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    handleFiles(files);
});

// console.log(fileInput)
fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    handleFiles(files);
});


// Additional event listeners for window to prevent file opening by browser
window.addEventListener('dragover', (e) => {
    e.preventDefault();
});

window.addEventListener('drop', (e) => {
    e.preventDefault();
});

document.addEventListener('dragenter', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

document.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
});


function handleFiles(files) {
    console.log('files',files);
    for (const file of files) {
        uploadFile(file);
    }
}

function uploadFile(file) {
    console.log("file-main", file)
    const formData = new FormData();
    formData.append('image', file);
    console.log('formData',formData)

    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
        messageDiv.textContent = data.message;
        console.log('data', data)
        showToast()
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


// show images from images_upload folder

// fetch('/getImages')
// .then(response => response.json())
// .then(imageUrls => {
//     console.log(imageUrls)
//   const container = document.getElementById('image-container');
//   imageUrls.forEach(url => {
//     const img = document.createElement('img');
//     img.src =url;
//     container.appendChild(img);
   
//   });
// });