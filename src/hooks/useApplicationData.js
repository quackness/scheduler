import React, { useState, useEffect } from 'react';
import axios from "axios";
import getAppointmentsForDay from "helpers/selectors";



// Our useApplicationData Hook will return an object with four keys:

//     The state object will maintain the same structure.
//     The setDay action can be used to set the current day.
//     The bookInterview action makes an HTTP request and updates the local state.
//     The cancelInterview action makes an HTTP request and updates the local state.
export default function useApplicationData(props) {

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
    ]).then(([days, appointments, interviewers]) => {
      console.log("days =>", days);
      console.log("appointments =>", appointments);
      console.log("interviewers =>", interviewers)
      setState(prev => ({...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}));
    }).catch(error => console.log(error));
  },[])


  //Create a function called bookInterview inside the Application component.
 function bookInterview(id, interview) {// interview comes from index.js from the save function
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
   return axios.put(`/api/appointments/${id}`, {interview})//updates the state when the promise resolves
     .then((response) => {
       setState({//overwriting the appointments/mutate
         ...state,
         appointments//updating state
       })
   console.log("response =>",  response)
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
 appointments
})
}
)
};
console.log("daily", dailyAppointments);

return {
  state,
  setDay,
  bookInterview,
  cancelInterview
}

}