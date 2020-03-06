import React from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export default class PortButtonDropdown extends React.Component {
  state = {
    dropdownOpen: false
  };

  toggel = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  renderMenu(items) {
    return (
      <DropdownMenu>
        {items.map((item, index) => (
          <DropdownItem key={index} {...item.handlers}>
            {item.text}
          </DropdownItem>
        ))}
      </DropdownMenu>
    );
  }

  render() {
    const { items } = this.props;
    return (
      <ButtonDropdown
        className="port-dropdown"
        isOpen={this.state.dropdownOpen}
        toggle={this.toggel}
      >
        <DropdownToggle caret size="sm" />
        {this.renderMenu(items)}
      </ButtonDropdown>
    );
  }
}
