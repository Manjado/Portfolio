const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const namespace = 'http://localhost:3000/';
// MIDDLEWARE
exports.checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    jwksUri: 'https://manjado.auth0.com/.well-known/jwks.json',
    rateLimit: true,
    jwksRequestsPerMinute: 15
  }),
  audience: 'VSrdZd7W3m1hn5Bp2JABIU6bn7Bul0IW',
  issuer: 'https://manjado.auth0.com/',
  algorithms: ['RS256']
});

exports.checkRole = role => (req, res, next) => {
  const user = req.user;

  if (user && user[namespace + 'role'] === role) {
    next();
  } else {
    return res.status(401).send({
      title: 'Not Autorized',
      detail: 'You are not authorized to acces this data'
    });
  }
};
