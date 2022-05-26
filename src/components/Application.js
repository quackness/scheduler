import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from 'axios';
import getAppointmentsForDay from "helpers/selectors";

// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  console.log('dailyAppointments', dailyAppointments)

//step 2 update day property of the state with any day
//this takes a state and changes it with a day param Tuesday
  // const setDay = (day) => setState({ ...state, day });
  //update days with api
  // const setDays = (days) => setState({ ...state, days });

  //refactor: remove state dependency and pass setState function
  const setDay = (day) => setState(prev => ({ ...prev, day }));
  //removind setDays wth its function call to remove data dependency
  //const setDays = (days) => setState(prev => ({ ...prev, days }));


  useEffect(() => {
    Promise.all([
    //setState({ ...state, day: "Tuesday" });//update with setState to Tuesday after the render
    axios.get("/api/days"),
    axios.get("api/appointments"),
    axios.get("api/interviewers")
    // axios.get("api/interviewers")
    //destructuring an array of objects
    ]).then(([days, appointments, interviewers]) => {
      console.log("days =>", days);
      console.log("appointments =>", appointments);
      console.log("interviewers =>", interviewers);

      setState(prev => ({...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}));
      //call setDay
      //setDay("Tuesday")
      //setDays([...response.data])
    }).catch(error => console.log(error));
  },[])


  //const appointmentComponents = Object.values(appointments).map((appointment) => {
    const appointmentComponents = dailyAppointments.map(appointment => {
    console.log(appointment);
    return (
      <Appointment
        key={appointment.id} 
        // spread the object into the props definition
        {...appointment} 
      />)
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
          //update properties with state. since we moved states to 1 object
            days = {state.days}
            value = {state.day} 
            onChange={setDay}
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

   

