import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

import EditingForm from './editingForm';

export default class ActiveItem extends Component {
  constructor() {
    super();
    this.state = {
      timerDate: null,
      timerId: null,
      timerOn: false,
      timeSec: 0,
      timeHour: 0,
    };
    this.startTimer = () => {
      if (!this.state.timerOn) {
        this.setState({
          timerOn: true,
        });
        let hour = this.state.timeHour;
        let sec = this.state.timeSec;
        const timerId = setInterval(() => {
          if (sec === 59) {
            hour += 1;
            sec = 0;
            this.setState({
              timeSec: sec,
              timeHour: hour,
            });
          } else if (sec <= 59) {
            sec += 1;
            this.setState({
              timeSec: sec,
              timerId: timerId,
            });
          }
        }, 1000);
      }
    };
    this.stopTimer = () => {
      clearInterval(this.state.timerId);
      this.setState({
        timerId: null,
        timerOn: false,
      });
    };
  }

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
    const styleTime = {
      marginLeft: '10px',
      marginRight: '10px',
      paddingBottom: '25px',
    };
    const styleTimer = {
      display: 'flex',
      flexDirection: 'row',
    };
    const styleDate = {
      minWidth: '120px',
      paddingLeft: '10px',
    };
    return (
      <li className={classNames}>
        {!onEdit ? (
          <div className="view">
            <input onChange={this.stopTimer} onClick={this.props.onToggleDone} className="toggle" type="checkbox" />
            <label>
              <span className="title">{name}</span>
              <span style={styleTimer} className="description">
                <button onClick={this.startTimer} className="icon icon-play"></button>
                <button style={styleTime} onClick={this.stopTimer} className="icon icon-pause"></button>
                {this.state.timeSec.toString().length < 2
                  ? `${this.state.timeHour}:0${this.state.timeSec}`
                  : `${this.state.timeHour}:${this.state.timeSec}`}
              </span>
              <span style={styleDate} className="description">
                {result}
              </span>
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
