import React from 'react';
import BaseLayout from '../layouts/BaseLayout';
import BasePage from '../BasePage';

export default function(Component) {
    return class withAuth extends React.Component {
  
        static async getInitialProps(args) {
            const pageProps = await Component.getInitialProps && Component.getInitialProps(args);

            return { ...pageProps}
        }

        renderProtectedPage() {
            const { isAuthenticated } = this.props.auth;
      
            if (isAuthenticated) {
              return (
                <Component {...this.props} />
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
            //return <Component {...this.props}/>
            return this.renderProtectedPage();
        }
    }
}