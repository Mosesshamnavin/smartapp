const { InternalServerError, BadRequest } = require("http-errors");
const { SentimentManager } = require("node-nlp");

const sentiment = new SentimentManager();

module.exports = async (req, res, next) => {
  if (!req?.body?.phrase) {
    return next(
      new BadRequest(
        "Invalid payload. JSON payload must have 'phrase' property."
      )
    );
  }

  const { lang = "en", phrase } = req.body;

  try {
    const result = await sentiment.process(lang, phrase);
    const { score = 0, comparative = 0, vote = "positive", ...meta } = result;
    res.json({
      score: score * 100,
      comparative: comparative * 100,
      vote,
      ...meta,
    });
  } catch (error) {
    return next(new InternalServerError(error.message));
  }
};
