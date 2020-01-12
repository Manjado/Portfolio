import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export default class PortDate extends React.Component {
  state = {
    dateValue: new Date()
  };

  handleChange = date => {
    this.setState({
      dateValue: date
    });
  };

  render() {
    return (
      <DatePicker
        selected={this.state.dateValue}
        onChange={this.handleChange}
      />
    );
  }
}
