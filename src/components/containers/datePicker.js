import React, { Component } from 'react';
import ValueList from '../presentation/valueList.js';
import RangeList from '../presentation/rangeList.js';
import '../../css/datePicker.css';

var YEAR = "Year";
var MONTH = "Month";
var DAY = "Day";
var YEAR_RANGE = 20;


function isLeapYear(year){
  return (year%4===0)?(year%100===0)?(year%400===0)?true:false:true:false;
}

function getYearValues(start){

  // var year = new Date().getFullYear();
  var years = [];
  for(var i=0;i<YEAR_RANGE;i++){
    years.push(start+i);
  }
  return years;
}

function getMonthValues(index){
  // var month = new Date().getMonth() + 1;
  var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  if(index && index >0 && index <13){
    month = month[index-1];
  }
  return month;

}

function getDayValues(month,year){
  // var date = new Date().getDate();


  var nofdays = 31;

  switch(month){
    case "April":
    case "June":
    case "September":
    case "November":
      nofdays = 30;
      break;

    case "February":
      if(isLeapYear(year))
        nofdays = 29;
      else
        nofdays = 28
      break;

    default:
        break;
    }

  var numbers = Array(nofdays).fill().map((v, i) => i + 1)
  return numbers;

}

class DatePicker extends Component{
  constructor(props){
    super(props);

    this.state = {
      year: 0,
      month: 0,
      day: 0,
      currentSelection: YEAR,
      currentYearRange: 2001,

    }

    this.handleDateSelection = this.handleDateSelection.bind(this);
    this.handleValueClick = this.handleValueClick.bind(this);
    this.handleArrowClick = this.handleArrowClick.bind(this);
  }

  handleValueClick(event){
    let value = event.target.value;
    console.log("clicked: "+value);
    if(this.state.currentSelection == YEAR){
      this.setState({year: value, currentSelection: MONTH},()=>{
        this.props.getDateFromPicker({year: this.state.year,month: this.state.month, day: this.state.day});
      });
    }else if (this.state.currentSelection == MONTH) {
      this.setState({month: value, currentSelection: DAY},()=>{
        this.props.getDateFromPicker({year: this.state.year,month: this.state.month, day: this.state.day});
      });
    }else if (this.state.currentSelection == DAY){
      this.setState({day: value},()=>{
        this.props.getDateFromPicker({year: this.state.year,month: this.state.month, day: this.state.day});
      });
    }

  }

  handleArrowClick(event){
    let value = event.target.value;
    let crange = this.state.currentYearRange;

    if(value == "next"){
      crange += 15;
    }else{
      crange -= 15;
    }
    this.setState({currentYearRange:crange});
  }

  handleDateSelection(event){
    console.log(event.target.classList);
    let id=event.target.classList[0];
    console.log(id);
    if(id === "date-picker-year"){
      this.setState({currentSelection: YEAR});

    } else if(id === "date-picker-month"){
      this.setState({currentSelection: MONTH});

    } else if(id === "date-picker-day"){
      this.setState({currentSelection: DAY});
    }

  }

  componentDidMount(){
    //set current date
    var year = new Date().getFullYear();
    var month = getMonthValues(new Date().getMonth() + 1);
    var day = new Date().getDate();

    this.setState({year:year,month: month, day: day});
  }

  render(){
    var range;
    var values;
    var yearClass = "date-picker-year";
    var monthClass = "date-picker-month";
    var dayClass = "date-picker-day";
    var superscript = "th";

    if(this.state.currentSelection === YEAR){
      yearClass += " date-picker-selected";
      var end  = this.state.currentYearRange+YEAR_RANGE-1;
      range = <RangeList value={this.state.currentYearRange+"-"+end} handleArrowClick={this.handleArrowClick} />
      values=  getYearValues(this.state.currentYearRange);
    }else if(this.state.currentSelection == MONTH){
      monthClass += " date-picker-selected";
      values = getMonthValues();
      range = null;
    }else if(this.state.currentSelection == DAY){
      dayClass += " date-picker-selected";
      range = null;
      values = getDayValues(this.state.month,this.state.year);
    }

    if(this.state.day === "1"){
      superscript = "st";
    }else if(this.state.day === "2"){
      superscript = "nd";
    }

    // <div>Select {this.state.currentSelection}</div>

    return(
      <div className="date-board">
        <div className="date-board-title-date">
          <div className={yearClass} onClick={this.handleDateSelection}>{this.state.year}</div>
          <div className={monthClass} onClick={this.handleDateSelection}>{this.state.month}</div>
          <div className={dayClass} onClick={this.handleDateSelection}>{this.state.day}<sup>{superscript}</sup></div>
        </div>
        <div className="date-board-title">
        </div>
        <div>{range}</div>
        <ValueList values={values} handleValueClick = {this.handleValueClick} type = {this.state.currentSelection}/>
      </div>
    );
  }
}

export default DatePicker;
