import React, { Fragment } from "react";
import Header from "../shared/Header";
import Head from "next/head";

const BaseLayout = props => {
  const {
    className,
    children,
    isAuthenticated,
    user,
    headerType = "default"
  } = props;

  return (
    <Fragment>
      <Head>
        <title>Michał Alchimowicz</title>
        <link
          rel="stylesheet"
          href="//use.fontawesome.com/releases/v5.0.7/css/all.css"
          crossOrigin="anonymus"
        />
      </Head>
      <div className="layout-container">
        {
          <Header
            className={`port-nav-${headerType}`}
            isAuthenticated={isAuthenticated}
            user={user}
          />
        }
        <main className={`cover ${className}`}>
          <div className="wrapper">{children}</div>
        </main>
      </div>
    </Fragment>
  );
};

export default BaseLayout;
