import React, { useState } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";


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

const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};



export default function Application(props) {
  const [day, setDay] = useState('Monday');

  const appointmentComponents = Object.values(appointments).map((appointment) => {
    console.log(appointment);
    return <Appointment
    key={appointment.id} 
    // spread the object into the props definition
    {...appointment} 
  />
  }) 
  

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
        {appointmentComponents}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
