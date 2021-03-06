import React, { Fragment } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import { Link, Router } from "../routes";
import PortfolioCard from "../components/portfolios/PortfolioCard";

import { getPortfolios, deletePortfolio } from "../actions";

import { Col, Row, Button } from "reactstrap";

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

  navigateToEdit(portfolioId, e) {
    e.stopPropagation();
    Router.pushRoute(`/portfolio/${portfolioId}/edit`);
  }

  displayDeleteWarning(portfolioId, e) {
    e.stopPropagation();
    const isConfirm = confirm(
      "Are you sure you want to delete this portfolio?"
    );

    if (isConfirm) {
      this.deletePortfolio(portfolioId);
    }
  }

  deletePortfolio(portfolioId) {
    deletePortfolio(portfolioId)
      .then(() => {
        Router.pushRoute("/portfolios");
      })
      .catch(err => console.error(err));
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
          <PortfolioCard portfolio={portfolio}>
            {isAuthenticated && isSiteOwner && (
              <div>
                <Button
                  onClick={e => this.navigateToEdit(portfolio._id, e)}
                  color="warning"
                >
                  Edit
                </Button>{" "}
                <Button
                  onClick={e => this.displayDeleteWarning(portfolio._id, e)}
                  color="danger"
                >
                  Delete
                </Button>
              </div>
            )}
          </PortfolioCard>
        </Col>
      );
    });
  }

  render() {
    const { portfolios } = this.props;
    const { isAuthenticated, isSiteOwner } = this.props.auth;

    return (
      <BaseLayout
        canonical="/portfolios" //e.g info to se where is proper content.
        //in the case of content duplication
        title="Michał Alchimowicz - Lear About my Experience"
        {...this.props.auth}
      >
        <BasePage className="portfolio-page" title="Portfolios">
          {isAuthenticated && isSiteOwner && (
            <Button
              onClick={() => Router.pushRoute("/portfolios/new")}
              color="success"
              className="create-port-btn"
            >
              Create Portfolio
            </Button>
          )}
          <Row>{this.renderPortfolios(portfolios)}</Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Portfolios;
