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

  render() {
    return (
      <ButtonDropdown
        className="port-dropdown"
        isOpen={this.state.dropdownOpen}
        toggle={this.toggel}
      >
        <DropdownToggle caret size="sm" />
        <DropdownMenu>
          <DropdownItem>Make a Draft/ Publish Story</DropdownItem>
          <DropdownItem>Delete</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}
