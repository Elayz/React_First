import React, { Component } from 'react';
import Active from './active';
import Filter from './filter';

export default class Header extends Component {
  constructor() {
    super();
    let maxId = 0;
    const dateNow = new Date();
    this.state = {
      label: '',
      labelEdit: '',
      currentValues: [],
      inputValue: [],
      selected: {
        all: true,
        active: false,
        completed: false,
      },
      classes: [{ all: '' }, { active: '' }, { completed: '' }],
    };
    this.state.inputValue = this.state.currentValues;

    this.updateData = (item) => {
      if (item.value !== '') {
        this.setState(({ inputValue }) => {
          const newArray = [...inputValue];
          newArray.push(item);
          return {
            inputValue: newArray,
            currentValues: newArray,
          };
        });
        this.forceUpdate();
      }
    };
    this.deleteItem = (id) => {
      this.setState(({ currentValues }) => {
        const index = currentValues.findIndex((el) => el.id === id);
        const before = currentValues.slice(0, index);
        const after = currentValues.slice(index + 1);
        const newMass = [...before, ...after];
        return {
          inputValue: newMass,
          currentValues: newMass,
        };
      });
    };
    this.onToggleDone = (id) => {
      this.setState(({ inputValue }) => {
        const index = inputValue.findIndex((el) => el.id === id);
        const oldItem = inputValue[index];
        const newItem = { ...oldItem, done: !oldItem.done };

        const newArray = [...inputValue.slice(0, index), newItem, ...inputValue.slice(index + 1)];
        return {
          inputValue: newArray,
          currentValues: newArray,
        };
      });
    };
    this.onLabelChange = (e) => {
      this.setState({
        label: e.target.value,
      });
    };
    this.onSubmit = (e) => {
      this.state.inputValue.forEach((obj) => {
        if (obj.id > maxId) {
          maxId = obj.id;
        }
      });
      e.preventDefault();
      const dateNow = new Date();
      const newItem = {
        value: this.state.label,
        id: maxId + 1,
        done: false,
        date: dateNow,
        onEdit: false,
      };
      this.updateData(newItem);
      this.setState({
        label: '',
      });
    };
    this.deleteDoneItems = () => {
      const newItem = this.state.currentValues.filter((doneItem) => !doneItem.done);
      this.setState(() => ({
        currentValues: newItem,
        inputValue: newItem,
      }));
      this.forceUpdate();
    };
    this.changeSelected = (e) => {
      const newState = [{ all: '' }, { active: '' }, { completed: '' }];
      switch (e.target.id) {
        case 'all':
          newState[0].all = 'selected';
          this.setState({
            inputValue: this.state.currentValues,
          });
          break;
        case 'active':
          newState[1].active = 'selected';
          this.setState({
            inputValue: this.state.currentValues.filter((el) => !el.done),
          });
          break;
        case 'completed':
          this.setState({
            inputValue: this.state.currentValues.filter((el) => el.done),
          });
          newState[2].completed = 'selected';
          break;
      }
      this.setState({
        classes: newState,
      });
    };
    this.onEditing = (id) => {
      this.setState(() => {
        const index = this.state.currentValues.findIndex((el) => el.id === id);
        return {
          labelEdit: this.state.currentValues[index].value,
        };
      });
      this.setState(({ currentValues }) => {
        const index = currentValues.findIndex((el) => el.id === id);
        const oldItem = currentValues[index];
        const newItem = {
          ...oldItem,
          onEdit: !oldItem.onEdit,
        };
        const newArray = [...currentValues.slice(0, index), newItem, ...currentValues.slice(index + 1)];
        return {
          inputValue: newArray,
          currentValues: newArray,
        };
      });
    };
    this.onEditingChange = (e) => {
      this.setState({
        labelEdit: e.target.value,
      });
    };
    this.onEditFoo = (e) => {
      e.preventDefault();
      const itemID = e.target.id;
      this.setState(({ currentValues }) => {
        const index = currentValues.findIndex((el) => el.id === Number(itemID));

        const oldItem = currentValues[index];
        const newItem = {
          ...oldItem,
          onEdit: !oldItem.onEdit,
          value: this.state.labelEdit,
        };
        const newArray = [...currentValues.slice(0, index), newItem, ...currentValues.slice(index + 1)];
        return {
          currentValues: newArray,
          inputValue: newArray,
        };
      });

      this.setState({
        labelEdit: '',
      });
    };
  }

  render() {
    let leftItems = 0;
    this.state.currentValues.map((el) => {
      if (!el.done) {
        leftItems++;
      }
    });
    return (
      <div>
        <form className="header" onSubmit={this.onSubmit}>
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.onLabelChange}
            value={this.state.label}
          ></input>
        </form>
        <section className="main">
          <Active
            onEditing={this.onEditing}
            onToggleDone={this.onToggleDone}
            onDeleted={this.deleteItem}
            onEditingChange={this.onEditingChange}
            labelEdit={this.state.labelEdit}
            onEditFoo={this.onEditFoo}
          >
            {this.state.inputValue}
          </Active>
        </section>
        <footer className="footer">
          <span className="todo-count">{leftItems} items left</span>
          <Filter
            classes={this.state.classes}
            selected={this.state.selected}
            changeSelected={this.changeSelected}
          ></Filter>
          <button className="clear-completed" onClick={this.deleteDoneItems}>
            Clear completed
          </button>
        </footer>
      </div>
    );
  }
}
