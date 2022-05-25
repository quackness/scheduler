export function getAppointmentsForDay(state, day) {
  //... return an array of appointments for that day
  //select the data, the state is what provides the data
  // console.log("this is state", state);
  console.log("this is state.days", state.days);
  // const arr = [];//the global return
  if (state.days.length === 0) {
    return [];
  }
  const foundDay = state.days.find(stateDay => stateDay.name === day);
  //.find() in this case returns the object, the first item that matches 
  //the condition
  if (!foundDay) {
    return [];
  }
  console.log("foundDay", foundDay)
  // if (state.days.length > 0 && foundDay.name !== undefined) {
  //return foundDay;
  // if (state.days.length > 0) {
  const appointmentNumbers = foundDay.appointments;
  //we got an array with [1,2,3]
  console.log("appointmentNumbers", appointmentNumbers);
  const result = appointmentNumbers.map(id => state.appointments[id])
  console.log("result", result)
  // }
  return result;
  //return appointmentNumbers;
  
  //before looping the appointments check if found day is valid 
  //and check if state.days.length is greater than zero

}
