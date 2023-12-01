import React from 'react';

const Filter = (props) => {
  Filter.defaultProps = {
    classes: [{ all: 'selected' }, { active: 'selected' }, { completed: 'selected' }],
  };
  return (
    <ul className="filters">
      <li onClick={props.changeSelected}>
        <button id="all" className={props.classes[0].all}>
          All
        </button>
      </li>
      <li onClick={props.changeSelected}>
        <button id="active" className={props.classes[1].active}>
          Active
        </button>
      </li>
      <li onClick={props.changeSelected}>
        <button id="completed" className={props.classes[2].completed}>
          Completed
        </button>
      </li>
    </ul>
  );
};
export default Filter;
