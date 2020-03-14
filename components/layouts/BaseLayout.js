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
    isSiteOwner,
    title,
    cannonical
  } = props;

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="My name is Michał Alchimowicz and I am an experienced software engineer and freelance developer."
        />
        <meta
          name="keywords"
          content="alchimowicz portfolio, alchimowicz developer, alchimowicz freelancig, alchimowicz programming"
        />
        <meta
          property="og:title"
          content="Michał Alchimowicz - programmer, developer, bloger"
        />
        <meta property="og:locale" content="en_EU" />
        <meta property="og:url" content={`${process.env.BASE_URL}`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="My name is Michał Alchimowicz  and I am an experienced software engineer and freelance developer."
        />
        <link
          rel="stylesheet"
          href="//use.fontawesome.com/releases/v5.0.7/css/all.css"
          crossOrigin="anonymus"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
        {cannonical && (
          <link
            rel="cannonical"
            href={`${process.env.BASE_URL}${cannonical}`}
          />
        )}
        <link rel="icon" type="image/ico" href="/static/favicon.ico" />
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
