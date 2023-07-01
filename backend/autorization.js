const jwt = require('jsonwebtoken');

const generateAccessToken = (data) => {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (token === null) return res.status(401).json({
      error: "Нет токена",
    });

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      console.log(err)

      if (err) return res.status(403).json({
        error: "Неверный токен или токен истек",
      });

      req.user = user

      next()
    })
  } catch (err) {
    next(err);
  }
}

module.exports = {
  generateAccessToken,
  authenticateToken
}