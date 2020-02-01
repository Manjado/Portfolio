import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import PortfolioCreateForm from '../components/portfolios/PortfolioCreateForm';
import { Row, Col } from 'reactstrap';

import { updatePortfolio, getPortfolioById } from '../actions';

import withAuth from '../components/hoc/withAuth';
import { Router } from '../routes';

class PortfolioEdit extends React.Component {
  static async getInitialProps({ query }) {
    let portfolio = {};

    try {
      portfolio = await getPortfolioById(query.id);
    } catch (error) {
      console.error(error);
    }

    return { portfolio };
  }

  constructor(props) {
    super(props);
    this.state = {
      error: undefined
    };
  }

  updatePortfolio = (portfolioData, { setSubmitting }) => {
    setSubmitting(true);
    updatePortfolio(portfolioData)
      .then(portfolio => {
        setSubmitting(false);
        this.setState({ error: undefined });
        Router.pushRoute('/portfolios');
      })
      .catch(err => {
        const error = err.message || 'Server Error!';
        setSubmitting(false);
        this.setState({ error: error });
      });
  };

  render() {
    const { error } = this.state;
    const { portfolio } = this.props;
    console.log(portfolio,'portfolio')

    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-create-page" title="Update Portfolio">
          <Row>
            <Col md="6">
              <PortfolioCreateForm
                onSubmit={this.updatePortfolio}
                error={error}
                initialValues={portfolio}
              />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth('siteOwner')(PortfolioEdit);
