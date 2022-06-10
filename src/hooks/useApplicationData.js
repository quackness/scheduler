import React, { useState, useEffect } from 'react';
import axios from "axios";
import getAppointmentsForDay from "helpers/selectors";


export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day)

  const setDay = (day) => setState(prev => ({ ...prev, day }));


  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      const days = all[0].data
      const appointments = all[1].data
      const interviewers = all[2].data
      setState(prev => ({ ...prev, days, appointments, interviewers }));
    }).catch(error => console.log(error));
  }, [])


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState({
          ...state,
          appointments,
          days: updateSpots(state, appointments)
        })
      })
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }


    return axios.delete(`/api/appointments/${id}`, appointment)
      .then((response) => {
        setState({
          ...state,
          appointments,
          days: updateSpots(state, appointments)
        })
      }
      )
  };

  const updateSpots = function (state, appointments) {
    return state.days.map(day => {
      if (day.name === state.day) {
        return {
          ...day,
          spots: day.appointments.map(id => appointments[id]).filter(({ interview }) => !interview).length,
        }
      }
      return day;
    })
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}