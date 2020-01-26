const express = require('express');
const router = express.Router();

const portfolioCtr = require('../controllers/portfolio');
// SERVICES
const authService = require('../services/auth');

router.post(
  '',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  portfolioCtr.savePortfolio
);

router.get(
  '',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  portfolioCtr.getPortfolios
);

module.exports = router;
