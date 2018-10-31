import React from 'react';
import '../../css/datePicker.css';

const RangeList = props => {
  return(
    <div className="range-wrapper">
      <div><button className="range-arrows" value = "previous" onClick={props.handleArrowClick}>&lt;</button></div>
      <div><button className ="range-button">{props.value}</button></div>
      <div><button className="range-arrows" value ="next" onClick={props.handleArrowClick}>&gt;</button></div>
    </div>
  );
}

export default RangeList;
