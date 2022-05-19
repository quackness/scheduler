import React from 'react';
import "components/DayListItem.js";
import DayListItem from 'components/DayListItem.js';
// import days from '../stories/index.js'

export default function DayList(props) {
  const days = props.days.map((day) => {
    console.log(day)
  return (
    <DayListItem
      key = {day.id}
      name = {day.name}
      //spots, name, setDay is from storiesOf("DayListItem", ...)
      //day.name, day.spots are from the days array
      spots = {day.spots}
      // selected = {day.name === props.day}
      //changing the code above to match the names from application.js as apart of controlled
      //list naming convention, same applies to setDay
      selected = {day.name === props.value}
      // checking to see if the day that is selected 
      //matches the name of the day in the object we are currently processing.
      // setDay = {props.setDay}
      setDay = {props.onChange}
      //setDay is from storiesOf("DayListItem", ...)
      />
     )
    })
  return (
    <ul>
      {days}
    </ul>
  )
}

