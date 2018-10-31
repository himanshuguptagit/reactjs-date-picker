import React from 'react';
import '../../css/datePicker.css';

const ValueList = props => {

  let type = props.type;

  let items = props.values.map((x)=>{
    var itemClassName = "value-button"
    var disp = x;
    if(x.toString().length>4){
       disp = x.substring(0,3);
    }
    if(type === "Day"){
      itemClassName += " day-button";
    }else if(type === "Month"){
      itemClassName += " month-button";
    }
    var item = <button className={itemClassName} value={x} onClick={props.handleValueClick}>{disp}</button>;
    return item;
  });

  return(
    <div className="value-list">
      {items}
    </div>
  );
}

export default ValueList;
