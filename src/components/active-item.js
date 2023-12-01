import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

import EditingForm from './editingForm';

export default class ActiveItem extends Component {
  render() {
    const { name, onEdit } = this.props;
    let classNames = '';
    if (this.props.done) {
      classNames += 'completed';
    }
    if (onEdit) {
      classNames = 'editing';
    }
    const year = this.props.dateItem.getFullYear();
    const month = this.props.dateItem.getMonth();
    const date = this.props.dateItem.getDate();
    const hours = this.props.dateItem.getHours();
    const minutes = this.props.dateItem.getMinutes();
    const seconds = this.props.dateItem.getSeconds();
    const result = formatDistanceToNow(new Date(year, month, date, hours, minutes, seconds), { includeSeconds: true });
    return (
      <li className={classNames}>
        {!onEdit ? (
          <div className="view">
            <input onClick={this.props.onToggleDone} className="toggle" type="checkbox" />
            <label>
              <span className="description">{name}</span>
              <span className="created">{result}</span>
            </label>
            <button className="icon icon-edit" onClick={this.props.onEditing}></button>
            <button onClick={this.props.onDelete} className="icon icon-destroy"></button>
          </div>
        ) : (
          <EditingForm
            onEditingChange={this.props.onEditingChange}
            labelEdit={this.props.labelEdit}
            onEditFoo={this.props.onEditFoo}
            itemID={this.props.itemID}
          ></EditingForm>
        )}
      </li>
    );
  }
}
