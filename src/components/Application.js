import React, { useState } from "react";
import "components/Application.scss";
import DayList from "components/DayList";


//array moved from stories
const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];


export default function Application(props) {
  const [day, setDay] = useState('Monday');
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days = {days}
            //days array
            // day = {"Monday"} current day hardcoded, it got refactored with state
            //changing day and setDay to value and onChange to mimic standard html <select>
            //for code clarity: the name of the props is the same as keywords onChange event and value property
            value = {day} 
            //current day refactored with state
            // setDay={day => console.log(day)}
            //click before rafactoring with state 
            onChange={setDay}
            // component should also receive the function that can update the state
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
