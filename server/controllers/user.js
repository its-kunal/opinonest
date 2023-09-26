const { verify } = require("jsonwebtoken");

const verifyMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized, No token defined" });
  }
  delete req.body.username;
  const token = authHeader.split(" ")[1];
  verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized, Invalid token" });
    }
    let username = decoded.username;
    req.headers = { ...req.headers, username };
    next();
  });
};

module.exports = { verifyMiddleware };
