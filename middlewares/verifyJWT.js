const jwt = require('jsonwebtoken');
require('dotenv').config();
verifyToken = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  let token = auth?.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).send(error);
  }
};

module.exports = verifyToken;