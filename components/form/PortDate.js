import React from 'react';
import DatePicker from 'react-datepicker';

import { FormGroup, Label } from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';
import { Form } from 'formik';
import moment from 'moment';

export default class PortDate extends React.Component {
  state = {
    dateValue: new Date()
  };

  handleChange = date => {
    console.log(date, 'd');
    const formattedDate = date.format();

    this.setState({
      dateValue: date
    });
  };

  render() {
    const { label } = this.props;

    return (
      <FormGroup>
        <Label>{label}</Label>
        <div className="input-group">
          <DatePicker
            selected={this.state.dateValue}
            onChange={this.handleChange}
            peekNextMounth
            showMonthDropdown
            showYearDropdown
            maxDate={moment()}
            dropdownMode="select"
          />
        </div>
      </FormGroup>
    );
  }
}
