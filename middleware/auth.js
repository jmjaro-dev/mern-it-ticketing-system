const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if token exists
  if(!token) {
    return res.status(401).json({ msg: 'No token, Authorization Denied' });
  }

  try {
    // Verify token if valid
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Give user acces on protected routes
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token.' });
  }
}