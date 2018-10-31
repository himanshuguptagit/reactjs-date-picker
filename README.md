# reactjs-date-picker
Reactjs Component module to pick dates


## Usage

1. Import DatePicker module

    import DatePicker from './modules/datePicker.js'

2. The DatePicker component takes a function object "getDateFromPicker" as a prop, which is used to get date in return.
```javascript
<DatePicker getDateFromPicker = {this.getDateFromPicker}/>
```

this.getDateFromPicker can be used like this: 

```javascript
getDateFromPicker(pDate){
  this.setState({date: pDate});
}
```
  
The date-format is in the form:

```javascript
date = {
  year: 2018,
  month: August,
  day: 13
}
```
