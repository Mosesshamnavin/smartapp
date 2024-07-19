const express = require("express");
const bodyParser = require("body-parser");
const { server } = require("./config");
const { postSentimentAnalyzer, postFaceDetection2 } = require("./src/routes");
const cors = require('cors');
const multer = require('multer')
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/routes/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/sentiment", postSentimentAnalyzer);
app.post("/api/test",  upload.single('file'), postFaceDetection2);

app.listen(server.port, server.host, () => {
  console.log(`Sentiment app listening on port ${server.port}`);
});
