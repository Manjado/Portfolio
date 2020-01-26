const Portfolio = require('../models/portfolio');

exports.getPortfolios = (req, res) => {
  Portfolio.find({}, (err, allPortfolios) => {
    if (err) {
      return res.status(422).send(err);
    }

    return res.json(allPortfolios);
  });
};

exports.savePortfolio = (req, res) => {
  const portfolioData = req.body;
  const userId = req.user && req.user.sub;
  const portfolio = new Portfolio(portfolioData);
  portfolio.userId = userId;

  portfolio.save((err, createdPortfolio) => {
    if (err) {
      return res.status(422).send(err);
    }
    return res.json(createdPortfolio);
  });
};
