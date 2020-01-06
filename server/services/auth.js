const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// MIDDLEWARE
exports.checkJWT = jwt({ secret: jwksRsa.expressJwtSecret({
    cache: true,
    jwksUri: 'https://manjado.auth0.com/.well-known/jwks.json',
    rateLimit: true,
    jwksRequestsPerMinute: 15
  }),
audience: 'VSrdZd7W3m1hn5Bp2JABIU6bn7Bul0IW',
issuer: 'https://manjado.auth0.com/',
algorithms: ['RS256']
})