const express = require("express");
const bodyParser = require("body-parser");
const { server } = require("./config");
const { postSentimentAnalyzer } = require("./src/routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/sentiment", postSentimentAnalyzer);

app.listen(server.port, server.host, () => {
  console.log(`Sentiment app listening on port ${server.port}`);
});