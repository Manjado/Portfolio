import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import PortfolioCreateForm from '../components/portfolios/PortfolioCreateForm';
import { Row, Col } from 'reactstrap';

import withAuth from '../components/hoc/withAuth';
import { createPortfolio } from '../actions';

class PortfolioNew extends React.Component {
  state = {
    error: undefined
  };

  savePortfolio = portfolioData => {
    createPortfolio(portfolioData)
      .then(portfolio => {
        this.setState({ error: undefined });
      })
      .catch(err => this.setState({ error: err.message }));
  };

  render() {
    const { error } = this.state;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage
          className="portfolio-create-page"
          title="Create New Portfolio"
        >
          <Row>
            <Col md="6">
              <PortfolioCreateForm
                onSubmit={this.savePortfolio}
                error={error}
              />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth('siteOwner')(PortfolioNew);
