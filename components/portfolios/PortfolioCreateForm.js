// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Alert } from 'reactstrap';
import PortInput from '../form/PortInput';
import PortDate from '../form/PortDate';
import moment from 'moment';

const validateInputs = values => {
  const errors = {};

  Object.entries(values).forEach(([key, value]) => {
    if (!values[key] && key !== 'endDate') {
      errors[key] = `Filed ${key} is required!`;
    }
  });

  const startDate = moment(values.startDate);
  const endDate = moment(values.endDate);
  //debugger;
  if (startDate && endDate && endDate.isBefore(startDate)) {
    errors.endDate = 'End Date cannot be before start date!!!';
  }

  return errors;
};

const INITIAL_VALUES = {
  title: '',
  company: '',
  location: '',
  position: '',
  description: '',
  startDate: '',
  endDate: ''
};

const PortfolioCreateForm = props => (
  <div>
    <Formik
      initialValues={INITIAL_VALUES}
      validate={validateInputs}
      onSubmit={props.onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field label="Title" type="text" name="title" component={PortInput} />
          <Field
            label="Company"
            type="text"
            name="company"
            component={PortInput}
          />
          <Field
            label="Location"
            type="text"
            name="location"
            component={PortInput}
          />
          <Field
            label="Position"
            type="text"
            name="position"
            component={PortInput}
          />
          <Field
            label="Description"
            type="textarea"
            name="description"
            component={PortInput}
          />
          <Field label="Start Date" name="startDate" component={PortDate} />
          <Field
            label="End Date"
            name="endDate"
            canBeDisabled={true}
            component={PortDate}
          />
          {props.error && <Alert color="danger">{props.error}</Alert>}
          <Button
            color="success"
            size="lg"
            type="submit"
            disabled={isSubmitting}
          >
            Create
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default PortfolioCreateForm;
