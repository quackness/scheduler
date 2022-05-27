import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from 'axios';
import getAppointmentsForDay, { getInterviewersForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
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
      //try with array[0].data

      setState(prev => ({...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}));
      //call setDay
      //setDay("Tuesday")
      //setDays([...response.data])
    }).catch(error => console.log(error));
  },[])


  //const appointmentComponents = Object.values(appointments).map((appointment) => {
    const interviewers = getInterviewersForDay(state, state.day);
    const appointmentComponents = dailyAppointments.map(appointment => {
    console.log(appointment);
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id} 
        // spread the object into the props definition
        {...appointment} 
        interview={interview}
        interviewers = {interviewers}
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

   

