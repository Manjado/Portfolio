import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import { Col, Row } from "reactstrap";

class About extends React.Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="about-page">
          <Row className="left-side">
            <Col md="6">
              <div className="left-side">
                <h1 className="title fadein">Hello, Welcome</h1>
                <h4 className="subtitle fadein">To About Page</h4>
                <p className="subsubTitle fadein">
                  Fell free to read short description about me
                </p>
              </div>
            </Col>
            <Col md="6">
              <div className="fadein">
                <p>
                  My name is Michał Alchimowicz I am an experienced software
                  enginner and freelance developer
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  egestas elit at ex fringilla accumsan. Donec vitae vulputate
                  orci. Nunc vel efficitur nibh. Curabitur hendrerit orci ac
                  suscipit viverra. Donec a nunc diam. Vivamus et felis tellus.
                  Maecenas ac sagittis ipsum, id sodales mauris. Vivamus maximus
                  sagittis rutrum.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  egestas elit at ex fringilla accumsan. Donec vitae vulputate
                  orci. Nunc vel efficitur nibh. Curabitur hendrerit orci ac
                  suscipit viverra. Donec a nunc diam. Vivamus et felis tellus.
                  Maecenas ac sagittis ipsum, id sodales mauris. Vivamus maximus
                  sagittis rutrum.{" "}
                </p>
              </div>
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default About;
