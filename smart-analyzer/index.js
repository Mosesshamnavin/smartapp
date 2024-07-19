const express = require("express");
const bodyParser = require("body-parser");
const { server } = require("./config");
const { postSentimentAnalyzer, postFaceDetection2 } = require("./src/routes");
const cors = require('cors');
const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/sentiment", postSentimentAnalyzer);
app.get("/api/test", postFaceDetection2);

app.listen(server.port, server.host, () => {
  console.log(`Sentiment app listening on port ${server.port}`);
});
