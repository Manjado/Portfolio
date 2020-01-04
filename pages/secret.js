import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

class Secret extends React.Component {
  renderSecretPage() {
      const { isAuthenticated } = this.props.auth;

      if (isAuthenticated) {
        return (
            <BaseLayout {...this.props.auth}>
              <BasePage>
                <h1> I am Secret Page </h1>
              </BasePage>
            </BaseLayout>
          )
      } else {
        return (
            <BaseLayout {...this.props.auth}>
              <BasePage>
                <h1> You are not authenticated. Please login to acess this page </h1>
              </BasePage>
            </BaseLayout>
          )
      }
  }
  render() {

    return this.renderSecretPage();
  }
}

export default Secret;
