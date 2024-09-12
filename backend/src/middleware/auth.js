const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.jwt_secret;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    console.log('no token provided')
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; 
    next(); 
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const checkAdmin = (req, res, next) => {
  if (req.user && req.user.isadmin) {
    next();
  } else {
    return res.status(403).json({ message: 'Admin access required' });
  }
};

module.exports = {
  checkAdmin,
  verifyToken
};
