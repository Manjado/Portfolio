import React from "react";
import Link from "next/link";
import ActiveLink from "../ActiveLink";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown
} from "reactstrap";
import { Link as NextLink } from "../../routes";

import auth0 from "../../services/auth0";

const BsNavLink = props => {
  const { route, title } = props;

  return (
    <ActiveLink activeClassName="active" route={route}>
      <a className="nav-link port-navbar-link"> {title} </a>
    </ActiveLink>
  );
};

const Login = () => {
  return (
    <span onClick={auth0.login} className="nav-link port-navbar-link">
      Login
    </span>
  );
};

const Logout = () => {
  return (
    <span onClick={auth0.logout} className="nav-link port-navbar-link">
      Logout
    </span>
  );
};

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      dropdownOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  toggleDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  renderBlogMenu() {
    const { isSiteOwner } = this.props;

    if (isSiteOwner) {
      return (
        <Dropdown
          nav
          isOpen={this.state.dropdownOpen}
          toggle={this.toggleDropdown}
          className="port-navbar-link"
        >
          <DropdownToggle nav caret>
            Blog
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <BsNavLink route="/blogs" title="Blogs" />
            </DropdownItem>
            <DropdownItem>
              <BsNavLink route="/blogs/new" title="Create a Blogs" />
            </DropdownItem>
            <DropdownItem>
              <BsNavLink route="/blogs/dashboard" title="Blogs Dashboard" />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }

    return (
      <NavItem className="port-navbar-item">
        <BsNavLink route="/blogs" title="Blog" />
      </NavItem>
    );
  }
  render() {
    const { isAuthenticated, user, className } = this.props;

    return (
      <div>
        <Navbar
          className={`port-navbar port-nav-base absolute ${className}`}
          color="transparent"
          dark
          expand="md"
        >
          <NavbarBrand className="port-navbar-brand" href="/">
            Michał Alchimowicz
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/" title="Home" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/about" title="About" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route="/portfolios" title="Portfolio" />
              </NavItem>
              {this.renderBlogMenu()}
              <NavItem className="port-navbar-item">
                <BsNavLink route="/cv" title="Cv" />
              </NavItem>
              {/* <NextLink route="test" params={{ id: '2' }}>
                Test 2
              </NextLink>
              <NextLink route="/test/5">Test 5</NextLink> */}
              {!isAuthenticated && (
                <NavItem className="port-navbar-item clickable">
                  <Login />
                </NavItem>
              )}
              {isAuthenticated && (
                <NavItem className="port-navbar-item clickable">
                  <Logout />
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
