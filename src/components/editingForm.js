import React, { Component } from 'react';

export default class EditingForm extends Component {
  constructor(props) {
    super(props);
    this.elementRef = this.props.itemID;
  }

  // componentDidMount() {
  //     // Получение ID элемента и передача его во внешний компонент
  //     const elementID = this.elementRef.current.id;
  //     this.props.onElementIDChange(elementID);
  // }

  render() {
    // console.log(this.props.labelEdit)
    return (
      <form onSubmit={this.props.onEditFoo} id={this.props.itemID}>
        <input
          onChange={this.props.onEditingChange}
          type="text"
          className="edit"
          autoFocus
          value={this.props.labelEdit}
        ></input>
      </form>
    );
  }
}
