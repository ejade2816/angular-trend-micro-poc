const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require('path');
const app = express();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.FILE_UPLOAD_DESTINATION_PATH);
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.originalname);
    },
});

app.use(cors("*"));
app.use(express.json());

app.get("/api/hello", function(req, res) {
    console.log("/api/hello")
    res.status(200).json({ "status": "ok" });
})

const upload = multer({ storage: storage });
app.post("/api/document-upload", upload.single("document"), function (req, res) {
    console.log("/api/document-upload")
    res.status(200).json({ "status": "ok" });
});

app.use(express.static(__dirname + '/dist/angular-trend-micro-poc'));
app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/angular-trend-micro-poc/index.html'));
});

app.listen(process.env.PORT || 3200);
console.log("Listening: ", process.env.PORT || 3200);