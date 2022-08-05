const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require('path');
const app = express();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(process.env.FILE_UPLOAD_DESTINATION_PATH)
        // cb(null, "C:/Users/jxian01/Projects/CAA/virus_chk_pending");
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });
app.use(cors("*"));
app.use(express.json());

app.use(express.static(__dirname + '/dist/angular-trend-micro-poc'));
app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/angular-trend-micro-poc/index.html'));
});

app.post("/api/document-upload", upload.single("document"), function (req, res) {
    res.status(200).json({ "status": "ok" });
});

app.listen(process.env.PORT || 3200);
console.log("Listening: ", process.env.PORT || 3200);