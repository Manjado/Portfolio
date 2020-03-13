import React, { Fragment } from "react";
import Header from "../shared/Header";
import Head from "next/head";

const BaseLayout = props => {
  const {
    className,
    children,
    isAuthenticated,
    user,
    headerType = "default",
    isSiteOwner
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
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="layout-container">
        {
          <Header
            className={`port-nav-${headerType}`}
            isAuthenticated={isAuthenticated}
            user={user}
            isSiteOwner={isSiteOwner}
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
