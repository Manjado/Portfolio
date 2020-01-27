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

router.patch(
  '/:id',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  portfolioCtr.updatePortfolio
);

router.delete(
  '/:id',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  portfolioCtr.deletePortfolio
);

module.exports = router;
