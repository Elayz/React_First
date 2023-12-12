import React, { Component } from 'react';
import ActiveItem from './active-item';

export default class Active extends Component {
  render() {
    const elsements = this.props.children.map((item) => (
      <ActiveItem
        key={item.id}
        name={item.value}
        done={item.done}
        onDelete={() => this.props.onDeleted(item.id)}
        onToggleDone={() => this.props.onToggleDone(item.id)}
        dateItem={item.date}
        onEditing={() => this.props.onEditing(item.id)}
        onEdit={item.onEdit}
        onEditingChange={this.props.onEditingChange}
        labelEdit={this.props.labelEdit}
        onEditFoo={this.props.onEditFoo}
        itemID={item.id}
      ></ActiveItem>
    ));
    return <ul className="todo-list">{elsements}</ul>;
  }
}
