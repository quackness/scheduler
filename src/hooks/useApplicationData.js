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
  console.log('dailyAppointments', dailyAppointments)

  const setDay = (day) => setState(prev => ({ ...prev, day }));
  

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers")
    ]).then((all) => {
      const days = all[0].data
      const appointments = all[1].data
      const interviewers = all[2].data
      console.log("days =>", days);
      console.log("appointments =>", appointments);
      console.log("interviewers =>", interviewers)
      setState(prev => ({ ...prev, days, appointments, interviewers }));
    }).catch(error => console.log(error));
  }, [])


  //Create a function called bookInterview inside the Application component.
  function bookInterview(id, interview) {// interview comes from index.js from the save function
    console.log(id, interview);
    //create a variable representing each one. The lowest level is the interview object. 
    const appointment = {
      ...state.appointments[id],//from the api
      interview: { ...interview }// interview obj we created
    };
    //Add the following code below the appointment object we created above.
    const appointments = {
      ...state.appointments,//from api
      [id]: appointment//ading 2nd level
    };
    console.log(id, interview);
    //make a PUT request to the/api/appointments/:id endpoint to update the database with the interview data.
    return axios.put(`/api/appointments/${id}`, { interview })//updates the state when the promise resolves
      .then((response) => {
        // spotsRemaining('add')
        // updateSpots(id)
        setState({//overwriting the appointments/mutate
          ...state,
          appointments,//updating state
          days: updateSpots(state, appointments)
        })
        console.log("response =>", response)
      })
  };
  //add cancelInerview function
  //axios delete to delete interview
  function cancelInterview(id) {
    console.log(id);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment//adding the appointment from the var above
    }

 
    return axios.delete(`/api/appointments/${id}`, appointment)
      .then((response) => {
        setState({//modify state
          ...state,
          appointments,
          days: updateSpots(state, appointments)
        })
      }
      )
  };
  console.log("daily", dailyAppointments);

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