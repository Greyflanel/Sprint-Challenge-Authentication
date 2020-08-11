require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtKey =
  process.env.JWT_SECRET ||
  'add a .env file to root of project with the JWT_SECRET variable';


module.exports = {
  authenticate, 
};

function authenticate(req, res, next) {
  const token = req.get('Authorization');
  const secret = jwtKey 

  if (token) {
    console.log(token);
    
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}
