const express = require('express');
const multer = require('multer');
const path = require('path');
const cors= require('cors')
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;


// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));  // access all file in public folder


// File upload folder
const UPLOADS_FOLDER = "./upload_images/";



// define the storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    console.log('file-server', file)
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();

    cb(null, fileName + fileExt);
  },
});

const upload = multer({ storage });



//router start

//get the html file
app.get('/', (req,res)=>{
  res.sendFile(__dirname + '/public/index.html');
})



// upload images routes
app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file)
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    return res.status(200).json({ message: 'Image uploaded successfully' });
});


// default error handler
app.use((err, req, res, next) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        res.status(500).send("There was an upload error!");
      } else {
        res.status(500).send(err.message);
      }
    } else {
      res.send("success");
    }
  });


// server lister 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
