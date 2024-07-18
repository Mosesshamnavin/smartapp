const express = require("express");
const bodyParser = require("body-parser");
const { server } = require("./config");
const { postSentimentAnalyzer } = require("./src/routes");

const app = express();


app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.post("/api/sentiment", postSentimentAnalyzer);

app.post('/api/sentiment', (req, res) => {
  console.log(req.body);
  // ...
});

app.listen(server.port, server.host, () => {
  console.log(`Sentiment app listening on port ${server.port}`);
});
