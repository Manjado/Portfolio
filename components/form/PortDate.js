import React, { Fragment } from 'react';
import DatePicker from 'react-datepicker';

import { FormGroup, Label, Button } from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';
// import { Form } from 'formik';
import moment from 'moment';

export default class PortDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateValue: moment(),
      isHidden: false
    };
  }

  setFieldValueAndTouch(date, touched) {
    const { setFieldValue, setFieldTouched } = this.props.form;
    const { name } = this.props.field;

    setFieldTouched(name, touched, true);
    setFieldValue(name, date, true);
  }

  handleChange = date => {
    this.setState({
      dateValue: date
    });
    this.setFieldValueAndTouch(date, true);
  };

  toggleDate(date) {
    this.setState({
      isHidden: !this.state.isHidden
    });

    this.setFieldValueAndTouch(date, true);
  }

  render() {
    const {
      canBeDisabled,
      label,
      field,
      form: { touched, errors }
    } = this.props;

    const { isHidden, dateValue } = this.state;
    return (
      <FormGroup>
        <Label>{label}</Label>
        <div className="input-group">
          {!isHidden && (
            <DatePicker
              selected={this.state.dateValue}
              onChange={this.handleChange}
              peekNextMounth
              showMonthDropdown
              showYearDropdown
              maxDate={moment()}
              dropdownMode="select"
            />
          )}
        </div>
        {!isHidden && canBeDisabled && (
          <Button onClick={() => this.toggleDate(null)}>
            Still Working Here
          </Button>
        )}

        {isHidden && canBeDisabled && (
          <Fragment>
            <span>Still Working Here</span>
            <Button onClick={() => this.toggleDate(dateValue)}>
              Set End Date
            </Button>
          </Fragment>
        )}

        {touched[field.name] && errors[field.name] && (
          <div className="error">{errors[field.name]}</div>
        )}
      </FormGroup>
    );
  }
}
