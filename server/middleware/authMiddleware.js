const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Часто спочатку пишуть тип токена (Bearer) потім сам токен
    if (!token) {
      return res.status(401).json({ message: "User do't authorizated" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "User do't authorizated" });
  }
};
