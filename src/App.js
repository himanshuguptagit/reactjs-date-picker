import React, { Component } from 'react';
import './App.css';
import DatePicker from './components/containers/datePicker.js'

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      date: {},
      lucky: ""

    };

    this.getDateFromPicker = this.getDateFromPicker.bind(this);

  }

  getDateFromPicker(pDate){
    this.setState({date: pDate},()=>{
      console.log( this.state.date.day);
      if(this.state.date.day){
        console.log("setting state");
        if(this.state.date.day%2 != 0){
          this.setState({lucky:"You are going to get lucky today."});
        }else{
          this.setState({lucky:"You should stay at home."});
        }
      }
      console.log(pDate);
    });

  }


  render() {
          // <p>{this.state.lucky} </p>
    //<div>{this.state.date.year} / {this.state.date.month} / {this.state.date.day} </div>
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Pick your birthdate and see if you are going to be lucky today !
          </p>

          <DatePicker getDateFromPicker = {this.getDateFromPicker}/>
           <p>{this.state.lucky} </p>

        </header>
      </div>
    );
  }
}

export default App;
