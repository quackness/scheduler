import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from 'axios';



//array moved from stories
//removed array to use axios fetching instead
// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

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

//click on the days
//response.data vs .results
//spread [1, 2, 3] || [[1,2,3]]

export default function Application(props) {
  //responsible for selecting the day on the sidebar, it holds the value for the day and
  //a function to change it
  // const [day, setDay] = useState('Wednesday');
  //it is empty at first and useEffect loads the days from api, fetch dayss
  // const [days, setDays] =  useState([]);

  //two states objects above replaced with a single object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });



  useEffect(() => {
    axios.get("http://localhost:8001/api/days").then((response) => {
      console.log("===----", response);
    
      // setDays([...response.data])
      setDays([...response.data])
    }).catch(error => console.log(error));
  },[])


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
