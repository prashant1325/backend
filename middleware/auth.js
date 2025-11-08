const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

function auth(req, res, next){
  const header = req.header('Authorization');
  if (!header) return res.status(401).json({msg:'No token'});
  const token = header.split(' ')[1];
  if(!token) return res.status(401).json({msg:'Invalid token'});
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch(err){
    return res.status(401).json({msg:'Token invalid'});
  }
}

function adminOnly(req, res, next){
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({msg:'Admin only'});
}

module.exports = { auth, adminOnly };
