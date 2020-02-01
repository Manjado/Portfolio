import React, { Fragment } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Link, Router } from '../routes';


import { getPortfolios, deletePortfolio } from '../actions';

import {
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardTitle, 
  Button
} from 'reactstrap';

class Portfolios extends React.Component {
  static async getInitialProps({ req }) {
    let portfolios = [];

    try {
      portfolios = await getPortfolios(req);
    } catch (err) {
      console.error(err);
    }

    return { portfolios };
  }

  displayDeleteWarning(portfolioId) {
    const isConfirm = confirm('Are you sure you want to delete this portfolio?');
  
    if (isConfirm) {
      this.deletePortfolio(portfolioId);
    }
  
  }

  deletePortfolio(portfolioId) {
    deletePortfolio(portfolioId).then(() => {
      Router.pushRoute('/portfolios');
    }).catch(err => console.error(err));
  }

  renderPortfolios(portfolios) {
    const { isAuthenticated, isSiteOwner } = this.props.auth;
    return portfolios.map((portfolio, index) => {
      return (
        // <li key={index}>
        //   <Link as={`/portfolio/${post.id}`} href="/portfolio/[id]">
        //     <a style={{ fontSize: '20px' }}> {post.title} </a>
        //   </Link>
        // </li>
        <Col md="4" key={index}>
          <React.Fragment>
            <span>
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
                  <div className="readMore"> 
                  {isAuthenticated && isSiteOwner && <Fragment>
                    <Button onClick={() => Router.pushRoute(`/portfolio/${portfolio._id}/edit`)} color="warning">Edit</Button>{' '}
                    <Button onClick={() => this.displayDeleteWarning(portfolio._id)}color="danger">Delete</Button>
                  </Fragment>}
                  </div>
                </CardBody>
              </Card>
            </span>
          </React.Fragment>
        </Col>
      );
    });
  }

  render() {
    const { portfolios } = this.props;
    const { isAuthenticated, isSiteOwner } = this.props.auth;

    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-page" title="Portfolios">
          {isAuthenticated && isSiteOwner && <Button onClick={() =>  Router.pushRoute('/portfolioNew')} color="success" className="create-port-btn">Create Portfolio</Button>}
          <Row>{this.renderPortfolios(portfolios)}</Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Portfolios;
