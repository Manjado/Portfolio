import React, { Component, Fragment } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardTitle,
  Button
} from "reactstrap";

import PortfolioCardDetail from "./PortfolioCardDetails";

class PortfolioCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { portfolio, children } = this.props;
    return (
      <span>
        <PortfolioCardDetail />
        <Card className="portfolio-card">
          <CardHeader className="portfolio-card-header">
            {portfolio.position}
          </CardHeader>
          <CardBody>
            <p className="portfolio-card-city"> {portfolio.location} </p>
            <CardTitle className="portfolio-card-title">
              {portfolio.title}
            </CardTitle>
            <CardText className="portfolio-card-text">
              {portfolio.description}
            </CardText>
            <div className="readMore">{children}</div>
          </CardBody>
        </Card>
      </span>
    );
  }
}

export default PortfolioCard;
