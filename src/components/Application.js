//import React, { useState, useEffect } from "react";
import React from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
// import axios from 'axios';
import getAppointmentsForDay, { getInterviewersForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";



export default function Application(props) {
//state moved to hooks folder
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const appointmentComponents = dailyAppointments.map(
    appointment => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={getInterview(state, appointment.interview)}
        interviewers = {interviewers}
        bookInterview = {bookInterview}
        cancelInterview = {cancelInterview}
      />);
    }); 

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

   

