const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    if (req.body.userId && userId !== req.body.userId) {
      res.status(403).json({ error: "Unauthorized request!" });
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: "Invalid Request!" });
  }
};
