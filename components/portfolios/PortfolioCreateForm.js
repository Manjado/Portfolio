import React from 'react';

export default class PortfolioCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', description: '', language: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleChangeLanguage(event) {
    console.log(event.target.value, 'select');
    this.setState({ language: event.target.value });
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            value={this.state.description}
            onChange={this.handleChangeDescription}
          />
        </label>
        <label>
          Pick your favorite Programming Language
          <select value={this.state.value} onChange={this.handleChangeLanguage}>
            <option value="javascript">JavaScript</option>
            <option value="php">PHP</option>
            <option value="java">java</option>
            <option value="c++">C++</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
