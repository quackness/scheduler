export function getAppointmentsForDay(state, day) {

  // test:return empty array when days data is empty, it is an array
  // so we can check its length
  if (state.days.length === 0) {
    return [];
  }
  //test(2 steps):find appointments for the day that is passed:
  //step 1 find if the day exists in the array
  const foundDay = state.days.find(findDay => findDay.name === day);
  console.log("find", foundDay)
  
  //test:return empty array when day is not found
  if (!foundDay) {
    return [];
  }
  //step 2: returnthe appointmets for the day that was passed
  const appointmentsForTheDay = foundDay.appointments;
  console.log("appointmentsForTheDay", appointmentsForTheDay)
  //return appointmentsForTheDay;
  
  //returns an array containing the correct appointment objects
  //from "appointmentsForTheDay" we are getting [ 1, 2, 3 ]
  //based on the appointment ids we need to get appt. details in state.appointments
  
  const appointmentDetails = appointmentsForTheDay.map(id => state.appointments[id]);
  // console.log(appointmentDetails)
  return appointmentDetails;
  
  };
  
  //alternative would be filter which returns an array, then we
  //would need to access for example foundDay[0].appointments;